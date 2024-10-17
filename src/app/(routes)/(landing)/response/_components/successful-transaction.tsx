import { CheckCircle, CreditCard, Calendar, Building } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { ValidationResponse } from "types/epayco";

export default function SuccessfulTransaction({
  x_id_invoice,
  x_description,
  x_amount,
  x_currency_code,
  x_bank_name,
  x_cardnumber,
  x_transaction_date,
  x_transaction_state,
}: ValidationResponse["data"]) {
  return (
    <>
      <Separator />
      <Card className="mx-auto my-16 w-full max-w-md space-y-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            ¡Transacción Exitosa!
          </CardTitle>
          <CardDescription>
            Tu cuenta ha sido activada correctamente
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Número de Factura:</span>
            <span>{x_id_invoice}</span>
          </div>
          <div className="flex justify-between">
            <span className="mr-10 font-semibold">Descripción:</span>
            <span className="text-right">{x_description}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Monto:</span>
            <span className="font-semibold">{`${x_amount} ${x_currency_code}`}</span>
          </div>
          <Separator />
          {x_bank_name !== "N/A" && (
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>{x_bank_name}</span>
            </div>
          )}
          {x_cardnumber !== "*******" && (
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>{x_cardnumber}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(x_transaction_date).toLocaleString()}</span>
          </div>
          <div className="mt-4 rounded-md bg-green-100 p-3 text-center text-green-700">
            Estado: {x_transaction_state}
          </div>
        </CardContent>
        <CardFooter>
          <Link className="w-full" href="/auth/login">
            <Button className="w-full">Entrar a la academia</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
