namespace Framely.Core.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public string? CustomerName { get; set; }
        public string? Email { get; set; }
        public string? MobileNumber { get; set; }
        public string? Address { get; set; }

        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending";

        public string? UserId { get; set; }

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
