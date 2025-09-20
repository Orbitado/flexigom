import { cn, getImageUrl, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import type { Product } from "@/types";
import { Link } from "react-router";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const imageUrl = getImageUrl(product.images?.[0]?.url);
  const price = Number(product.price) || 0;
  const discountPrice = Number(product.discount_price) || 0;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group flex flex-col bg-white shadow-lg hover:shadow-xl border border-gray-100 rounded-xl h-full overflow-hidden transition-shadow duration-300",
        className,
      )}
    >
      <div className="relative flex justify-center items-center bg-gray-200 aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={
              product.images?.[0]?.alternativeText ||
              `Imagen de ${product.name}`
            }
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <img src="/flexigom.png" alt={product.name} />
        )}

        {hasDiscount && (
          <Badge
            variant="destructive"
            className="top-3 right-3 absolute bg-red-600 hover:bg-red-700 font-bold text-white"
          >
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col flex-1 space-y-4 p-6 min-h-[200px]">
        <div className="flex-1 space-y-3">
          <h3 className="font-bold text-black text-xl line-clamp-2">
            {product.name || "Producto sin nombre"}
          </h3>

          {/* Brand and category tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.brand && (
              <Badge variant="destructive" className="text-xs">
                {product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}
              </Badge>
            )}
            {product.categories?.[0]?.name && (
              <Badge variant="outline" className="text-xs">
                {product.categories[0].name}
              </Badge>
            )}
          </div>

          {/* Star rating */}
          {product.rating && (
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="sm"
              className="mb-2"
            />
          )}

          <div className="space-y-1">
            {hasDiscount ? (
              <>
                <div className="flex flex-row items-center space-x-3">
                  <span className="text-gray-500 text-sm line-through">
                    {formatPrice(price)}
                  </span>
                  <span className="font-bold text-red-600 text-2xl">
                    {formatPrice(discountPrice)}
                  </span>
                </div>
                <div className="font-medium text-green-600 text-sm">
                  Ahorras {formatPrice(price - discountPrice)}
                </div>
              </>
            ) : (
              <span className="font-bold text-gray-900 text-2xl">
                {formatPrice(price)}
              </span>
            )}
          </div>

          {product.description && typeof product.description === "string" && (
            <p className="overflow-hidden text-gray-700 text-sm break-words line-clamp-3 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <Button
          asChild
          className="bg-red-600 hover:bg-red-700 mt-auto w-full font-medium text-white"
        >
          <Link to={`/products/${product.id || "producto"}`}>Ver Producto</Link>
        </Button>
      </div>
    </div>
  );
}
