"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { Student } from "@/lib/definitions";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Student>[] = [
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
    accessorKey: "city",
    header: "Ciudad",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "active",
    header: "Activo",
  },
  {
    accessorKey: "group.name",
    header: "Grupo",
  },
  {
    accessorKey: "program.name",
    header: "Programa",
  },
  {
    accessorKey: "current_level",
    header: "Nivel actual",
  },
  {
    accessorKey: "program.proficiency",
    header: "Nivel",
  },
];
