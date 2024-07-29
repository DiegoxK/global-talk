"use client";

import { Separator } from "@/components/ui/separator";
import { NavLink } from "./nav-link";
import { ShieldCheck } from "lucide-react";

export default function AdminNav() {
  return (
    <>
      <Separator className="my-2" />
      <NavLink Icon={ShieldCheck} href="/admin" location="/academy">
        Administrador
      </NavLink>
    </>
  );
}
