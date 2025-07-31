"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

// Admin panel navigation links
const navLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Orders", path: "/orders" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  // Logs out the current user and redirects to login page
  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header
      className="
        sticky top-0 z-50 
        bg-[rgba(11,30,57,0.85)] 
        backdrop-blur-xl 
        border-b border-[var(--border-color)] 
        shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo with branding */}
          <Link
            href="/"
            aria-label="Framely Admin Home"
            className="
              text-2xl font-extrabold tracking-tight 
              bg-gradient-to-r from-[#8AB4F8] via-[#A5D7E8] to-[#8AB4F8] 
              bg-clip-text text-transparent 
              drop-shadow-[0_0_10px_rgba(165,215,232,0.25)] 
              hover:drop-shadow-[0_0_14px_rgba(165,215,232,0.4)]
              transition-all duration-300
            "
          >
            Framely Admin
          </Link>

          {/* Desktop navigation links */}
          <nav className="hidden md:flex gap-10" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.path); // better for nested routes

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`
                    relative text-sm font-medium tracking-wide 
                    transition-all duration-300 
                    ${
                      isActive
                        ? "text-[var(--highlight)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#A5D7E8] after:to-[#8AB4F8]"
                        : "text-[var(--text-secondary)] hover:text-transparent hover:bg-gradient-to-r hover:from-[#A5D7E8] hover:to-[#8AB4F8] hover:bg-clip-text hover:drop-shadow-[0_0_6px_rgba(165,215,232,0.3)]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop user section */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <>
                <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--highlight)] transition-colors">
                  <User size={18} className="text-[var(--highlight)]" />
                  {user.fullName ?? user.email ?? "Admin"}
                </span>
                <Button onClick={handleLogout} variant="gradient">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => router.push("/auth/login")} variant="gradient">
                Login
              </Button>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--highlight)] transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div
          className="
            md:hidden 
            bg-[rgba(11,30,57,0.95)] 
            backdrop-blur-xl 
            border-t border-[var(--border-color)] 
            animate-fade-in
          "
        >
          <nav className="flex flex-col p-5 space-y-5" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    text-base font-medium tracking-wide 
                    transition duration-300 
                    ${
                      isActive
                        ? "text-[var(--highlight)]"
                        : "text-[var(--text-secondary)] hover:text-transparent hover:bg-gradient-to-r hover:from-[#A5D7E8] hover:to-[#8AB4F8] hover:bg-clip-text hover:drop-shadow-[0_0_8px_rgba(165,215,232,0.4)]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Auth section for mobile */}
            {user ? (
              <Button onClick={handleLogout} variant="gradient">
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/auth/login");
                }}
                variant="gradient"
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
