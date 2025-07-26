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
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        // Constructor that initializes database context and AutoMapper
        public ProductsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET api/products
        // Returns paginated and sorted list of products
        // Query example: api/products?page=1&pageSize=5&sortBy=price&sortOrder=desc
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string sortBy = "name",
            [FromQuery] string sortOrder = "asc")
        {
            var query = _context.Products.Include(p => p.Category).AsQueryable();

            // Apply sorting based on field
            switch (sortBy.ToLower())
            {
                case "price":
                    query = sortOrder == "desc" ? query.OrderByDescending(p => p.Price) : query.OrderBy(p => p.Price);
                    break;
                case "brand":
                    query = sortOrder == "desc" ? query.OrderByDescending(p => p.Brand) : query.OrderBy(p => p.Brand);
                    break;
                default:
                    query = sortOrder == "desc" ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name);
                    break;
            }

            // Apply pagination logic
            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
            var skip = (page - 1) * pageSize;
            var paginatedProducts = await query.Skip(skip).Take(pageSize).ToListAsync();

            // Convert products to DTO
            var productDtos = _mapper.Map<List<ProductDto>>(paginatedProducts);

            // Return pagination info + data
            return Ok(new
            {
                TotalItems = totalItems,
                TotalPages = totalPages,
                CurrentPage = page,
                PageSize = pageSize,
                Data = productDtos
            });
        }

        // GET api/products/id
        // Returns product details by ID
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound();

            return Ok(_mapper.Map<ProductDto>(product));
        }

        // POST api/products
        // Creates a new product
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<ProductDto>> Create(ProductDto productDto)
        {
            // Basic validation
            if (string.IsNullOrWhiteSpace(productDto.Name))
                return BadRequest("Product name is required");
            if (productDto.Price <= 0)
                return BadRequest("Product price must be greater than 0");

            var product = _mapper.Map<Product>(productDto);
            var category = await _context.Categories.FindAsync(productDto.CategoryId);
            if (category == null)
                return BadRequest("Invalid CategoryId");

            product.Category = category;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var createdDto = _mapper.Map<ProductDto>(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, createdDto);
        }

        // PUT api/products/id
        // Updates a product by ID
        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(int id, ProductDto productDto)
        {
            if (id != productDto.Id)
                return BadRequest("ID mismatch");

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
                return NotFound();

            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == productDto.CategoryId);
            if (!categoryExists)
                return BadRequest("Invalid CategoryId");

            // Basic validation
            if (string.IsNullOrWhiteSpace(productDto.Name))
                return BadRequest("Product name cannot be empty");
            if (productDto.Price <= 0)
                return BadRequest("Product price must be greater than 0");

            _mapper.Map(productDto, existingProduct);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Database update error: {ex.Message}");
            }

            return NoContent();
        }

        // DELETE api/products/id
        // Deletes a product by ID
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET api/products/category?name=sunglasses
        // Returns ONLY products that EXACTLY belong to the given category name
        [HttpGet("category")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetByCategory([FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return BadRequest("Category name is required");

            var cleanName = name.Trim().ToLower(); // lowercase for safe comparison

            var products = await _context.Products
                .Include(p => p.Category)
                .Where(p => p.Category != null &&
                            !string.IsNullOrEmpty(p.Category.Name) &&
                            p.Category.Name.ToLower() == cleanName)  // ✅ EF can translate this
                .ToListAsync();

            var result = _mapper.Map<List<ProductDto>>(products);
            return Ok(result);
        }


        // GET api/products/brand?name=rayban
        // Returns all products that match the given brand name
        [HttpGet("brand")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetByBrand([FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return BadRequest("Brand name is required");

            var products = await _context.Products
                .Include(p => p.Category)
                .Where(p => !string.IsNullOrEmpty(p.Brand) &&
                            p.Brand.ToLower().Contains(name.ToLower()))
                .ToListAsync();

            var result = _mapper.Map<List<ProductDto>>(products);
            return Ok(result);
        }

        // GET api/products/search?term=aviator
        // Returns products that match the search term in name brand or description
        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProductDto>>> Search([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
                return BadRequest("Search term is required");

            var products = await _context.Products
                .Include(p => p.Category)
                .Where(p =>
                    (!string.IsNullOrEmpty(p.Name) && p.Name.ToLower().Contains(term.ToLower())) ||
                    (!string.IsNullOrEmpty(p.Brand) && p.Brand.ToLower().Contains(term.ToLower())) ||
                    (!string.IsNullOrEmpty(p.Description) && p.Description.ToLower().Contains(term.ToLower()))
                )
                .ToListAsync();

            var result = _mapper.Map<List<ProductDto>>(products);
            return Ok(result);
        }
    }
}
