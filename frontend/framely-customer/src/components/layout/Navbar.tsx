"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import Button from "@/components/ui/Button";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { user, logout, hydrated } = auth;

  const baseLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

  const authLinks = user ? [{ name: "My Orders", href: "/orders" }] : [];
  const allLinks = [...baseLinks, ...authLinks];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--background-alt)]/80 border-b border-[var(--glass-border)] shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
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

          {/* ✅ Show Cart only if logged in */}
          {hydrated && user && (
            <Link
              href="/cart"
              className="relative ml-4 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition"
            >
              <ShoppingCart size={22} />
            </Link>
          )}

          {/* ✅ Auth Button */}
          <div className="ml-4">
            {hydrated &&
              (user ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                >
                  Logout ({user.fullName})
                </Button>
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
              ))}
          </div>
        </nav>

        {/* ✅ Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {hydrated && user && (
            <Link
              href="/cart"
              className="text-[var(--foreground-muted)] hover:text-[var(--accent)]"
            >
              <ShoppingCart size={22} />
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
                <Button
                  variant="secondary"
                  size="md"
                  className="mt-3 w-full"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    window.location.href = "/";
                  }}
                >
                  Logout ({user.fullName})
                </Button>
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
