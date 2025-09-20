export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string;
  url: string;
}

export interface ApiError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

export interface ApiRequestOptions {
  populate?: string | string[];
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  locale?: string;
  publicationState?: "live" | "preview";
}

export interface Category extends StrapiEntity {
  image?: StrapiMedia;
  slug: string;
  name: string;
  description: string;
  products?: Product[];
}

export interface Product extends StrapiEntity {
  categories: Category[];
  slug: string;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  stock: number;
  images: StrapiMedia[];
  specifications: Record<string, unknown>;
  composition: string;
  measurement: string;
  brand: string;
  rating?: number;
  reviewCount?: number;
}

export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  brands?: string[];
  compositions?: string[];
  measurements?: string[];
  sortBy?: "price_asc" | "price_desc" | "name" | "rating" | "newest";
  page?: number;
  pageSize?: number;
}
