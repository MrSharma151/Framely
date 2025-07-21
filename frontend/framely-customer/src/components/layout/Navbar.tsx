"use client";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "My Orders", href: "/orders" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--background-alt)]/80 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* ✅ Logo */}
        <div className="text-2xl font-bold text-white tracking-wide">
          <a href="/">Framely</a>
        </div>

        {/* ✅ Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Main Links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-[var(--accent)] transition-colors duration-300 relative group"
            >
              {link.name}
              {/* 🔥 Hover underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {/* ✅ Cart Icon */}
          <a
            href="/cart"
            className="relative ml-4 text-gray-300 hover:text-[var(--accent)] transition-colors duration-300"
          >
            <ShoppingCart size={22} />
            {/* 🛍️ Future Item Count Badge */}
            {/* <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-black text-xs font-bold px-1.5 py-0.5 rounded-full">2</span> */}
          </a>

          {/* ✅ Auth Button */}
          <div className="ml-4">
            <Button variant="primary" size="sm">
              <a href="/auth">Login / Register</a>
            </Button>
          </div>
        </nav>

        {/* ✅ Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* Cart icon in mobile */}
          <a href="/cart" className="text-gray-300 hover:text-[var(--accent)]">
            <ShoppingCart size={22} />
          </a>

          {/* Burger menu */}
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
        <div className="md:hidden bg-[var(--background-alt)]/95 backdrop-blur-lg border-t border-white/10 shadow-lg transition-all">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[var(--accent)] transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {/* ✅ Cart + Auth for Mobile */}
            <a
              href="/cart"
              className="text-gray-300 hover:text-[var(--accent)] transition"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </a>

            <Button
              variant="primary"
              size="md"
              className="mt-3 w-full"
              onClick={() => setIsOpen(false)}
            >
              <a href="/auth">Login / Register</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
