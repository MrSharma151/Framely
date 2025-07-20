using AutoMapper;
using Framely.API.Mappings;
using Framely.Core.Models;
using Framely.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Framely.Core.Interfaces;
using Framely.Infrastructure.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Step 1 Add Controllers
builder.Services.AddControllers();

// Step 2 Add Swagger with proper OpenAPI info
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // ✅ Explicit OpenAPI info so version is valid
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Framely API",
        Version = "1.0.0", // must be a valid semantic version
        Description = "Framely Optical Web App API"
    });

    // ✅ Optional: JWT Auth button in Swagger UI
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter ‘Bearer’ followed by a space and your token."
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


// Step 3 Register DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Step 4 Configure Identity
builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;       
    options.Password.RequireUppercase = true;  
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
});

// Step 5 Configure JWT Authentication
var jwtSection = builder.Configuration.GetSection("JwtSettings");
var jwtKey = jwtSection["Key"] ?? throw new Exception("JWT Key is missing in configuration");
var jwtIssuer = jwtSection["Issuer"] ?? throw new Exception("JWT Issuer is missing in configuration");
var jwtAudience = jwtSection["Audience"] ?? "FramelyUsers";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddScoped<IAuthService, AuthService>();


// Step 6 Register AutoMapper
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(AutoMapperProfile).Assembly));

// Step 7 Add CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// Step 8 Enable Swagger UI only in Dev or Staging
if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Framely API v1");
    });
}

// Step 9 Middleware pipeline
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Step 10 Seed DB and run
await SeedDatabaseAsync(app.Services);
await SeedRolesAndAdminAsync(app.Services);

app.Run();

static async Task SeedRolesAndAdminAsync(IServiceProvider services)
{
    using var scope = services.CreateScope();

    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

    // 1. Ensure roles exist
    string[] roles = { "USER", "ADMIN" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    // 2. Create default Admin user if not exists
    var adminEmail = "admin@framely.com";
    var adminUser = await userManager.FindByEmailAsync(adminEmail);

    if (adminUser == null)
    {
        adminUser = new AppUser
        {
            UserName = adminEmail,
            Email = adminEmail,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(adminUser, "Admin@123"); // default password
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(adminUser, "ADMIN"); // match your role name
        }
    }
}

static async Task SeedDatabaseAsync(IServiceProvider services)
{
    using var scope = services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    if (!context.Products.Any())
    {
        var cat1 = new Category { Name = "Sunglasses" };
        var cat2 = new Category { Name = "Reading Glasses" };

        var prod1 = new Product
        {
            Name = "Ray-Ban Aviator",
            Brand = "Ray-Ban",
            Description = "Classic aviator sunglasses",
            Price = 2999.99M,
            ImageUrl = "images/rayban.jpg",
            Category = cat1
        };
        var prod2 = new Product
        {
            Name = "Titan Reading Pro",
            Brand = "Titan",
            Description = "Blue light filter reading glasses",
            Price = 999.00M,
            ImageUrl = "images/titan.jpg",
            Category = cat2
        };

        var order = new Order
        {
            OrderDate = DateTime.Now,
            CustomerName = "Rohit Sharma",
            Email = "rohit@example.com",
            MobileNumber = "9876543210",
            Address = "123 MG Road Delhi",
            TotalAmount = prod1.Price + prod2.Price,
            Items = new List<OrderItem>()
        };

        var item1 = new OrderItem
        {
            Product = prod1,
            Quantity = 1,
            UnitPrice = prod1.Price,
            Order = order
        };
        var item2 = new OrderItem
        {
            Product = prod2,
            Quantity = 2,
            UnitPrice = prod2.Price,
            Order = order
        };

        order.Items.Add(item1);
        order.Items.Add(item2);
        context.Orders.Add(order);
        await context.SaveChangesAsync();
    }
}
