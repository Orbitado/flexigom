import { Outlet } from "react-router";
import { Navbar } from "@/features/home/components/navbar";
import { FloatingSupport } from "@/components/floating-support";

export function RootLayout() {
  return (
    <div className="relative bg-background min-h-screen">
      <Navbar />
      <main className="mx-auto">
        <Outlet />
      </main>
      <FloatingSupport />
    </div>
  );
}
