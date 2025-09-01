import api from "@/lib/api";
import type { StrapiResponse, Product } from "@/types";

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    const response = await api.get<StrapiResponse<Product[]>>(`/products`);
    return response.data.data;
  }

  static async getProduct(documentId: string): Promise<Product> {
    const response = await api.get<StrapiResponse<Product>>(
      `/products/${documentId}`,
    );
    return response.data.data;
  }

  static async createProduct(productData: Partial<Product>): Promise<Product> {
    const response = await api.post<StrapiResponse<Product>>("/products", {
      data: productData,
    });
    return response.data.data;
  }

  static async updateProduct(
    documentId: string,
    productData: Partial<Product>,
  ): Promise<Product> {
    const response = await api.put<StrapiResponse<Product>>(
      `/products/${documentId}`,
      {
        data: productData,
      },
    );
    return response.data.data;
  }

  static async deleteProduct(documentId: string): Promise<void> {
    await api.delete(`/products/${documentId}`);
  }
}
