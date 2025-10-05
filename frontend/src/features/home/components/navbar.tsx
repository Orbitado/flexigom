import { NavbarLogo } from "./navbar-logo";
import { NavbarLinks } from "./navbar-links";
import { NavbarMobile } from "./navbar-mobile";
import { navbarConfig } from "../config/navbar-config";
import { SearchProductsBar } from "@/components/search-products-bar";
import { useCategories } from "../hooks/use-categories";
import { MiniCart } from "@/features/cart/components/mini-cart";

export function Navbar() {
  const { data: categories, isLoading: categoriesLoading } = useCategories();

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
            <NavbarLinks
              items={navbarConfig.mainNavigation}
              categories={categories}
              categoriesLoading={categoriesLoading}
            />
          </nav>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Bar */}
          <SearchProductsBar
            variant="dialog"
            className="hidden md:block"
            placeholder="Buscar productos..."
          />

          <MiniCart />

          {/* Mobile/Tablet Menu */}
          <NavbarMobile
            items={navbarConfig.mainNavigation}
            mobileMenu={navbarConfig.mobileMenu}
            categories={categories}
            categoriesLoading={categoriesLoading}
          />
        </div>
      </div>
    </header>
  );
}
