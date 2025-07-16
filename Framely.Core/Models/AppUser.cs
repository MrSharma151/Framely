using Microsoft.AspNetCore.Identity;

namespace Framely.Core.Models
{
    public class AppUser : IdentityUser
    {
        // Extra fields for future use
        public string FullName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
