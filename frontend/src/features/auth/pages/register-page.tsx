import { Button } from "@/components/ui/button";

export function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">Join Flexigom today</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your name"
          />
        </div>
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
            placeholder="Create a password"
          />
        </div>
        <Button className="w-full">Create Account</Button>
      </div>
    </div>
  );
}

export const Component = RegisterPage;
