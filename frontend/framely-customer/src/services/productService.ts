import apiClient from "./apiClient";

export interface PaginatedProductsResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: Product[];
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;      // still returned by backend
  categoryName?: string;   // optional for UI filtering
}

/**
 * ✅ Fetch paginated products for ShopPage
 */
export const getProducts = async (
  page = 1,
  pageSize = 10,
  sortBy = "name",
  sortOrder: "asc" | "desc" = "asc"
): Promise<PaginatedProductsResponse> => {
  try {
    const response = await apiClient.get(
      `/Products?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    );

    return {
      totalItems: response.data?.totalItems ?? 0,
      totalPages: response.data?.totalPages ?? 1,
      currentPage: response.data?.currentPage ?? page,
      pageSize: response.data?.pageSize ?? pageSize,
      data: response.data?.data ?? [],
    };
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);

    return {
      totalItems: 0,
      totalPages: 1,
      currentPage: page,
      pageSize,
      data: [],
    };
  }
};

/**
 * ✅ Fetch single product by ID for ProductDetailsPage
 * - Always returns a `Product | null`
 * - Ensures categoryName is filled if backend doesn't send it
 */
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await apiClient.get(`/Products/${id}`);

    if (!response.data) return null;

    return {
      ...response.data,
      categoryName: response.data.categoryName || "Uncategorized", // ✅ fallback
      imageUrl: response.data.imageUrl || "/images/products/aviator.jpeg", // ✅ fallback image
    } as Product;
  } catch (error) {
    console.error(`❌ Failed to fetch product ${id}:`, error);
    return null;
  }
};

/**
 * ✅ Fetch products by category (used for category filtering in ShopPage)
 */
export const getProductsByCategoryName = async (
  categoryName: string
): Promise<Product[]> => {
  try {
    const cleanName = categoryName.trim();
    const url = `/Products/category?name=${cleanName}`;

    const response = await apiClient.get(url, { transformRequest: [(data) => data] });

    return response.data ?? [];
  } catch (error) {
    console.error(`❌ Failed to fetch products for category "${categoryName}":`, error);
    return [];
  }
};

/**
 * ✅ Filter by brand
 */
export const getProductsByBrand = async (brandName: string): Promise<Product[]> => {
  try {
    const cleanBrand = brandName.trim();
    const url = `/Products/brand?name=${cleanBrand}`;
    console.log("📤 Sending exact raw brand filter:", url);

    const response = await apiClient.get(url, { transformRequest: [(data) => data] });

    return response.data ?? [];
  } catch (error) {
    console.error(`❌ Failed to fetch products for brand "${brandName}":`, error);
    return [];
  }
};

/**
 * ✅ Server-side search
 */
export const searchProducts = async (term: string): Promise<Product[]> => {
  try {
    const cleanTerm = term.trim();
    const url = `/Products/search?term=${cleanTerm}`;
    console.log("📤 Searching exact raw term:", url);

    const response = await apiClient.get(url, { transformRequest: [(data) => data] });

    return response.data ?? [];
  } catch (error) {
    console.error(`❌ Failed to search products for term "${term}":`, error);
    return [];
  }
};
