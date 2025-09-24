import api from "@/lib/api";
import type { CategoryItem } from "../types/index";
import type { StrapiResponse } from "@/types";

export const categoryService = {
  /**
   * Fetches all categories from the API
   * @returns Promise<CategoryItem[]> - Array of category items
   */
  async getCategories(): Promise<CategoryItem[]> {
    const response = await api.get<StrapiResponse<CategoryItem[]>>(
      "/categories",
      {
        params: {
          populate: ["image", "products"],
        },
      },
    );

    return response.data.data;
  },

  /**
   * Fetches a specific category by its document ID
   * @param documentId - The document ID of the category to fetch
   * @returns Promise<CategoryItem | null> - The category item or null if not found
   */
  async getCategoryById(documentId: string): Promise<CategoryItem | null> {
    try {
      const response = await api.get<StrapiResponse<CategoryItem>>(
        `/categories/${documentId}`,
        {
          params: {
            populate: "image",
          },
        },
      );

      return response.data.data;
    } catch {
      return null;
    }
  },
};
