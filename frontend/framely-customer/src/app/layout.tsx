import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/components/layout/Layout";
import { Providers } from "./providers"; // ✅ new import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Framely",
  description: "Optical store built with Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ✅ Providers ko body ke andar wrap karo */}
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
