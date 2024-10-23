"use client";

import type { Prompt } from "@/lib/definitions";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Prompt>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <p className="w-[40rem] truncate text-sm text-muted-foreground">
        {row.original.description}
      </p>
    ),
  },
  {
    accessorKey: "prompt",
    header: "Prompt",
    cell: ({ row }) => (
      <p className="w-[40rem] truncate text-sm text-muted-foreground">
        {row.original.description}
      </p>
    ),
  },
];
