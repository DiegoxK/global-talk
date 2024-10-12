"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableActions from "./data-table-actions";
import { useState } from "react";
import type { UserWithRole } from "@/lib/definitions";
import DataTableDialog from "./data-table-dialog";
import { DataTablePagination } from "./data-table-pagination";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface DataTableProps<TData extends UserWithRole, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends UserWithRole, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [user, setUser] = useState<UserWithRole | undefined | null>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      {user !== undefined && (
        <DataTableDialog
          open={isDialogOpen}
          setUser={setUser}
          user={user}
          setOpen={setIsDialogOpen}
        />
      )}
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Buscar por email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          onClick={() => {
            setUser(null);
            setIsDialogOpen(true);
          }}
          className="rounded-sm"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Añadir usuario
        </Button>
      </div>
      <div className="max-w-[calc(100vw-22rem)] rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}

                <TableHead className="flex items-center justify-end">
                  Acciones
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="truncate" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="mr-3 mt-1 flex items-center justify-end">
                    <DataTableActions
                      user={row.original}
                      setIsDialogOpen={setIsDialogOpen}
                      setUser={setUser}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
