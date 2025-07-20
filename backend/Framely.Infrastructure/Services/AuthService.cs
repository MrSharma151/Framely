using Framely.Core.DTOs.Auth;
using Framely.Core.Interfaces;
using Framely.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Framely.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _config;

        public AuthService(UserManager<AppUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        /// <summary>
        /// Registers a new user and assigns the default "USER" role
        /// </summary>
        public async Task<IdentityResult> RegisterAsync(RegisterDto dto)
        {
            // Check if user already exists
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                return IdentityResult.Failed(new IdentityError
                {
                    Description = "Email is already registered."
                });
            }

            var user = new AppUser
            {
                FullName = dto.FullName,
                UserName = dto.Email,   // Username = email
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber
            };

            // Create user with hashed password
            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded) return result;

            // Always assign default "USER" role in CAPS
            await _userManager.AddToRoleAsync(user, "USER");

            return result;
        }

        /// <summary>
        /// Login existing user & generate JWT token
        /// </summary>
        public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return null;

            var validPassword = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!validPassword) return null;

            // Fetch user role (default to USER in CAPS)
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "USER";

            // Generate token
            var token = await GenerateJwtTokenAsync(user, role);

            // Get expiry from config
            var jwtSettings = _config.GetSection("JwtSettings");
            var expiresAt = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiresInMinutes"]));

            return new AuthResponseDto
            {
                UserId = user.Id,
                FullName = user.FullName ?? string.Empty,
                Email = user.Email!,
                Role = role,   // Always USER/ADMIN in caps
                Token = token,
                ExpiresAt = expiresAt
            };
        }

        /// <summary>
        /// Generate a JWT token for authenticated users
        /// </summary>
        public Task<string> GenerateJwtTokenAsync(AppUser user, string role)
        {
            var jwtSettings = _config.GetSection("JwtSettings");

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(ClaimTypes.Name, user.FullName ?? string.Empty),
                new Claim(ClaimTypes.Role, role) // Will always be USER or ADMIN in CAPS
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiresInMinutes"])),
                signingCredentials: creds
            );

            return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}
