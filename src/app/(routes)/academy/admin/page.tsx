import { Prompts, Transactions, Users } from "@/vectors/miscellaneous";
import Link from "next/link";

export default function Admin() {
  return (
    <div className="flex h-full flex-wrap items-center justify-center gap-x-14 gap-y-10 py-10">
      <Link href="/academy/admin/users">
        <button className="flex flex-col items-center justify-center rounded-md border px-10 py-4 shadow-md md:h-[410px] md:w-[410px] md:px-0 md:py-0">
          <Users className="mb-6" width={250} height={250} />
          <h2 className="text-2xl font-bold text-primary-600">Usuarios</h2>
          <p>Gestion de usuarios</p>
        </button>
      </Link>
      <Link href="/academy/admin/prompts">
        <button className="flex flex-col items-center justify-center rounded-md border px-6 py-4 shadow-md md:h-[410px] md:w-[410px] md:px-0 md:py-0">
          <Prompts width={280} height={280} />
          <h2 className="text-2xl font-bold text-primary-600">Prompts</h2>
          <p>Gestion de prompts</p>
        </button>
      </Link>
      <Link href="/academy/admin/transactions">
        <button className="flex flex-col items-center justify-center rounded-md border px-6 py-4 shadow-md md:h-[410px] md:w-[410px] md:px-0 md:py-0">
          <Transactions width={280} height={280} />
          <h2 className="text-2xl font-bold text-primary-600">Transacciones</h2>
          <p>Gestion de transacciones</p>
        </button>
      </Link>
    </div>
  );
}
