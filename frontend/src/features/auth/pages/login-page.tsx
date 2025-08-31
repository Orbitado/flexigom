import { Button } from "@/components/ui/button";

export function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">Welcome back to Flexigom</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <Button className="w-full">Sign In</Button>
      </div>
    </div>
  );
}

export const Component = LoginPage;
