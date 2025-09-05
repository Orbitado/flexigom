import { Outlet } from "react-router";
import { Navbar } from "@/features/home/components/navbar";

export function RootLayout() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
