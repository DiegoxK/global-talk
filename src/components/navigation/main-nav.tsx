"use client";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Logo } from "@/vectors/logo";

export default function MainNav() {
  return (
    <nav className="hidden w-full justify-between md:flex">
      <NavLink
        href="/"
        className="mr-6 flex items-center space-x-2 text-3xl font-semibold text-primary"
      >
        <Logo className="me-1 fill-primary" width={38} height={40} />
        lobal Talk Medallo
      </NavLink>
      <div className="flex items-center space-x-6 text-sm font-medium">
        {siteConfig.navigation.map((link) => (
          <NavLink key={link.url} href={link.url}>
            {link.label}
          </NavLink>
        ))}
        <Button>¡Quiero unirme!</Button>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  toggleOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NavLink({
  href,
  className,
  children,
  toggleOpen,
  ...props
}: NavLinkProps): JSX.Element | null {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "hover:text-foreground/80 transition-colors",
        pathname === href ? "text-foreground" : "text-foreground/60",
        className,
      )}
      onClick={toggleOpen !== undefined ? () => toggleOpen(false) : undefined}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
