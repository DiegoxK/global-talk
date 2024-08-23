import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { api } from "@/trpc/server";

export default async function Users() {
  const users = await api.user.getAllUsers();

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold text-primary">Gestion de usuarios</h1>
      <Separator />
      <div className="mt-4">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
