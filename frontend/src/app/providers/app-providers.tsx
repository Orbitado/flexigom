import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryProvider } from "./query-provider";
import { Toaster } from "sonner";
import { initMercadoPago } from "@mercadopago/sdk-react";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
    locale: "es-AR",
  });

  return (
    <HelmetProvider>
      <QueryProvider>{children}</QueryProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </HelmetProvider>
  );
}
