"use client";

import { BrainCog, DoorOpen, School } from "lucide-react";
import { NavLink } from "./nav-link";

interface NavigationProps {
  firstLevelId?: string;
  location: string;
}

export default function Navigation({
  location,
  firstLevelId,
}: NavigationProps) {
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
      subRoute: firstLevelId,
    },
    {
      label: "Prácticas con IA",
      icon: BrainCog,
      href: "/chat",
    },
  ];
  return (
    <div className="space-y-2">
      {links.map((link) => (
        <NavLink
          Icon={link.icon}
          location={location}
          subRoute={link.subRoute}
          key={link.href}
          href={link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
