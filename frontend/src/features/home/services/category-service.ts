import api from "@/lib/api";
import type { CategoryItem } from "../types";

export interface StrapiCategory {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface GetCategoriesResponse {
  data: StrapiCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const categoryService = {
  async getCategories(): Promise<CategoryItem[]> {
    const response = await api.get<GetCategoriesResponse>("/categories");

    return response.data.data.map((category) => ({
      id: category.documentId,
      name: category.name,
      description: category.description,
      contractId: category.documentId,
      href: `/productos/${category.documentId}`,
    }));
  },

  async getCategoryById(contractId: string): Promise<CategoryItem | null> {
    const response = await api.get<GetCategoriesResponse>(
      `/categories?filters[documentId][$eq]=${contractId}`,
    );

    if (response.data.data.length === 0) {
      return null;
    }

    const category = response.data.data[0];
    return {
      id: category.documentId,
      name: category.name,
      description: category.description,
      contractId: category.documentId,
      href: `/productos/${category.documentId}`,
    };
  },
};
