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
        {
          label: "Colchones",
          href: "/products?category=colchones",
          description:
            "Explora nuestro catálogo completo de colchones, sommiers y ropa de cama",
        },
        {
          label: "Colchones",
          href: "/products?category=colchones",
          description: "Colchones para todo tipo de habitaciones",
        },
        {
          label: "Sommiers",
          href: "/products?category=sommiers",
          description: "Sommiers para todo tipo de habitaciones",
        },
        {
          label: "Ropa de Cama",
          href: "/products?category=ropa-de-cama",
          description: "Ropa de cama para todo tipo de habitaciones",
        },
      ],
    },
    {
      label: "Nosotros",
      href: "/nosotros",
    },
    {
      label: "Contacto",
      href: "/contacto",
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
