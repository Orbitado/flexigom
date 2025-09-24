import api from "@/lib/api";
import type {
  StrapiResponse,
  Product,
  ProductFilters,
  ApiRequestOptions,
} from "@/types";

interface ProductApiParams extends ApiRequestOptions {
  populate: string[];
  filters?: {
    categories?: {
      slug?: {
        $eq?: string;
        $in?: string[];
      };
    };
    price?: {
      $gte: number;
      $lte: number;
    };
    brand?: {
      $in: string[];
    };
    composition?: {
      $in: string[];
    };
    measurement?: {
      $in: string[];
    };
  };
  sort?: string;
}

export class ProductService {
  static async getProducts(
    filters?: ProductFilters,
  ): Promise<StrapiResponse<Product[]>> {
    try {
      const apiParams: ProductApiParams = {
        populate: ["categories", "images"],
      };

      if (filters) {
        if (!apiParams.filters) {
          apiParams.filters = {};
        }

        if (filters.category) {
          apiParams.filters.categories = {
            slug: {
              $eq: filters.category,
            },
          };
        }

        if (filters.categories && filters.categories.length > 0) {
          apiParams.filters.categories = {
            slug: {
              $in: filters.categories,
            },
          };
        }

        if (filters.priceRange) {
          apiParams.filters.price = {
            $gte: filters.priceRange.min,
            $lte: filters.priceRange.max,
          };
        }

        if (filters.brands && filters.brands.length > 0) {
          apiParams.filters.brand = {
            $in: filters.brands,
          };
        }

        if (filters.compositions && filters.compositions.length > 0) {
          apiParams.filters.composition = {
            $in: filters.compositions,
          };
        }

        if (filters.measurements && filters.measurements.length > 0) {
          apiParams.filters.measurement = {
            $in: filters.measurements,
          };
        }

        if (filters.page) {
          apiParams.pagination = {
            page: filters.page,
            pageSize: filters.pageSize || 25,
          };
        }

        if (filters.sortBy) {
          switch (filters.sortBy) {
            case "price_asc":
              apiParams.sort = "price:asc";
              break;
            case "price_desc":
              apiParams.sort = "price:desc";
              break;
            case "name":
              apiParams.sort = "name:asc";
              break;
            case "rating":
              apiParams.sort = "rating:desc";
              break;
            case "newest":
              apiParams.sort = "createdAt:desc";
              break;
            default:
              break;
          }
        }
      }

      const response = await api.get<StrapiResponse<Product[]>>("/products", {
        params: apiParams,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async getProduct(documentId: string): Promise<Product> {
    try {
      if (!documentId || typeof documentId !== "string") {
        throw new Error("Invalid documentId provided");
      }

      const response = await api.get<StrapiResponse<Product>>(
        `/products/${documentId}`,
        {
          params: {
            populate: ["categories", "images"] as const,
          } satisfies Pick<ProductApiParams, "populate">,
        },
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${documentId}:`, error);
      throw error;
    }
  }

  static async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      if (!productData || typeof productData !== "object") {
        throw new Error("Invalid product data provided");
      }

      const response = await api.post<StrapiResponse<Product>>("/products", {
        data: productData,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  static async updateProduct(
    documentId: string,
    productData: Partial<Product>,
  ): Promise<Product> {
    try {
      if (!documentId || typeof documentId !== "string") {
        throw new Error("Invalid documentId provided");
      }

      if (!productData || typeof productData !== "object") {
        throw new Error("Invalid product data provided");
      }

      const response = await api.put<StrapiResponse<Product>>(
        `/products/${documentId}`,
        {
          data: productData,
        },
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error updating product with ID ${documentId}:`, error);
      throw error;
    }
  }

  static async deleteProduct(documentId: string): Promise<void> {
    try {
      if (!documentId || typeof documentId !== "string") {
        throw new Error("Invalid documentId provided");
      }

      await api.delete(`/products/${documentId}`);
    } catch (error) {
      console.error(`Error deleting product with ID ${documentId}:`, error);
      throw error;
    }
  }
}
