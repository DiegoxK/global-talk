import { env } from "@/env";
import { db } from "@/server/db";
import { transactions, users } from "@/server/db/schema";
import { createHash } from "crypto";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import type { ConfirmationParams } from "types/epayco";
import { sendConfirmation } from "@/lib/email-config";

type TransactionStatus =
  | "PAID"
  | "REJECTED"
  | "PENDING"
  | "FAILED"
  | "UNKNOWN"
  | "INVALID"
  | "MISMATCH";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const updateTransaction = async (id: string, status: TransactionStatus) => {
  const transaccion = await db
    .update(transactions)
    .set({
      status,
    })
    .where(eq(transactions.id, id))
    .returning();

  if (!transaccion) {
    throw new Error("No se encontro la transacción");
  }
};

const activateUser = async (email?: string) => {
  console.log("Activando usuario ...");
  if (email) {
    const user = await db
      .update(users)
      .set({ active: true })
      .where(eq(users.email, email))
      .returning();

    if (!user?.[0]?.id) throw new Error("Error al obtener el usuario");
  } else {
    throw new Error(
      "Error al obtener el correo electrónico del usuario desde epayco: 'x_customer_email'",
    );
  }
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const queryParams: ConfirmationParams = Object.fromEntries(
    req.nextUrl.searchParams.entries(),
  );

  // Variables de respuesta de ePayco
  const {
    x_id_invoice,
    x_customer_email,
    x_ref_payco,
    x_transaction_id,
    x_amount,
    x_currency_code,
    x_cod_response,
    x_signature,
    x_extra1,
    x_extra5,
  } = queryParams;

  // Valores de configuración de ePayco
  const p_cust_id_cliente = env.P_CUST_ID_CLIENTE;
  const p_key = env.P_KEY;

  // Validar que exista la id de la transacción
  if (!x_extra5) {
    return NextResponse.json(
      { message: "No se encontro la id de la transacción" },
      { status: 404 },
    );
  }

  // Obtener transaccion
  const transaction = await db.query.transactions.findFirst({
    where: eq(transactions.id, x_extra5),
  });

  if (!transaction) {
    return NextResponse.json(
      { message: "No se encontro la transacción" },
      { status: 404 },
    );
  }

  // Obtener invoice y valor en el sistema del comercio
  const numOrder = transaction.receipt;
  const valueOrder = transaction.amount;

  // Validar que el valor de la transacción coincida con el del sistema
  if (
    x_id_invoice === numOrder &&
    Number(x_amount) === Number(valueOrder) &&
    transaction.amount
  ) {
    // Calcular la firma
    const signature = createHash("sha256")
      .update(
        p_cust_id_cliente +
          "^" +
          p_key +
          "^" +
          x_ref_payco +
          "^" +
          x_transaction_id +
          "^" +
          x_amount +
          "^" +
          x_currency_code,
      )
      .digest("hex");

    console.log("x_signature", x_signature);
    console.log("signature", signature);

    // Validar la firma y otros datos
    if (x_signature === signature) {
      // La firma es válida, puedes verificar el estado de la transacción
      switch (Number(x_cod_response)) {
        case 1:
          console.log(
            "Confirmacion exitosa, actualizando transaccion y usuario ...",
          );
          await updateTransaction(x_extra5, "PAID");
          await activateUser(x_customer_email);

          if (!x_customer_email || !x_extra1 || !x_amount)
            throw new Error(
              "Error al enviar email de confirmación: datos faltantes",
            );

          await sendConfirmation({
            programName: x_extra1,
            programValue: x_amount.toString(),
            sendTo: x_customer_email,
          });

          return NextResponse.json(
            { message: "Transacción aceptada" },
            { status: 200 },
          );
        case 2:
          console.log("Confirmacion rechazada, actualizando transaccion ...");
          await updateTransaction(x_extra5, "REJECTED");

          return NextResponse.json(
            { message: "Transacción rechazada" },
            { status: 403 },
          );
        case 3:
          console.log("Confirmacion pendiente, actualizando transaccion ...");
          await updateTransaction(x_extra5, "PENDING");

          return NextResponse.json(
            { message: "Transacción pendiente" },
            { status: 202 },
          );
        case 4:
          console.log("Confirmacion fallida, actualizando transaccion ...");
          await updateTransaction(x_extra5, "FAILED");

          return NextResponse.json(
            { message: "Transacción fallida" },
            { status: 500 },
          );
        default:
          console.log("Confirmacion desconocida, actualizando transaccion ...");
          await updateTransaction(x_extra5, "UNKNOWN");

          return NextResponse.json(
            { message: "Estado de transacción desconocido" },
            { status: 500 },
          );
      }
    } else {
      console.log("La firma no es válida, actualizando transaccion ...");
      await updateTransaction(x_extra5, "INVALID");

      return NextResponse.json({ message: "Firma no válida" }, { status: 400 });
    }
  } else {
    console.log("La firma no coincide, actualizando transaccion ...");
    await updateTransaction(x_extra5, "MISMATCH");

    return NextResponse.json(
      { message: "Algunos datos no coinciden" },
      { status: 400 },
    );
  }
}
