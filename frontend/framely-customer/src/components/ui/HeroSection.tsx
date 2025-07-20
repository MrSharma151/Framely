export default function HeroSection() {
  return (
    <section className="relative w-screen h-[70vh] m-0 p-0 overflow-hidden">
      {/* ✅ Full Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
      />

      {/* ✅ Dark Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✅ Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
          Discover Premium Eyewear
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 drop-shadow-md">
          Stylish frames & lenses to match your personality
        </p>
        <a
          href="#"
          className="px-6 py-3 bg-[#c8a84e] text-black hover:bg-[#b78f33] rounded-md text-lg font-semibold transition duration-300"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
