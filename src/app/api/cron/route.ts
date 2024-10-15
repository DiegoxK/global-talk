import { NextResponse } from "next/server";
import { prompts } from "@/server/db/schema";
import { db } from "@/server/db";
import { env } from "@/env";

export async function GET(res: Response, req: Request) {
  if (req.headers.get("Authorization") !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await db.insert(prompts).values({
    name: "Test",
    prompt: "Test",
  });

  return NextResponse.json({ ok: true });
}
