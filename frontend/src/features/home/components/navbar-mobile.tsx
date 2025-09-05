import { useState } from "react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MenuIcon, XIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem, NavDropdown } from "../types/navbar-types";

interface NavbarMobileProps {
  items: (NavItem | NavDropdown)[];
  mobileMenu: {
    openLabel: string;
    closeLabel: string;
    menuAriaLabel: string;
  };
}

function isDropdown(item: NavItem | NavDropdown): item is NavDropdown {
  return "items" in item;
}

export function NavbarMobile({ items, mobileMenu }: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdowns([]);
  };

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? mobileMenu.closeLabel : mobileMenu.openLabel}
      >
        {isOpen ? (
          <XIcon className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </Button>

      {isOpen && (
        <div className="top-full right-0 left-0 z-50 absolute bg-background shadow-lg border-t">
          <nav
            className="space-y-1 mx-auto px-4 py-6 container"
            aria-label={mobileMenu.menuAriaLabel}
          >
            {items.map((item) => (
              <div key={item.label}>
                {isDropdown(item) ? (
                  <Collapsible
                    open={openDropdowns.includes(item.label)}
                    onOpenChange={() => toggleDropdown(item.label)}
                  >
                    <CollapsibleTrigger className="flex justify-between items-center hover:bg-accent px-3 py-2 rounded-md w-full font-medium text-left hover:text-accent-foreground">
                      <span>{item.label}</span>
                      <ChevronDownIcon
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openDropdowns.includes(item.label) && "rotate-180",
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 pl-4">
                      {item.items.map((dropdownItem) => (
                        <NavLink
                          key={dropdownItem.href}
                          to={dropdownItem.href}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            cn(
                              "block hover:bg-accent px-3 py-2 rounded-md text-sm transition-colors hover:text-accent-foreground",
                              isActive &&
                                "bg-accent text-accent-foreground font-medium",
                            )
                          }
                        >
                          <div>{dropdownItem.label}</div>
                          {dropdownItem.description && (
                            <div className="mt-1 text-muted-foreground text-xs">
                              {dropdownItem.description}
                            </div>
                          )}
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <NavLink
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      cn(
                        "block hover:bg-accent px-3 py-2 rounded-md font-medium transition-colors hover:text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
