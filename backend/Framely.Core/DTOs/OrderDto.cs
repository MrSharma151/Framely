using System.ComponentModel.DataAnnotations;

namespace Framely.Core.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }  // Auto-generated, required only for GET/Update

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "Customer name is required")]
        [StringLength(100, ErrorMessage = "Customer name cannot exceed 100 characters")]
        public string? CustomerName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Mobile number is required")]
        [Phone(ErrorMessage = "Invalid phone number format")]
        public string? MobileNumber { get; set; }

        [Required(ErrorMessage = "Shipping address is required")]
        [StringLength(250, ErrorMessage = "Address cannot exceed 250 characters")]
        public string? Address { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Total amount must be greater than 0")]
        public decimal TotalAmount { get; set; }

        public string Status { get; set; } = "Pending"; // Default

        public string? UserId { get; set; } // Filled automatically from JWT

        // At least 1 item is required when placing an order
        [MinLength(1, ErrorMessage = "Order must contain at least 1 product")]
        public List<OrderItemDto>? Items { get; set; }
    }
}
