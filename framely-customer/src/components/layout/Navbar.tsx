"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Shop", href: "#" },
    { name: "Categories", href: "#" },
    { name: "Cart", href: "#" },
    { name: "My Orders", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* ✅ Logo */}
        <div className="text-2xl font-bold text-white tracking-wide">
          <a href="#">Framely</a>
        </div>

        {/* ✅ Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-[#c8a84e] transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            className="ml-4 px-4 py-2 rounded-md bg-[#c8a84e] text-black font-semibold hover:bg-[#b78f33] transition"
          >
            Login / Register
          </a>
        </nav>

        {/* ✅ Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 border-t border-white/10 shadow-lg">
          <div className="flex flex-col space-y-3 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[#c8a84e] transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#"
              className="mt-3 px-4 py-2 rounded-md bg-[#c8a84e] text-black text-center font-semibold hover:bg-[#b78f33] transition"
              onClick={() => setIsOpen(false)}
            >
              Login / Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
