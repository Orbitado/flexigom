import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";

export function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link to="/products">← Back to Products</Link>
      </Button>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Product {id}</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-muted aspect-square rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Product Image</span>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">
                This is a detailed description of Product {id}. It includes all
                the important features and benefits.
              </p>
            </div>
            <div>
              <span className="text-2xl font-bold">$199.99</span>
            </div>
            <Button className="w-full">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Component = ProductDetailPage;
