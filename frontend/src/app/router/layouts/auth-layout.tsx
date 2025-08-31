import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="flex justify-center items-center bg-muted/10 min-h-screen">
      <div className="p-6 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
