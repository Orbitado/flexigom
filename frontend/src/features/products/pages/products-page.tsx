import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function ProductsPage() {
  const products = [
    { id: 1, name: "Product 1", price: "$99.99" },
    { id: 2, name: "Product 2", price: "$149.99" },
    { id: 3, name: "Product 3", price: "$199.99" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground">Discover our amazing products</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-muted-foreground">{product.price}</p>
            <Button asChild variant="outline">
              <Link to={`/products/${product.id}`}>View Details</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Component = ProductsPage;
