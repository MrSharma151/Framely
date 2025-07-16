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
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoriesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET api/categories
        // Example: api/categories?pageNumber=1&pageSize=10&sortBy=name&sortOrder=asc
        [HttpGet]
        [AllowAnonymous] // anyone can see categories
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll(
            int pageNumber = 1,
            int pageSize = 10,
            string sortBy = "name",
            string sortOrder = "asc")
        {
            // Get base query
            var query = _context.Categories.AsQueryable();

            // Sorting logic
            switch (sortBy.ToLower())
            {
                case "id":
                    query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(c => c.Id) : query.OrderBy(c => c.Id);
                    break;
                default: // default sort by name
                    query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(c => c.Name) : query.OrderBy(c => c.Name);
                    break;
            }

            // Pagination calculation
            var totalItems = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            // Fetch paginated data
            var categories = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = _mapper.Map<List<CategoryDto>>(categories);

            // Return pagination info + data
            var response = new
            {
                TotalItems = totalItems,
                TotalPages = totalPages,
                CurrentPage = pageNumber,
                PageSize = pageSize,
                Data = result
            };

            return Ok(response);
        }

        // GET api/categories/{id}
        [HttpGet("{id}")]
        [AllowAnonymous] // also public
        public async Task<ActionResult<CategoryDto>> GetById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            var result = _mapper.Map<CategoryDto>(category);
            return Ok(result);
        }

        // POST api/categories
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<CategoryDto>> Create(CategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<CategoryDto>(category);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, result);
        }

        // PUT api/categories/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Update(int id, CategoryDto categoryDto)
        {
            if (id != categoryDto.Id)
                return BadRequest("Id mismatch");

            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            _mapper.Map(categoryDto, category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/categories/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
