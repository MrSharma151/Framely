using AutoMapper;
using Framely.Core.Models;
using Framely.Core.DTOs;

namespace Framely.API.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Product → ProductDto
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : string.Empty));

            // ProductDto → Product
            CreateMap<ProductDto, Product>();

            // Category → CategoryDto (no Products mapping as it's not in DTO)
            CreateMap<Category, CategoryDto>();

            // CategoryDto → Category
            CreateMap<CategoryDto, Category>();

            // OrderItem → OrderItemDto
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : string.Empty));

            // OrderItemDto → OrderItem
            CreateMap<OrderItemDto, OrderItem>();

            // Order → OrderDto
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items)); // ensure items are mapped

            // OrderDto → Order
            CreateMap<OrderDto, Order>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items)); // ensure items map back
        }
    }
}
