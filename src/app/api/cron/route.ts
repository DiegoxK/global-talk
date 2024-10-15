import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { prompts } from "@/server/db/schema";
import { db } from "@/server/db";
import { env } from "@/env";

export async function GET(res: NextApiResponse, req: Request) {
  if (req.headers.get("Authorization") !== `Bearer ${env.CRON_SECRET}`) {
    return res.status(401).end("Unauthorized");
  }

  await db.insert(prompts).values({
    name: "Test",
    prompt: "Test",
  });

  return NextResponse.json({ ok: true });
}
