import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useProducts } from "../hooks/use-products";
import { useProductFilters } from "../hooks/use-product-filters";
import { ProductsFilter } from "../components/products-filter";
import { ProductsHeader } from "../components/products-header";
import { ProductsGrid } from "../components/products-grid";
import { ProductsPagination } from "../components/products-pagination";
import { SEOHead } from "@/components/seo";
import { createPageSEO, createBreadcrumbSchema } from "@/lib/seo";
import { useMemo } from "react";
import { useCategories } from "@/features/home/hooks/use-categories";

export function ProductsPage() {
  const {
    filters,
    tempPriceRange,
    setTempPriceRange,
    handleBrandFilter,
    handleCompositionFilter,
    handleMeasurementFilter,
    handleCategoryFilter,
    handlePriceRangeChange,
    handleSortChange,
    handlePageChange,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters();

  const { data, isLoading, error } = useProducts(filters);
  const { data: categories } = useCategories();

  const products = data?.products || [];
  const pagination = data?.pagination;

  // Find the current category if filtering by category
  const currentCategory = useMemo(() => {
    if (!filters.categories?.length || !categories?.length) return null;
    return categories.find(cat => cat.slug === filters.categories![0]);
  }, [filters.categories, categories]);

  const seoConfig = useMemo(() => {
    const hasFilters = filters.categories && filters.categories.length > 0;
    const categoryName = hasFilters ? filters.categories![0] : null;

    if (categoryName) {
      const title = `${categoryName} en Tucumán - Flexigom | Especialistas en Descanso`;
      const description = `Descubrí nuestra selección de ${categoryName.toLowerCase()} en Tucumán. ${pagination?.total ? `${pagination.total} productos disponibles.` : ""} Flexigom, especialistas en productos de descanso con más de 20 años de experiencia.`;

      return createPageSEO({
        title,
        description,
        path: `/products?category=${categoryName.toLowerCase()}`,
        keywords: [
          `${categoryName.toLowerCase()} Tucumán`,
          `comprar ${categoryName.toLowerCase()}`,
          `tienda ${categoryName.toLowerCase()} Tucumán`,
        ],
      });
    }

    const title = "Productos de Descanso en Tucumán - Flexigom";
    const description = `Explorá nuestra amplia selección de productos de descanso en Tucumán. ${pagination?.total ? `${pagination.total} productos disponibles.` : ""} Colchones, sommiers y ropa de cama de la mejor calidad. Más de 20 años de experiencia.`;

    return createPageSEO({
      title,
      description,
      path: "/products",
      keywords: [
        "productos de descanso Tucumán",
        "catálogo Flexigom",
        "tienda completa colchones",
      ],
    });
  }, [filters.categories, pagination?.total]);

  // Generate breadcrumb structured data
  const breadcrumbSchema = useMemo(() => {
    const breadcrumbs = [
      { name: "Inicio", url: "/" },
      { name: "Productos", url: "/products" },
    ];

    // Add category to breadcrumbs if filtering by category
    if (currentCategory) {
      breadcrumbs.push({
        name: currentCategory.name,
        url: `/products?category=${currentCategory.slug}`
      });
    }

    return createBreadcrumbSchema(breadcrumbs);
  }, [currentCategory]);

  if (error) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500">Error al cargar los productos</p>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        config={{
          ...seoConfig,
          structuredData: breadcrumbSchema,
        }}
      />
      <div className="mx-auto px-4 py-6 container">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {currentCategory ? (
                <BreadcrumbLink asChild>
                  <Link to="/products">Productos</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>Productos</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {currentCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentCategory.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block flex-shrink-0 w-64">
            <ProductsFilter
              selectedBrands={filters.brands || []}
              selectedCompositions={filters.compositions || []}
              selectedMeasurements={filters.measurements || []}
              selectedCategories={filters.categories || []}
              tempPriceRange={tempPriceRange}
              hasActiveFilters={hasActiveFilters() ?? false}
              onBrandChange={handleBrandFilter}
              onCompositionChange={handleCompositionFilter}
              onMeasurementChange={handleMeasurementFilter}
              onCategoryChange={handleCategoryFilter}
              onTempPriceRangeChange={setTempPriceRange}
              onPriceRangeCommit={handlePriceRangeChange}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <ProductsHeader
              isLoading={isLoading}
              totalProducts={pagination?.total || products.length}
              currentPage={pagination?.page}
              totalPages={pagination?.pageCount}
              sortBy={filters.sortBy}
              onSortChange={handleSortChange}
              hasActiveFilters={hasActiveFilters() ?? false}
              onClearFilters={clearFilters}
              filters={filters}
              tempPriceRange={tempPriceRange}
              onBrandChange={handleBrandFilter}
              onCompositionChange={handleCompositionFilter}
              onMeasurementChange={handleMeasurementFilter}
              onCategoryChange={handleCategoryFilter}
              onTempPriceRangeChange={setTempPriceRange}
              onPriceRangeCommit={handlePriceRangeChange}
            />

            <ProductsGrid
              products={products}
              isLoading={isLoading}
              hasActiveFilters={hasActiveFilters() ?? false}
              onClearFilters={clearFilters}
            />

            {pagination && (
              <ProductsPagination
                pagination={pagination}
                isLoading={isLoading}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export const Component = ProductsPage;
