import { Separator } from "@/components/ui/separator";

export default function Transactions() {
  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold text-primary">
        Gestion de transacciones
      </h1>
      <Separator />
      <Transactions />
    </div>
  );
}
