import { createBrowserRouter, type RouteObject } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { HomePage } from "@/features/home/pages/home-page";
import { ErrorBoundary } from "@/components/error-boundary";
import { rootLoader } from "./loaders/root-loader";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            lazy: () => import("@/features/auth/pages/login-page"),
          },
          {
            path: "register",
            lazy: () => import("@/features/auth/pages/register-page"),
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            lazy: () => import("@/features/products/pages/products-page"),
          },
          {
            path: ":categorySlug",
            loader: ({ params }) => {
              const categorySlug = params.categorySlug;
              if (categorySlug) {
                // Redirect to products page with category filter
                return new Response(null, {
                  status: 302,
                  headers: {
                    Location: `/products?category=${categorySlug}`,
                  },
                });
              }
              return null;
            },
            lazy: () => import("@/features/products/pages/products-page"),
          },
          {
            path: "product/:documentId",
            lazy: () => import("@/features/products/pages/product-detail-page"),
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
