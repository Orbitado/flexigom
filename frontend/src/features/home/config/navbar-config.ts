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
      label: "Productos",
      items: [
        {
          label: "Todos los Productos",
          href: "/products",
          description: "Explora nuestro catálogo completo de llantas y rines",
        },
        {
          label: "Llantas",
          href: "/products?category=llantas",
          description: "Llantas para todo tipo de vehículos",
        },
        {
          label: "Rines",
          href: "/products?category=rines",
          description: "Rines deportivos y estándar",
        },
        {
          label: "Servicios",
          href: "/products?category=servicios",
          description: "Instalación y mantenimiento profesional",
        },
      ],
    },
    {
      label: "Servicios",
      href: "/servicios",
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
