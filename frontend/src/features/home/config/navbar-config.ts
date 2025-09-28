import type { NavbarConfig } from "../types/navbar-types";

export const navbarConfig: NavbarConfig = {
  logo: {
    text: "Flexigom",
    href: "/",
  },
  mainNavigation: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Catálogo",
      items: [
        {
          label: "Todos los Productos",
          href: "/products",
          description:
            "Explora nuestro catálogo completo de colchones, sommiers y ropa de cama",
        },
      ],
    },
  ],
  authNavigation: {
    loginLabel: "Iniciar Sesión",
    registerLabel: "Registrarse",
    loginHref: "/auth/login",
    registerHref: "/auth/register",
    logoutLabel: "Cerrar Sesión",
    accountLabel: "Mi Cuenta",
  },
  mobileMenu: {
    openLabel: "Abrir menú",
    closeLabel: "Cerrar menú",
    menuAriaLabel: "Menú de navegación principal",
  },
};
