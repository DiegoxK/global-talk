import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { api } from "@/trpc/server";

export default async function Users() {
  const users = await api.user.getAllUsers();

  return (
    <div className="mt-4">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
