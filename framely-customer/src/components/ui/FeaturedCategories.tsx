export default function FeaturedCategories() {
  const categories = [
    { name: "Men", image: "/images/categories/men.avif" },
    { name: "Women", image: "/images/categories/women.avif" },
    { name: "Kids", image: "/images/categories/kids.jpg" },
    { name: "Sunglasses", image: "/images/categories/sunglasses.avif" },
  ];

  return (
    // ❌ Extra mt-16 & pt-12 remove ✅ only pb for bottom breathing space
    <section className="pb-12">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
        <p className="text-gray-300 mt-2">Find the perfect eyewear for everyone</p>
      </div>

      {/* Grid Layout */}
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
          >
            {/* ✅ Fixed Box Size */}
            <div className="w-full h-56 relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* ✅ Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>

            {/* ✅ Category Name + Arrow */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-md">
                {cat.name}
              </h3>
              <span className="mt-1 text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition">
                Shop Now →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
