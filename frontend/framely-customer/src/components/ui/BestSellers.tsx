import Button from "@/components/ui/Button";

export default function BestSellers() {
  const products = [
    { id: 1, name: "Classic Round Frame", price: "₹2,499", image: "/images/products/round-frame.png" },
    { id: 2, name: "Premium Aviator", price: "₹3,199", image: "/images/products/aviator.jpeg" },
    { id: 3, name: "Blue Light Blocker", price: "₹1,899", image: "/images/products/blue-light.jpeg" },
    { id: 4, name: "Trendy Cat Eye", price: "₹2,799", image: "/images/products/cat-eye.jpeg" },
  ];

  return (
    <section className="py-20 relative">
      {/* ✅ Section Title */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
          Best <span className="text-[var(--accent)]">Sellers</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
          Our most loved eyewear picked just for you
        </p>
      </div>

      {/* ✅ Product Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="group relative rounded-2xl overflow-hidden bg-[var(--background-alt)] 
            shadow-md hover:shadow-xl 
            transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
            hover:-translate-y-[6px]"
          >
            {/* ✅ IMAGE SECTION */}
            <div className="relative w-full h-56 sm:h-60 md:h-64 overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover object-center 
                transform transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] 
                group-hover:scale-110"
              />

              {/* ✅ Smooth Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t 
                from-[var(--background)]/70 via-black/30 to-transparent 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-700 ease-in-out" />

              {/* ✅ Quick View Button */}
              <div className="absolute inset-0 flex items-center justify-center 
                opacity-0 translate-y-3 
                transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] 
                group-hover:opacity-100 group-hover:translate-y-0">
                <Button variant="secondary" size="sm">
                  Quick View
                </Button>
              </div>
            </div>

            {/* ✅ INFO SECTION */}
            <div className="p-5 flex flex-col justify-between text-center">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-wide line-clamp-1">
                  {p.name}
                </h3>
                <p className="mt-1 text-[var(--accent)] font-medium text-sm sm:text-base">
                  {p.price}
                </p>
              </div>

              {/* ✅ Add to Cart with PremiumButton */}
              <Button className="mt-4 w-full">
                Add to Cart →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
