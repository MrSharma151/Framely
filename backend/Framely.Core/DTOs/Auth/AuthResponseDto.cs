namespace Framely.Core.DTOs.Auth
{
    public class AuthResponseDto
    {
        public string UserId { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Role { get; set; } = "User";

        public string Token { get; set; } = string.Empty; // JWT Access Token

        public DateTime ExpiresAt { get; set; } // Token expiry time

        // Optional: Refresh token support (future-proofing)
        public string? RefreshToken { get; set; }
    }
}
