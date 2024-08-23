import { Transactions, Users } from "@/vectors/miscellaneous";
import Link from "next/link";

export default function Admin() {
  return (
    <div className="flex h-full flex-wrap items-center justify-center gap-x-14 gap-y-10 py-10">
      <Link href="/academy/admin/users">
        <button className="flex h-[410px] w-[410px] flex-col items-center justify-center rounded-md border shadow-md">
          <Users className="mb-6" width={250} height={250} />
          <h2 className="text-2xl font-bold text-primary-600">Usuarios</h2>
          <p>Gestion de usuarios</p>
        </button>
      </Link>
      <Link href="/academy/admin/transactions">
        <button className="flex h-[410px] w-[410px] flex-col items-center justify-center rounded-md border shadow-md">
          <Transactions width={280} height={280} />
          <h2 className="text-2xl font-bold text-primary-600">Transacciones</h2>
          <p>Gestion de transacciones</p>
        </button>
      </Link>
    </div>
  );
}
