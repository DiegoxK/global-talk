import { NextResponse } from "next/server";
import { groups, levels, programs, users } from "@/server/db/schema";
import { db } from "@/server/db";
import { env } from "@/env";
import { and, count, eq, gt, sql } from "drizzle-orm";
import { chargeSubscription, getCustomerById } from "@/lib/epayco";

export const maxDuration = 60;

interface Student {
  planType: "RECURRENT" | "LEVEL" | "COMPLETE" | "STAFF" | "EXTERNAL";
  id: string;
  name: string;
  programId: string;
  group: {
    startingDate: string;
  };
}

function getFinishLevelDate(startDate: Date, currentLevel: number): Date {
  const resultDate = new Date(startDate);

  resultDate.setDate(resultDate.getDate() + 60 * currentLevel);

  return resultDate;
}

// const chargeStudentSubscription = async (student: Student) => {
//   if (student.customerId) {
//     console.log("getting epayco customer");
//     const epaycoCustomer = await getCustomerById(student.customerId);
//     const customerData = epaycoCustomer?.data?.data;

//     console.log("cheking if customer data exists");
//     if (customerData && student.ip && customerData?.cards[0]?.token) {
//       console.log("charging subscription");
//       try {
//         const epaycoSubscriptionResponse = await chargeSubscription({
//           id_plan: student.programId,
//           customer: customerData.id_customer,
//           token_card: customerData.cards[0].token,
//           doc_type: "CC",
//           doc_number: customerData.doc_number,
//           ip: student.ip,
//         });

//         console.log("subscription charged ");
//         return epaycoSubscriptionResponse;
//       } catch (error) {
//         console.error("Error charging subscription", error);
//       }
//     } else {
//       console.error("Error getting customer data");
//     }
//   }
// };

export async function GET(req: Request, _res: Response) {
  if (req.headers.get("Authorization") !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // ======================Activate group============================

  // Checks if the current date is the starting date of a group
  const disabledGroups = await db.query.groups.findMany({
    where: eq(groups.currentLevel, 0),
  });

  const startingGroup = disabledGroups.find((group) => {
    const isTodayStartingDate =
      new Date(group.startingDate).toISOString().slice(0, 10) ===
      new Date().toISOString().slice(0, 10);
    return isTodayStartingDate;
  });

  if (startingGroup) {
    try {
      console.log("Activating students from group: ", startingGroup.name);
      await db
        .update(users)
        .set({
          current_level: 1,
        })
        .where(
          and(
            eq(users.role, env.STUDENT_ROLE),
            eq(users.groupId, startingGroup.id),
          ),
        );

      console.log("Activating group");
      await db
        .update(groups)
        .set({
          currentLevel: 1,
        })
        .where(eq(groups.id, startingGroup.id));

      return NextResponse.json({ message: "Grupo y usuarios activados" });
    } catch (error) {
      console.error(`Error activating group: ${startingGroup.id}`, error);
    }
  }

  // Check if the already started groups are ending a level
  const runningGroups = await db.query.groups.findMany({
    where: gt(groups.currentLevel, 0),
  });

  runningGroups.forEach((group) => {
    const finishLevelDate = getFinishLevelDate(
      new Date(group.startingDate),
      group.currentLevel,
    );

    const today = new Date().toISOString().slice(0, 10);
    const isTodayEndOfLevel =
      finishLevelDate.toISOString().slice(0, 10) === today;

    if (isTodayEndOfLevel) {
      db.execute(
        sql`
        UPDATE ${users} AS gtu
        SET
          active = FALSE
        FROM
          (
            SELECT
              gtu.id AS student_id,
              COUNT(gtl.id) AS level_count
           FROM
             ${users}
             LEFT JOIN ${programs} AS gtp ON gtp.id = gtu.program_id
              LEFT JOIN ${levels} AS gtl ON gtl.program_id = gtp.id
           GROUP BY
              gtu.id
          ) AS sq
        WHERE
          gtu.role = ${env.STUDENT_ROLE}
          AND gtu.group_id = ${group.id}
          AND sq.level_count < ${group.currentLevel}
        `,
      )
        .then(() => {
          console.log("Students ended level");
        })
        .catch((err) => {
          console.error(`Error ending level: ${group.id}`, err);
        });

      db.update(groups)
        .set({
          currentLevel: group.currentLevel + 1,
        })
        .where(eq(groups.id, group.id))
        .then(() => {
          console.log("Group ended level");
        })
        .catch((err) => {
          console.error(`Error ending level: ${group.id}`, err);
        });
    }
  });

  return NextResponse.json({ message: "Request procesada" });
}
