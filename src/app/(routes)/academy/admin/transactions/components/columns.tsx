"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { Transaction } from "@/lib/definitions";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "amount",
    header: "Cantidad",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div>$ {amount}</div>;
    },
  },
  {
    accessorKey: "receipt",
    header: "Factura",
  },
  {
    accessorKey: "user.name",
    header: "Nombre",
  },
  {
    accessorKey: "user.lastName",
    header: "Apellido",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "user.phone",
    header: "Teléfono",
  },
  {
    accessorKey: "user.planType",
    header: "Plan",
  },
  {
    accessorKey: "user.program.name",
    header: "Programa",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "description",
    header: "Descripcion",
  },
];
