"use client";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

export default function MainNav() {
  return (
    <nav className="hidden justify-between md:flex">
      <div className="flex items-center space-x-6 text-sm">
        {siteConfig.navigation.map((link) => (
          <NavLink key={link.url} href={link.url}>
            {link.label}
          </NavLink>
        ))}
        <Button className="bg-primary px-6">¡Quiero unirme!</Button>
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
        "text-base transition-colors hover:text-primary",
        pathname === href ? "font-bold text-primary" : "text-foreground",
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
