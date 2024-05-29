"use client";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <NavLink
        href="/"
        className="mr-6 flex items-center space-x-2 text-xl font-semibold"
      >
        Global talk
      </NavLink>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {siteConfig.navigation.map((link) => (
          <NavLink key={link.url} href={link.url}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
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
