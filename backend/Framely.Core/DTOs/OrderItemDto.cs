using System.ComponentModel.DataAnnotations;

namespace Framely.Core.DTOs
{
    public class OrderItemDto
    {
        public int Id { get; set; }  // Auto-generated for GET responses

        [Required(ErrorMessage = "Product ID is required")]
        public int ProductId { get; set; }

        public string? ProductName { get; set; }  // Filled automatically in GET responses

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Unit price must be greater than 0")]
        public decimal UnitPrice { get; set; } // Auto-calculated during order creation

        public int OrderId { get; set; } // Backend fills it automatically
    }
}
