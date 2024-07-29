import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  Icon: LucideIcon;
  href: string;
  location: string;
  className?: string;
  children: React.ReactNode;
  toggleOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NavLink({
  Icon,
  href,
  location,
  className,
  children,
  toggleOpen,
  ...props
}: NavLinkProps): JSX.Element | null {
  const path = usePathname();
  const pathname = path.replace(location, "");

  const isActive = (href: string) => {
    if (href === "") return pathname === "";
    return pathname.startsWith(href);
  };

  return (
    <Link
      className={cn(
        "flex items-center p-2 ps-4 text-primary-700",
        isActive(href) && "rounded-md bg-primary text-white",
        className,
      )}
      onClick={toggleOpen !== undefined ? () => toggleOpen(false) : undefined}
      href={`${location}${href}`}
      {...props}
    >
      <Icon className="mr-2 h-5 w-5" />
      {children}
    </Link>
  );
}
