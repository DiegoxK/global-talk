import { Separator } from "@/components/ui/separator";
import Users from "./sections/users";
import Prompts from "./sections/prompts";
import Transactions from "./sections/transactions";

export default function Admin() {
  return (
    <>
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Gestion de usuarios</h1>
        <Separator />
        <Users />
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">Gestion de prompts</h1>
        <Separator />
        <Prompts />
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-bold text-primary">
          Gestion de transacciones
        </h1>
        <Separator />
        <Transactions />
      </div>
    </>
  );
}
