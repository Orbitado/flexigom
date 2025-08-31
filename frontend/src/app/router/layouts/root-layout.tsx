import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}
