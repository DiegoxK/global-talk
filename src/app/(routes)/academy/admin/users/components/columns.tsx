"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { UserWithRole } from "@/lib/definitions";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "image",
    header: "Imagen",

    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.image ?? undefined} />
        <AvatarFallback>
          {row.original.name[0]}
          {row.original.lastName[0]}
        </AvatarFallback>
      </Avatar>
    ),
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
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "planType",
    header: "Plan",
  },
  {
    accessorKey: "program.name",
    header: "Programa",
  },
  {
    accessorKey: "program.proficiency",
    header: "Nivel",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
];
