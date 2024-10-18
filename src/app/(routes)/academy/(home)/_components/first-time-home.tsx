import { CalendarIcon, BookOpen, Layers, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserHomeInfo } from "@/lib/definitions";
import { formatDateToSpanish } from "@/lib/utils";

import { Progress } from "@/components/ui/progress";

export default function FirstTimeHome({
  image,
  studentFullName,
  levelCount,
  lecturesCount,
  programName,
  programProficiency,
  currentUserLevel,
  startDate,
}: UserHomeInfo) {
  return (
    <div className="flex h-full flex-col justify-between px-4 pt-8">
      <div>
        <div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={image ? image : undefined}
                alt={studentFullName}
              />
              <AvatarFallback>
                {studentFullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-3xl font-bold text-primary">
                ¡Bienvenido/a, {studentFullName}!
              </div>
              <p className="mt-2 text-xl text-muted-foreground">
                Nos alegra verte en tu dashboard de aprendizaje.
              </p>
            </div>
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="bg-primary/5 mb-6 rounded-lg p-6">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-primary">
              <CalendarIcon className="h-6 w-6" />
              Información importante sobre tu programa
            </h3>
            <p className="text-lg text-muted-foreground">
              Recuerda que la fecha de inicio para las clases de tu programa{" "}
              <span className="font-semibold text-primary">{programName}</span>{" "}
              es:
            </p>
            <p className="mt-2 text-2xl font-bold text-primary">
              {formatDateToSpanish(startDate!)}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-primary/5">
              <Progress
                value={(currentUserLevel / levelCount) * 100}
                className="w-full"
              />
              <CardContent className="pt-6">
                <BookOpen className="mb-2 h-8 w-8 text-primary" />
                <h4 className="mb-1 text-lg font-semibold text-primary">
                  Programa
                </h4>
                <p className="text-muted-foreground">{programName}</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <Progress
                value={(currentUserLevel / levelCount) * 100}
                className="w-full"
              />
              <CardContent className="pt-6">
                <Layers className="mb-2 h-8 w-8 text-primary" />
                <h4 className="mb-1 text-lg font-semibold text-primary">
                  Niveles
                </h4>
                <p className="text-muted-foreground">{levelCount}</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <Progress
                value={(currentUserLevel / levelCount) * 100}
                className="w-full"
              />
              <CardContent className="pt-6">
                <Clock className="mb-2 h-8 w-8 text-primary" />
                <h4 className="mb-1 text-lg font-semibold text-primary">
                  Clases totales
                </h4>
                <p className="text-muted-foreground">{lecturesCount}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </div>
      <p className="my-8 text-center text-lg text-muted-foreground">
        Estamos emocionados de acompañarte en tu viaje de aprendizaje.
        ¡Prepárate para una gran experiencia!
      </p>
    </div>
  );
}
