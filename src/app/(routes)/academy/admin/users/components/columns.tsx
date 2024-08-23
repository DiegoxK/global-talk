"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { UserWithRole } from "@/lib/definitions";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserWithRole>[] = [
  {
    accessorKey: "image",
    header: "Imagen",
    size: 60,
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
    size: 70,
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
    size: 100,
  },
  {
    accessorKey: "email",
    size: 200,
    header: "Email",
  },
  {
    accessorKey: "course",
    size: 200,
    header: "Curso",
  },
  {
    accessorKey: "proficiency",
    header: "Nivel",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
];
