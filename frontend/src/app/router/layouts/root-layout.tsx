import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
