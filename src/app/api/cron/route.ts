import { NextResponse } from "next/server";
import { groups, users } from "@/server/db/schema";
import { db } from "@/server/db";
import { env } from "@/env";
import { and, eq, gt } from "drizzle-orm";
import { chargeSubscription, getCustomerById } from "@/lib/epayco";

export const maxDuration = 60;

interface Student {
  planType: "RECURRENT" | "LEVEL" | "COMPLETE" | "STAFF" | "EXTERNAL";
  id: string;
  name: string;
  ip: string | null;
  subscriptionId: string | null;
  programId: string;
  customerId: string | null;
  group: {
    startingDate: string;
  };
}

async function sequentialForEach<T>(
  array: (T | undefined)[],
  callback: (item: T, index: number, array: (T | undefined)[]) => Promise<void>,
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item !== undefined) {
      await callback(item, index, array);
    }
  }
}

function getFinishLevelDate(startDate: Date, currentLevel: number): Date {
  const resultDate = new Date(startDate);

  resultDate.setDate(resultDate.getDate() + 62 * currentLevel);

  return resultDate;
}

const chargeStudentSubscription = async (student: Student) => {
  if (student.customerId) {
    console.log("getting epayco customer");
    const epaycoCustomer = await getCustomerById(student.customerId);
    const customerData = epaycoCustomer?.data?.data;

    console.log("cheking if customer data exists");
    if (customerData && student.ip && customerData?.cards[0]?.token) {
      console.log("charging subscription");
      try {
        const epaycoSubscriptionResponse = await chargeSubscription({
          id_plan: student.programId,
          customer: customerData.id_customer,
          token_card: customerData.cards[0].token,
          doc_type: "CC",
          doc_number: customerData.doc_number,
          ip: student.ip,
        });

        console.log("subscription charged ");
        return epaycoSubscriptionResponse;
      } catch (error) {
        console.error("Error charging subscription", error);
      }
    } else {
      console.error("Error getting customer data");
    }
  }
};

export async function GET(req: Request, _res: Response) {
  // if (req.headers.get("Authorization") !== `Bearer ${env.CRON_SECRET}`) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  // Check if the current date is the starting date of a group
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
    const students = await db.query.users.findMany({
      where: and(
        eq(users.role, env.STUDENT_ROLE),
        eq(users.groupId, startingGroup.id),
      ),
      columns: {
        id: true,
        name: true,
        planType: true,
        programId: true,
      },
      with: {
        group: {
          columns: {
            startingDate: true,
          },
        },
      },
    });

    await sequentialForEach(students, async (student) => {
      db.update(users)
        .set({
          current_level: 1,
        })
        .where(eq(users.id, student.id))
        .then(() => {
          console.log("user activated");
        })
        .catch((err) => {
          console.error(`Error activating user: ${student.id}`, err);
        });
    });

    try {
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

  // runningGroups.forEach((group) => {
  //   const finishLevelDate = getFinishLevelDate(
  //     new Date(group.startingDate),
  //     group.currentLevel,
  //   );

  //   const today = new Date().toISOString().slice(0, 10);
  //   const isTodayEndOfLevel =
  //     finishLevelDate.toISOString().slice(0, 10) === today;

  //   if (isTodayEndOfLevel) {
  //     const students = db.query.users.findMany({
  //       where: and(
  //         eq(users.role, env.STUDENT_ROLE),
  //         eq(users.planType, "RECURRENT"),
  //         eq(users.planType, "LEVEL"),
  //         eq(users.groupId, group.id),
  //       ),
  //       columns: {
  //         id: true,
  //         planType: true,
  //       },
  //       with: {
  //         group: {
  //           columns: {
  //             startingDate: true,
  //           },
  //         },
  //       },
  //     });
  //   }
  // });

  // const students = await db.query.users.findMany({
  //   where: and(
  //     eq(users.role, env.STUDENT_ROLE),
  //     eq(users.planType, "RECURRENT"),
  //     eq(users.planType, "LEVEL"),
  //   ),
  //   columns: {
  //     id: true,
  //     planType: true,
  //   },
  //   with: {
  //     group: {
  //       columns: {
  //         startingDate: true,
  //       },
  //     },
  //   },
  // });

  return NextResponse.json({ message: "Request procesada" });
}
