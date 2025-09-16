import api from "@/lib/api";
import type { StrapiResponse } from "@/types";
import type { FeaturedProduct, FeaturedProductSection } from "../types";

export class FeaturedProductService {
  static async getFeaturedProducts(): Promise<FeaturedProduct[]> {
    const response = await api.get<StrapiResponse<FeaturedProduct[]>>(
      "/featured-products",
      {
        params: {
          populate: "products.images,products.categories",
        },
      },
    );
    return response.data.data;
  }

  static async getFeaturedProduct(
    documentId: string,
  ): Promise<FeaturedProduct> {
    const response = await api.get<StrapiResponse<FeaturedProduct>>(
      `/featured-products/${documentId}`,
      {
        params: {
          populate: "products.images,products.categories",
        },
      },
    );
    return response.data.data;
  }

  static async getFeaturedProductsBySection(
    section: FeaturedProductSection,
  ): Promise<FeaturedProduct[]> {
    const response = await api.get<StrapiResponse<FeaturedProduct[]>>(
      "/featured-products",
      {
        params: {
          populate: "products.images,products.categories",
          filters: {
            section: {
              $eq: section,
            },
          },
        },
      },
    );
    return response.data.data;
  }

  static async createFeaturedProduct(
    featuredProductData: Partial<FeaturedProduct>,
  ): Promise<FeaturedProduct> {
    const response = await api.post<StrapiResponse<FeaturedProduct>>(
      "/featured-products",
      {
        data: featuredProductData,
      },
    );
    return response.data.data;
  }

  static async updateFeaturedProduct(
    documentId: string,
    featuredProductData: Partial<FeaturedProduct>,
  ): Promise<FeaturedProduct> {
    const response = await api.put<StrapiResponse<FeaturedProduct>>(
      `/featured-products/${documentId}`,
      {
        data: featuredProductData,
      },
    );
    return response.data.data;
  }

  static async deleteFeaturedProduct(documentId: string): Promise<void> {
    await api.delete(`/featured-products/${documentId}`);
  }
}
