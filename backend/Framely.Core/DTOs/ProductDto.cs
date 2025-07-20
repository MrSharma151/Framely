using System.ComponentModel.DataAnnotations;

namespace Framely.Core.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }  // Auto-generated for GET responses

        [Required(ErrorMessage = "Product name is required")]
        [StringLength(100, ErrorMessage = "Product name cannot exceed 100 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Brand is required")]
        [StringLength(50, ErrorMessage = "Brand name cannot exceed 50 characters")]
        public string? Brand { get; set; }

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public string? Description { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

        [Url(ErrorMessage = "Invalid Image URL format")]
        public string? ImageUrl { get; set; }

        [Required(ErrorMessage = "Category ID is required")]
        public int CategoryId { get; set; }

        public string? CategoryName { get; set; }  // Auto-filled on GET
    }
}
