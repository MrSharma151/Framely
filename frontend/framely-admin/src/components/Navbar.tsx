"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

const navLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Orders", path: "/orders" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔒 Redirect to login page if not authenticated
  useEffect(() => {
    const publicPaths = ["/auth/login"];
    if (!user && !publicPaths.includes(pathname)) {
      router.replace("/auth/login");
    }
  }, [user, pathname, router]);

  const handleLogout = async () => {
    logout();
    setTimeout(() => router.push("/auth/login"), 100); // 🧼 ensures clean redirect
  };

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const renderNavLinks = () =>
    navLinks.map((link) => (
      <Link
        key={link.path}
        href={link.path}
        onClick={() => setMobileMenuOpen(false)}
        className={`relative text-sm font-medium tracking-wide transition-all duration-300 ${
          isActive(link.path)
            ? "text-[var(--highlight)] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#A5D7E8] after:to-[#8AB4F8]"
            : "text-[var(--text-secondary)] hover:text-transparent hover:bg-gradient-to-r hover:from-[#A5D7E8] hover:to-[#8AB4F8] hover:bg-clip-text hover:drop-shadow-[0_0_6px_rgba(165,215,232,0.3)]"
        }`}
      >
        {link.name}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 bg-[rgba(11,30,57,0.85)] backdrop-blur-xl border-b border-[var(--border-color)] shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Framely Admin Home"
            className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#8AB4F8] via-[#A5D7E8] to-[#8AB4F8] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(165,215,232,0.25)] hover:drop-shadow-[0_0_14px_rgba(165,215,232,0.4)] transition-all duration-300"
          >
            Framely Admin
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10" role="navigation" aria-label="Main navigation">
            {user && renderNavLinks()}
          </nav>

          {/* Desktop User Info */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <>
                <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--highlight)] transition-colors">
                  <User size={18} className="text-[var(--highlight)]" />
                  {user.email}
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

          {/* Mobile Toggle */}
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--highlight)] transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[rgba(11,30,57,0.95)] backdrop-blur-xl border-t border-[var(--border-color)] animate-fade-in">
          <nav className="flex flex-col p-5 space-y-5" role="navigation" aria-label="Mobile navigation">
            {user && renderNavLinks()}

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
