import api from "@/lib/api";
import type { StrapiResponse, Category } from "@/types";

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    const response = await api.get<StrapiResponse<Category[]>>(`/categories`);
    return response.data.data;
  }

  static async getCategory(id: number): Promise<Category> {
    const response = await api.get<StrapiResponse<Category>>(
      `/categories/${id}`,
    );
    return response.data.data;
  }

  static async createCategory(
    categoryData: Partial<Category["attributes"]>,
  ): Promise<Category> {
    const response = await api.post<StrapiResponse<Category>>("/categories", {
      data: categoryData,
    });
    return response.data.data;
  }

  static async updateCategory(
    id: number,
    categoryData: Partial<Category["attributes"]>,
  ): Promise<Category> {
    const response = await api.put<StrapiResponse<Category>>(
      `/categories/${id}`,
      {
        data: categoryData,
      },
    );
    return response.data.data;
  }

  static async deleteCategory(id: number): Promise<void> {
    await api.delete(`/categories/${id}`);
  }
}
