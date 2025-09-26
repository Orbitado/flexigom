import { Helmet } from "react-helmet-async";
import type { StructuredDataConfig } from "@/lib/seo/types";

interface StructuredDataProps {
  data: StructuredDataConfig | StructuredDataConfig[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const structuredData = Array.isArray(data) ? data : [data];

  return (
    <Helmet>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </Helmet>
  );
}
