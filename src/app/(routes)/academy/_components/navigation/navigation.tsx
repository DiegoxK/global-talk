"use client";

import { BrainCog, DoorOpen, School } from "lucide-react";
import { NavLink } from "./nav-link";
import type { User } from "@/lib/definitions";

interface NavigationProps {
  user: User;
  firstLevelId?: string;
  location: string;
}

export default function Navigation({
  location,
  firstLevelId,
  user,
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
          disabled={!user.active}
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
