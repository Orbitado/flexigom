import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarLogo } from "./navbar-logo";
import { NavbarLinks } from "./navbar-links";
import { NavbarMobile } from "./navbar-mobile";
import { navbarConfig } from "../config/navbar-config";
import { SearchProductsBar } from "@/components/search-products-bar";

export function Navbar() {
  return (
    <header
      className="top-0 z-50 sticky bg-white border-b w-full"
      role="banner"
    >
      <div className="flex justify-between items-center mx-auto px-4 h-full container">
        <div className="flex items-center space-x-4 lg:space-x-8">
          <NavbarLogo href={navbarConfig.logo.href} />

          <nav
            className="hidden lg:block"
            role="navigation"
            aria-label="Navegación principal"
          >
            <NavbarLinks items={navbarConfig.mainNavigation} />
          </nav>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Bar */}
          <SearchProductsBar
            variant="dialog"
            className="hidden md:block"
            placeholder="Buscar productos..."
          />

          <Button variant="ghost" size="icon" aria-label="Carrito de compras">
            <ShoppingCartIcon className="w-5 h-5" />
          </Button>

          {/* Mobile/Tablet Menu */}
          <NavbarMobile
            items={navbarConfig.mainNavigation}
            mobileMenu={navbarConfig.mobileMenu}
          />
        </div>
      </div>
    </header>
  );
}
