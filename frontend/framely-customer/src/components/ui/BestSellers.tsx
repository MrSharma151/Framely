"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getProducts, Product } from "@/services/productService";
import ProductCard from "@/components/ui/ProductCard";

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);

        // ✅ Fetch only 4 products (page 1, size 4)
        const res = await getProducts(1, 4, "name", "asc");
        const fetched = res.data || [];

        setProducts(fetched);
      } catch (err) {
        console.error("❌ Failed to load best sellers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="py-20 relative">
      {/* ✅ Section Title */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
          Best <span className="text-[var(--accent)]">Sellers</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-[var(--foreground-muted)] max-w-xl mx-auto">
          Our most loved eyewear picked just for you
        </p>
      </div>

      {/* ✅ Loader */}
      {loading ? (
        <div className="flex justify-center py-10 text-gray-400">
          <Loader2 className="animate-spin mr-2" /> Loading Best Sellers...
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* ✅ No Products Case */}
          {products.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No best sellers found.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
