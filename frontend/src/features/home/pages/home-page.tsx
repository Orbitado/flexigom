import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Flexigom</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          A modern application built with React Router 7 and screaming
          architecture
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild>
          <Link to="/products">View Products</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/auth/login">Sign In</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/auth/register">Sign Up</Link>
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-lg font-semibold">Architecture Features</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>✅ React Router 7 Data Mode</li>
          <li>✅ Screaming Architecture</li>
          <li>✅ Feature-based Organization</li>
          <li>✅ Lazy Loading Routes</li>
          <li>✅ Centralized Providers</li>
          <li>✅ Error Boundaries</li>
        </ul>
      </div>
    </div>
  );
}
