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

export function ProductsPage() {
  const {
    filters,
    tempPriceRange,
    setTempPriceRange,
    handleBrandFilter,
    handlePriceRangeChange,
    handleSortChange,
    handlePageChange,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters();

  const { data, isLoading, error } = useProducts(filters);

  const products = data?.products || [];
  const pagination = data?.pagination;

  if (error) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500">Error al cargar los productos</p>
      </div>
    );
  }

  return (
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
            <BreadcrumbPage>Productos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-8">
        <ProductsFilter
          selectedBrands={filters.brands || []}
          tempPriceRange={tempPriceRange}
          hasActiveFilters={hasActiveFilters() ?? false}
          onBrandChange={handleBrandFilter}
          onTempPriceRangeChange={setTempPriceRange}
          onPriceRangeCommit={handlePriceRangeChange}
          onClearFilters={clearFilters}
        />

        <main className="flex-1">
          <ProductsHeader
            isLoading={isLoading}
            totalProducts={pagination?.total || products.length}
            currentPage={pagination?.page}
            totalPages={pagination?.pageCount}
            sortBy={filters.sortBy}
            onSortChange={handleSortChange}
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
  );
}

export const Component = ProductsPage;
