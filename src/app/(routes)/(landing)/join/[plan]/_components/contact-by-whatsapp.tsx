"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WhatsApp } from "@/vectors/miscellaneous";

interface ContactByWhatsAppProps {
  programName: string;
  savings: string;
}

export const ContactByWhatsApp = ({
  programName,
  savings,
}: ContactByWhatsAppProps) => {
  const phoneNumber = "+573148680056";
  const message = `Estoy interesado en participar en el programa de inglés ${programName} y me gustaría conocer más sobre el sistema de referidos.`;

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="relative mx-auto w-full max-w-md">
      <div className="ribbon-green">
        Ahorras hasta {savings} mil pesos por persona!
      </div>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-500">
          Matrícula grupal
        </CardTitle>
        <CardDescription>
          Para solicitar una matrícula grupal, envía un mensaje a{" "}
          <span className="font-bold">+57 314 868 0056</span> con el siguiente
          contenido:
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <WhatsApp className="my-4 h-16 w-16 fill-green-500" />
        <p className="mb-6 text-center">
          Estoy interesado en participar en el programa de inglés{" "}
          <strong>{programName}</strong> y me gustaría conocer más sobre el
          sistema de referidos.
        </p>
        <Button
          onClick={handleWhatsAppClick}
          className="text-green-500-foreground inline-flex items-center rounded-sm bg-green-500 text-white hover:bg-background hover:fill-green-500 hover:text-green-500 hover:outline hover:outline-1 hover:outline-green-500"
        >
          <WhatsApp className="mr-2 h-5 w-5 fill-white hover:fill-green-500" />
          <span>
            Envíame un mensaje a{" "}
            <span className="font-bold">+57 314 868 0056</span>
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};
