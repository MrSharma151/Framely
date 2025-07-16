using System.ComponentModel.DataAnnotations;

namespace Framely.Core.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }  // For GET & UPDATE (ignored on Create)

        [Required(ErrorMessage = "Category name is required")]
        [StringLength(100, ErrorMessage = "Category name cannot exceed 100 characters")]
        public string Name { get; set; } = string.Empty;

        [StringLength(250, ErrorMessage = "Description cannot exceed 250 characters")]
        public string? Description { get; set; }

    }
}
