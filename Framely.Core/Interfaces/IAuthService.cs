using Framely.Core.DTOs.Auth;
using Framely.Core.Models;
using Microsoft.AspNetCore.Identity; // For IdentityResult
using System.Threading.Tasks;

namespace Framely.Core.Interfaces
{
    public interface IAuthService
    {
        // Registration should return IdentityResult (success/failure info)
        Task<IdentityResult> RegisterAsync(RegisterDto dto);

        // Login returns AuthResponseDto (with JWT token)
        Task<AuthResponseDto?> LoginAsync(LoginDto dto);

        // Generates JWT token for authenticated user
        Task<string> GenerateJwtTokenAsync(AppUser user, string role);
    }
}

/*
==========================================
 FUTURE EXTENSIONS (For better Auth)
------------------------------------------
  ✅ Add Refresh Token support for long-lived sessions
  ✅ Add Logout functionality (invalidate refresh tokens)
  ✅ Implement Password Reset / Forgot Password flow
  ✅ Add Email Verification after registration
  ✅ Implement Multi-Factor Authentication (MFA)
  ✅ Add Role/Policy-based access control (RBAC)
==========================================
*/
