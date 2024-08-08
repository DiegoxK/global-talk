import type { StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";

import Course1 from "../../../../../../public/courses/course1.png";
import Course2 from "../../../../../../public/courses/course2.png";
import Course3 from "../../../../../../public/courses/course3.png";
import Image from "next/image";
import { Laptop, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@react-email/components";

export default function Courses() {
  const courses = [
    {
      plan: "Mensual",
      proficiency: "A2",
      price: "400,000",
      image: Course1,
      title: "De A2 a B1",
      levels: 5,
      students: 5,
    },
    {
      plan: "Mensual",
      proficiency: "A2",
      price: "400,000",
      image: Course2,
      title: "Inglés para los negocios",
      levels: 5,
      students: 5,
    },
    {
      plan: "Mensual",
      proficiency: "B2",
      price: "400,000",
      image: Course3,
      title: "De B1 a B2",
      levels: 5,
      students: 5,
    },
  ];

  return (
    <section className="py-48" id="courses">
      <div className="flex flex-col items-center gap-6 pb-8 text-center">
        <h2 className="text-5xl font-semibold text-primary md:w-[800px]">
          ¡Impulsa tu inglés con nuestros cursos más populares!
        </h2>
        <p className="self-center text-primary-900 md:w-[840px]">
          Sumérgete en clases interactivas diseñadas para todas las edades y
          niveles. Aprende con expertos y una comunidad vibrante. ¡Elige tu
          curso y comienza hoy!
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.title} className="flex flex-col items-center">
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </section>
  );
}

interface CourseCardProps {
  plan: string;
  proficiency: string;
  price: string;
  image: StaticImageData;
  title: string;
  levels: number;
  students: number;
}

const CourseCard = ({
  plan,
  proficiency,
  price,
  image,
  title,
  levels,
  students,
}: CourseCardProps) => {
  return (
    <div className="w-full rounded-md border shadow-md md:w-auto">
      <Image className="w-full md:w-auto" src={image} alt={title} />
      <div className="space-y-4 p-4">
        <div className="flex justify-between">
          <Badge className="rounded-md">Plan {plan}</Badge>
          <Badge className="rounded-md">{proficiency} Min</Badge>
        </div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-xl font-bold text-primary">COP ${price}/mes</p>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Laptop className="h-5 w-5 text-primary" />{" "}
            <span>{levels} niveles</span>
          </div>
          <div className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-primary" />{" "}
            <span>{students} estudiantes por clase</span>
          </div>
        </div>
      </div>
      <Link href="/join">
        <Button
          size="lg"
          className="w-full rounded-none rounded-b-md bg-primary-600 text-lg"
        >
          ¡Me interesa!
        </Button>
      </Link>
    </div>
  );
};
