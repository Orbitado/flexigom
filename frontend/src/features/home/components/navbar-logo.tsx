import { Link } from "react-router";

interface NavbarLogoProps {
  text?: string;
  href: string;
}

export function NavbarLogo({ text, href }: NavbarLogoProps) {
  return (
    <Link
      to={href}
      className="flex items-center space-x-2 font-bold text-foreground hover:text-primary text-xl transition-colors"
    >
      <img src="/flexigom.png" alt="Logo de Flexigom" className="w-32" />
      <span>{text}</span>
    </Link>
  );
}
