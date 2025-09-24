export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavDropdownItem extends NavItem {
  description?: string;
}

export interface NavDropdown {
  label: string;
  items: NavDropdownItem[];
}

export interface NavbarConfig {
  logo: {
    text: string;
    href: string;
  };
  mainNavigation: (NavItem | NavDropdown)[];
  authNavigation: {
    loginLabel: string;
    registerLabel: string;
    loginHref: string;
    registerHref: string;
    logoutLabel: string;
    accountLabel: string;
  };
  mobileMenu: {
    openLabel: string;
    closeLabel: string;
    menuAriaLabel: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
}
