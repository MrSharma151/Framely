import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <footer
      className="
        mt-12 
        bg-[rgba(11,30,57,0.9)]
        backdrop-blur-xl 
        border-t border-[var(--border-color)]
        shadow-[0_-2px_12px_rgba(0,0,0,0.4)]
        text-center 
        py-6 
        transition-all
      "
    >
      {/* 🌐 Footer Nav Links */}
      <div className="flex flex-wrap justify-center gap-6 mb-4">
        {footerLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="
              text-sm font-medium tracking-wide 
              text-[var(--text-secondary)] 
              hover:text-transparent 
              hover:bg-gradient-to-r hover:from-[#A5D7E8] hover:to-[#8AB4F8] 
              hover:bg-clip-text 
              hover:drop-shadow-[0_0_6px_rgba(165,215,232,0.3)]
              transition-all duration-300
            "
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* 📜 Copyright */}
      <div
        className="
          text-xs 
          text-[var(--text-secondary)]
          tracking-wide
        "
      >
        © {year}{" "}
        <span
          className="
            font-semibold 
            bg-gradient-to-r from-[#A5D7E8] to-[#8AB4F8]
            bg-clip-text text-transparent
            drop-shadow-[0_0_6px_rgba(165,215,232,0.25)]
          "
        >
          Framely Admin
        </span>{" "}
        · All rights reserved.
      </div>
    </footer>
  );
}
