import apiClient from "./apiClient";

export interface Category {
  id: number;          // Backend still returns ID (used for display/reference)
  name: string;        // ✅ We'll use this for filtering products by category
  description: string;
}

export interface PaginatedCategoriesResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: Category[];
}

/**
 * ✅ Fetch categories from backend
 * - Backend returns category names (which we’ll use for filtering)
 * - Supports pagination
 * - Returns safe fallback on failure
 */
export const getCategories = async (
  page = 1,
  pageSize = 50
): Promise<PaginatedCategoriesResponse> => {
  try {
    const response = await apiClient.get(
      `/Categories?page=${page}&pageSize=${pageSize}`
    );

    return {
      totalItems: response.data?.totalItems ?? 0,
      totalPages: response.data?.totalPages ?? 1,
      currentPage: response.data?.currentPage ?? page,
      pageSize: response.data?.pageSize ?? pageSize,
      data: response.data?.data ?? [],
    };
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error);

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
 * ✅ Helper for ShopPage
 * - Fetch all categories without pagination meta
 * - NOTE: Filtering will use `category.name` instead of `id`
 */
export const getAllCategories = async (): Promise<Category[]> => {
  const res = await getCategories(1, 50);
  return res.data;
};
