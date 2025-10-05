import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartItemCount } from "../hooks/use-cart";
import { Cart } from "./cart";
import { useState } from "react";

/**
 * Mini cart button with item count badge
 * Opens cart drawer when clicked
 */
export function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = useCartItemCount();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(true)}
        aria-label={`Carrito de compras${itemCount > 0 ? ` (${itemCount} productos)` : ""}`}
      >
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="flex absolute -top-1 -right-1 justify-center items-center bg-red-600 rounded-full min-w-[1.25rem] h-5 px-1 font-semibold text-white text-xs">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </Button>

      <Cart open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
