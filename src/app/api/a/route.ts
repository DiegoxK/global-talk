import {
  cancelSubscription,
  chargeSubscription,
  getCustomerById,
} from "@/lib/epayco";
import { NextResponse } from "next/server";

export async function GET(_req: Request, _res: Response) {
  // const customer = await getCustomerById("70ec8ff3811826b0f022072");

  // if (customer?.data?.data) {
  //   const response = await chargeSubscription({
  //     id_plan: "beginners_a0",
  //     customer: customer?.data?.data?.id_customer,
  //     token_card: customer?.data?.data?.cards[0]?.token,
  //     doc_type: "CC",
  //     doc_number: customer.data.data.doc_number,
  //     ip: "186.28.88.142",
  //   });

  //   console.log(response);
  // }

  const isStartingDate =
    new Date("2024-10-15").toISOString().slice(0, 10) ===
    new Date().toISOString().slice(0, 10);

  console.log(
    isStartingDate,
    new Date("2024-10-15").toISOString().slice(0, 10),
    new Date().toISOString().slice(0, 10),
  );

  // await cancelSubscription("70ec903db151e8f0b0bbd72");

  return NextResponse.json({ ok: true });
}
