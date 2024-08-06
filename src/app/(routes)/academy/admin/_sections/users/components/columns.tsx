"use client";

import type { UserWithRole } from "@/lib/definitions";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "image",
    header: "Imagen",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
];
