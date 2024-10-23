import { env } from "@/env";
import { db } from "@/server/db";
import { levels, programs, users } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_req: Request, _res: Response) {
  const query = sql`
  UPDATE ${users} AS gtu
  SET
    active = FALSE
  FROM
    (
      SELECT
        gtu.id AS student_id,
        COUNT(gtl.id) AS level_count
     FROM
       ${users} AS gtu
       LEFT JOIN ${programs} AS gtp ON gtp.id = gtu.program_id
        LEFT JOIN ${levels} AS gtl ON gtl.program_id = gtp.id
     GROUP BY
        gtu.id
    ) AS sq
  WHERE
    sq.student_id = gtu.id
    AND sq.level_count < 2
  `;

  console.log(query);

  await db.execute(query);

  return NextResponse.json({ ok: true });
}
