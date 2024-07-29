"use client";

import { BrainCog, DoorOpen, School } from "lucide-react";
import { NavLink } from "./nav-link";

interface NavigationProps {
  location: string;
}

export default function Navigation({ location }: NavigationProps) {
  const links = [
    {
      label: "Inicio",
      icon: DoorOpen,
      href: "",
    },
    {
      label: "Clases",
      icon: School,
      href: "/lectures",
    },
    {
      label: "Prácticas con IA",
      icon: BrainCog,
      href: "/ai",
    },
  ];
  return (
    <div className="space-y-2">
      {links.map((link) => (
        <NavLink
          Icon={link.icon}
          location={location}
          key={link.href}
          href={link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
