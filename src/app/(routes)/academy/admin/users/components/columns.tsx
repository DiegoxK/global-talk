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
    accessorKey: "courses.name",
    header: "Curso",
  },
  {
    accessorKey: "courses.proficiency",
    header: "Nivel",
  },
  {
    accessorKey: "roleName",
    header: "Rol",
  },
];
