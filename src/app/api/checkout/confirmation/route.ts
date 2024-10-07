import { env } from "@/env";
import { db } from "@/server/db";
import { transactions } from "@/server/db/schema";
import { createHash } from "crypto";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import type { ConfirmationParams } from "types/epayco";

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

const updateTransaction = async (
  id: string,
  status: TransactionStatus,
  phone?: string,
) => {
  const transaccion = await db
    .update(transactions)
    .set({
      status,
      phone,
    })
    .where(eq(transactions.id, id))
    .returning();

  if (!transaccion) {
    throw new Error("No se encontro la transacción");
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
    x_ref_payco,
    x_transaction_id,
    x_amount,
    x_currency_code,
    x_cod_response,
    x_signature,
    x_extra2,
    x_extra3,
    x_extra4,
  } = queryParams;

  // Valores de configuración de ePayco
  const p_cust_id_cliente = env.P_CUST_ID_CLIENTE;
  const p_key = env.P_KEY;

  // Validar que exista la id de la transacción
  if (!x_extra4) {
    return NextResponse.json(
      { message: "No se encontro la id de la transacción" },
      { status: 404 },
    );
  }

  // Obtener transaccion
  const transaction = await db.query.transactions.findFirst({
    where: eq(transactions.id, x_extra4),
  });

  if (!transaction) {
    return NextResponse.json(
      { message: "No se encontro la transacción" },
      { status: 404 },
    );
  }

  // Obtener invoice y valor en el sistema del comercio
  const numOrder = transaction.receipt;
  const valueOrder = transaction.ammount;

  // Validar que el valor de la transacción coincida con el del sistema
  if (
    x_id_invoice === numOrder &&
    Number(x_amount) === Number(valueOrder) &&
    transaction.ammount
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

    // Validar la firma y otros datos
    if (x_signature === signature) {
      // La firma es válida, puedes verificar el estado de la transacción
      switch (Number(x_cod_response)) {
        case 1:
          await updateTransaction(x_extra4, "PAID", x_extra3);

          return NextResponse.json(
            { message: "Transacción aceptada" },
            { status: 200 },
          );
        case 2:
          await updateTransaction(x_extra4, "REJECTED");

          return NextResponse.json(
            { message: "Transacción rechazada" },
            { status: 403 },
          );
        case 3:
          await updateTransaction(x_extra4, "PENDING");

          return NextResponse.json(
            { message: "Transacción pendiente" },
            { status: 202 },
          );
        case 4:
          await updateTransaction(x_extra4, "FAILED");

          return NextResponse.json(
            { message: "Transacción fallida" },
            { status: 500 },
          );
        default:
          await updateTransaction(x_extra4, "UNKNOWN");

          return NextResponse.json(
            { message: "Estado de transacción desconocido" },
            { status: 500 },
          );
      }
    } else {
      await updateTransaction(x_extra4, "INVALID");

      return NextResponse.json({ message: "Firma no válida" }, { status: 400 });
    }
  } else {
    await updateTransaction(x_extra4, "MISMATCH");

    return NextResponse.json(
      { message: "Algunos datos no coinciden" },
      { status: 400 },
    );
  }
}
