import { NextResponse } from "next/server";
import { groups, users } from "@/server/db/schema";
import { db } from "@/server/db";
import { env } from "@/env";
import { and, eq, sql } from "drizzle-orm";
import { chargeSubscription, getCustomerById } from "@/lib/epayco";

export const maxDuration = 60;

interface Student {
  planType: "RECURRENT" | "LEVEL" | "COMPLETE" | "STAFF" | "EXTERNAL";
  id: string;
  ip: string | null;
  subscriptionId: string | null;
  customerId: string | null;
  group: {
    startingDate: string;
  };
}

function getDateAfter61Days(startDate: Date): Date {
  const resultDate = new Date(startDate);

  resultDate.setDate(resultDate.getDate() + 61);

  return resultDate;
}

const chargeStudentSubscription = async (student: Student) => {
  if (student.customerId) {
    const epaycoCustomer = await getCustomerById(student.customerId);
    const customerData = epaycoCustomer?.data?.data;

    if (customerData && student.ip && customerData?.cards[0]?.token) {
      const epaycoSubscriptionResponse = await chargeSubscription({
        id_plan: student.planType,
        customer: customerData.id_customer,
        token_card: customerData.cards[0].token,
        doc_type: "CC",
        doc_number: customerData.doc_number,
        ip: student.ip,
      });

      return epaycoSubscriptionResponse;
    } else {
      console.error("Error getting customer data");
    }
  }
};

export async function GET(req: Request, _res: Response) {
  if (req.headers.get("Authorization") !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
        subscriptionId: true,
        planType: true,
        customerId: true,
        ip: true,
      },
      with: {
        group: {
          columns: {
            startingDate: true,
          },
        },
      },
    });
    students.forEach((student) => {
      if (student.planType === "RECURRENT") {
        chargeStudentSubscription(student)
          .then((res) => {
            console.log(res);
            if (res?.success === true) {
              console.log("activating user ...");
              db.update(users)
                .set({
                  active: true,
                  current_level: 1,
                })
                .where(eq(users.id, student.id))
                .then(() => {
                  console.log("user activated");
                })
                .catch((err) => {
                  console.error(`Error activating user: ${student.id}`, err);
                });
            }
          })
          .catch((err) =>
            console.error(`Error charging subscription of: ${student.id}`, err),
          );
      } else {
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
      }
    });
    db.update(groups)
      .set({
        currentLevel: 1,
      })
      .where(eq(groups.id, startingGroup.id))
      .then(() => {
        return NextResponse.json({ message: "Grupo y usuarios activados" });
      })
      .catch((err) => {
        console.error(`Error activating group: ${startingGroup.id}`, err);
      });
  }

  // Check if the already started groups are ending a level

  const students = await db.query.users.findMany({
    where: and(
      eq(users.role, env.STUDENT_ROLE),
      eq(users.planType, "RECURRENT"),
      eq(users.planType, "LEVEL"),
    ),
    columns: {
      id: true,
      planType: true,
    },
    with: {
      group: {
        columns: {
          startingDate: true,
        },
      },
    },
  });

  const endOfLevelStudents = students.map((student) => {
    const endOfLevel = getDateAfter61Days(new Date(student.group.startingDate))
      .toISOString()
      .slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);

    const isTodayEndOfLevel = endOfLevel === today;

    if (isTodayEndOfLevel) {
      return student.id;
    }
  });

  await db
    .update(users)
    .set({
      active: false,
    })
    .where(sql`${users.id} IN ${endOfLevelStudents}`);
}
