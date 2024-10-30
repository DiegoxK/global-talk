import { XCircle } from "lucide-react";
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

interface FailedTransactionProps {
  errorMessage?: string;
}

export default function FailedTransaction({
  errorMessage = "Lo sentimos, ha ocurrido un error en la transacción.",
}: FailedTransactionProps) {
  return (
    <>
      <Separator />
      <Card className="mx-auto my-16 w-full max-w-md space-y-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Transacción Fallida
          </CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Por favor, verifica tus datos e intenta nuevamente. Si el problema
            persiste, contacta a nuestro servicio de atención al cliente.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link className="w-full" href="/join">
            <Button className="w-full">Intentar Nuevamente</Button>
          </Link>

          <Link className="w-full" href={`mailto:contacto@academiaglobtm.com`}>
            <Button variant="outline" className="w-full">
              Contactar Soporte
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
