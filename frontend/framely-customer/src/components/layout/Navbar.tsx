"use client";

import { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { AuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext"; // ✅ Import cart context

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { user, logout, hydrated } = auth;

  const { cart } = useCart(); // ✅ Get cart state
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // ✅ total quantity

  const baseLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

  const userLinks = user ? [{ name: "My Orders", href: "/orders" }] : [];
  const allLinks = [...baseLinks, ...userLinks];

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--background-alt)]/80 border-b border-[var(--glass-border)] shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        
        {/* ✅ Logo */}
        <div className="text-2xl font-bold tracking-wide text-[var(--foreground)] hover:text-[var(--accent)] transition">
          <Link href="/">Framely</Link>
        </div>

        {/* ✅ Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {allLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* ✅ Cart Icon with Badge */}
          {hydrated && user && (
            <Link
              href="/cart"
              className="relative ml-4 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition"
            >
              <ShoppingCart size={22} />
              {/* ✅ Show badge if items > 0 */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--accent)] text-white text-xs font-medium flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* ✅ User Dropdown Section */}
          <div className="ml-4 relative" ref={dropdownRef}>
            {hydrated && user ? (
              <>
                {/* ✅ Compact Hi, Username! Button */}
                <button
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full
                             bg-gradient-to-r from-purple-500/20 to-pink-500/20
                             border border-purple-500/30 shadow-sm
                             hover:scale-[1.02] hover:shadow-[var(--accent)]/30 transition-all"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-xs">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>

                  {/* Hi, Username! */}
                  <span className="text-xs sm:text-sm font-medium text-[var(--foreground)] whitespace-nowrap">
                    Hi, {user.fullName.split(" ")[0]}!
                  </span>

                  {/* Dropdown Arrow */}
                  <ChevronDown
                    size={14}
                    className={`text-[var(--foreground-muted)] transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ✅ Floating Dropdown Menu */}
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-3 w-56 rounded-xl 
                               bg-[var(--background)]/95 backdrop-blur-xl 
                               shadow-2xl border border-[var(--glass-border)] 
                               p-4 animate-fadeIn space-y-3"
                  >
                    {/* My Profile */}
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm 
                                 text-[var(--foreground)] hover:bg-[var(--accent)]/10 
                                 hover:text-[var(--accent)] transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      👤 My Profile
                    </Link>

                    <hr className="border-[var(--glass-border)]" />

                    {/* ✅ Premium Logout Button */}
                    <button
                      onClick={() => {
                        logout();
                        window.location.href = "/";
                      }}
                      className="w-full px-3 py-2 rounded-md text-sm font-medium 
                                 bg-gradient-to-r from-red-500 to-pink-500 
                                 text-white hover:opacity-90 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="primary"
                  size="sm"
                  className="hover:scale-[1.03] hover:shadow-md hover:shadow-[var(--accent)]/30 transition-all text-white"
                >
                  Login / Register
                </Button>
              </Link>
            )}
          </div>
        </nav>

        {/* ✅ Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {hydrated && user && (
            <Link
              href="/cart"
              className="relative text-[var(--foreground-muted)] hover:text-[var(--accent)]"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--accent)] text-white text-xs font-medium flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          <button
            className="text-[var(--foreground-muted)] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--background-alt)]/95 backdrop-blur-lg border-t border-[var(--glass-border)] shadow-lg transition-all">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {allLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* ✅ Mobile Auth Button */}
            {hydrated &&
              (user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition"
                    onClick={() => setIsOpen(false)}
                  >
                    👤 My Profile
                  </Link>
                  <Button
                    variant="secondary"
                    size="md"
                    className="mt-3 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      window.location.href = "/";
                    }}
                  >
                    🚪 Logout
                  </Button>
                </>
              ) : (
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="primary"
                    size="md"
                    className="mt-3 w-full hover:scale-[1.02] transition-all text-white"
                  >
                    Login / Register
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
