"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Folder, ShoppingCart } from "lucide-react";
import { ReactNode } from "react";

const sidebarLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Products", path: "/products", icon: <Package size={18} /> },
  { name: "Categories", path: "/categories", icon: <Folder size={18} /> },
  { name: "Orders", path: "/orders", icon: <ShoppingCart size={18} /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-4 text-lg font-bold text-blue-600 border-b">
          Framely Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-2 p-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.icon} {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
