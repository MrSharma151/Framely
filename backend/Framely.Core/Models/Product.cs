namespace Framely.Core.Models
{
    public class Product
    {
        public int Id { get; set; }                     // Primary key
        public string? Name { get; set; }               // e.g., "Ray-Ban Aviator"
        public string? Brand { get; set; }              // e.g., "Ray-Ban"
        public string? Description { get; set; }        // Product details
        public decimal Price { get; set; }              // e.g., 2999.99
        public string? ImageUrl { get; set; }           // Path to product image

        public int CategoryId { get; set; }             // Foreign key
        public Category? Category { get; set; }         // Navigation property
    }
}
