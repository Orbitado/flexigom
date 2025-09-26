export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterConfig;
  structuredData?: StructuredDataConfig | StructuredDataConfig[];
}

export interface OpenGraphConfig {
  title?: string;
  description?: string;
  type?: "website" | "article" | "product";
  image?: string;
  url?: string;
  siteName?: string;
  locale?: string;
}

export interface TwitterConfig {
  card?: "summary" | "summary_large_image" | "app" | "player";
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface StructuredDataConfig {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export interface LocalBusinessSchema extends StructuredDataConfig {
  "@type": "LocalBusiness";
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  openingHours: string[];
  priceRange: string;
  image: string[];
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
  hasOfferCatalog: {
    "@type": "OfferCatalog";
    name: string;
    itemListElement: Array<{
      "@type": "Offer";
      itemOffered: {
        "@type": "Product";
        name: string;
        description: string;
      };
    }>;
  };
}

export interface ProductPageSEO extends SEOConfig {
  productName: string;
  productPrice?: string;
  productBrand?: string;
  productAvailability?: string;
  productImages?: string[];
}

export interface CategoryPageSEO extends SEOConfig {
  categoryName: string;
  productCount?: number;
}
