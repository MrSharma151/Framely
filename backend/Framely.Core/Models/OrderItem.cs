namespace Framely.Core.Models
{
    public class OrderItem
    {
        public int Id { get; set; }                         // Primary key

        public int ProductId { get; set; }                  // Foreign key
        public Product? Product { get; set; }               // Navigation

        public int Quantity { get; set; }                   // e.g., 2 units
        public decimal UnitPrice { get; set; }              // Price at time of order

        public int OrderId { get; set; }                    // Foreign key
        public Order? Order { get; set; }                   // Navigation
    }
}
