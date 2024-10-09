import { api } from "@/trpc/server";

export default async function Home() {
  const availableLectures =
    await api.lectureSession.getAvailableLectureSessions({
      levelId: "1d222f4c-de44-46e2-a79f-810dc8a1ddfc",
    });

  return <div>{JSON.stringify(availableLectures)}</div>;
}
