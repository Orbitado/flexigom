import { Helmet } from "react-helmet-async";
import type { SEOConfig } from "@/lib/seo/types";
import { StructuredData } from "./structured-data";

interface SEOHeadProps {
  config: SEOConfig;
}

export function SEOHead({ config }: SEOHeadProps) {
  const {
    title,
    description,
    keywords,
    canonical,
    noindex,
    openGraph,
    twitter,
    structuredData,
  } = config;

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        {canonical && <link rel="canonical" href={canonical} />}

        {/* Robots */}
        <meta
          name="robots"
          content={noindex ? "noindex, nofollow" : "index, follow"}
        />

        {/* Open Graph */}
        {openGraph && (
          <>
            <meta property="og:title" content={openGraph.title} />
            <meta property="og:description" content={openGraph.description} />
            <meta property="og:type" content={openGraph.type} />
            {openGraph.image && (
              <meta property="og:image" content={openGraph.image} />
            )}
            {openGraph.url && (
              <meta property="og:url" content={openGraph.url} />
            )}
            {openGraph.siteName && (
              <meta property="og:site_name" content={openGraph.siteName} />
            )}
            {openGraph.locale && (
              <meta property="og:locale" content={openGraph.locale} />
            )}
          </>
        )}

        {/* Twitter Card */}
        {twitter && (
          <>
            <meta name="twitter:card" content={twitter.card} />
            {twitter.site && (
              <meta name="twitter:site" content={twitter.site} />
            )}
            {twitter.creator && (
              <meta name="twitter:creator" content={twitter.creator} />
            )}
            {twitter.title && (
              <meta name="twitter:title" content={twitter.title} />
            )}
            {twitter.description && (
              <meta name="twitter:description" content={twitter.description} />
            )}
            {twitter.image && (
              <meta name="twitter:image" content={twitter.image} />
            )}
          </>
        )}
      </Helmet>

      {/* Structured Data */}
      {structuredData && <StructuredData data={structuredData} />}
    </>
  );
}
