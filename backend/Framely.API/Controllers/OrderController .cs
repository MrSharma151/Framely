using AutoMapper;
using Framely.Core.DTOs;
using Framely.Core.Models;
using Framely.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace Framely.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OrdersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET ALL ORDERS (Admin use)
        // Example: api/orders?pageNumber=1&pageSize=5&sortBy=date&sortOrder=desc&status=Pending
        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll(
            int pageNumber = 1,
            int pageSize = 10,
            string sortBy = "date",
            string sortOrder = "desc",
            string? status = null)
        {
            var query = _context.Orders
                .Include(o => o.Items!)
                .ThenInclude(i => i.Product)
                .AsQueryable();

            // Filter by status if provided
            if (!string.IsNullOrEmpty(status))
                query = query.Where(o => o.Status != null && o.Status.ToLower() == status.ToLower());

            // Sorting
            query = sortBy.ToLower() switch
            {
                "amount" => (sortOrder == "asc") ? query.OrderBy(o => o.TotalAmount) : query.OrderByDescending(o => o.TotalAmount),
                "status" => (sortOrder == "asc") ? query.OrderBy(o => o.Status) : query.OrderByDescending(o => o.Status),
                _ => (sortOrder == "asc") ? query.OrderBy(o => o.OrderDate) : query.OrderByDescending(o => o.OrderDate)
            };

            // Pagination
            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var orders = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = _mapper.Map<List<OrderDto>>(orders);

            return Ok(new
            {
                TotalItems = totalItems,
                TotalPages = totalPages,
                CurrentPage = pageNumber,
                PageSize = pageSize,
                Data = result
            });
        }

        // GET ORDERS FOR A SPECIFIC USER (ADMIN ONLY)
        [HttpGet("user/{userId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetUserOrders(string userId)
        {
            var userOrders = await _context.Orders
                .Include(o => o.Items!)
                .ThenInclude(i => i.Product)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            var result = _mapper.Map<List<OrderDto>>(userOrders);

            return Ok(result);
        }

        // GET SINGLE ORDER BY ID
        [HttpGet("{id}")]
        [Authorize] // Only logged-in users
        public async Task<ActionResult<OrderDto>> GetById(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Items!)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            var loggedInUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var isAdmin = User.IsInRole("ADMIN"); 

            //  Ownership check
            if (!isAdmin && order.UserId != loggedInUserId)
            {
                return Forbid(); // 403 - User trying to access someone else’s order
            }

            var result = _mapper.Map<OrderDto>(order);
            return Ok(result);
        }

        // PLACE A NEW ORDER
        [HttpPost]
        [Authorize] // Only logged-in users can place orders
        public async Task<ActionResult<OrderDto>> Create(OrderDto orderDto)
        {
            // Validate that order has at least one item
            if (orderDto.Items == null || !orderDto.Items.Any())
                return BadRequest("Order must have at least one item.");

            var order = _mapper.Map<Order>(orderDto);

            // Get logged-in userId from JWT token
            var loggedInUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(loggedInUserId))
                return Unauthorized("Invalid user token");

            order.UserId = loggedInUserId; // Link order to logged-in user
            order.Status = "Pending";
            order.OrderDate = DateTime.UtcNow;

            // Calculate total from items
            decimal total = 0;
            foreach (var item in order.Items!)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null)
                    return BadRequest($"Invalid product id {item.ProductId}");

                item.UnitPrice = product.Price;
                total += product.Price * item.Quantity;
            }
            order.TotalAmount = total;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var createdDto = _mapper.Map<OrderDto>(order);
            return CreatedAtAction(nameof(GetById), new { id = order.Id }, createdDto);
        }


        // UPDATE STATUS (Admin use)
        [HttpPut("{id}/status")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateStatus(int id, [FromQuery] string newStatus)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound();

            var validStatuses = new[] { "Pending", "Processing", "Completed", "Cancelled" };
            if (!validStatuses.Contains(newStatus))
                return BadRequest("Invalid status. Valid: Pending, Processing, Completed, Cancelled");

            order.Status = newStatus;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE ORDER (Admin can delete any, User can cancel only their own)
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> CancelOrDeleteOrder(int id)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            var loggedInUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var isAdmin = User.IsInRole("ADMIN");

            if (!isAdmin && order.UserId != loggedInUserId)
                return Forbid();

            if (isAdmin)
            {
                // ✅ Admin can hard delete
                _context.Orders.Remove(order);
            }
            else
            {
                // ✅ Normal user → just cancel (soft delete)
                if (order.Status == "Pending")
                    order.Status = "Cancelled";
                else
                    return BadRequest("Cannot cancel a completed order.");
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }


        // GET MY ORDERS (for logged-in user)
        [HttpGet("my")]
        [Authorize] // Both can call, admin will still see only their own orders
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetMyOrders()
        {
            // Extract logged-in userId from JWT claims
            var loggedInUserId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(loggedInUserId))
                return Unauthorized(); // Token issue

            // Fetch only current user's orders
            var myOrders = await _context.Orders
                .Include(o => o.Items!)
                .ThenInclude(i => i.Product)
                .Where(o => o.UserId == loggedInUserId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            var result = _mapper.Map<List<OrderDto>>(myOrders);

            return Ok(result);
        }

    }
}
