"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";

type SendEmailButtonProps = {
  htmlContent: string;
};

export function SendEmailButton({ htmlContent }: SendEmailButtonProps) {
  const [isSending, setIsSending] = useState(false);
  const [subscribers, setSubscribers] = useState<{ email: string }[]>([]);

  // Fetch subscribers at component mount
  const { data, error } = api.brevo.getSubscribers.useQuery();

  useEffect(() => {
    if (data) {
      setSubscribers(data);
    }
  }, [data]);

  const sendEmailMutation = api.brevo.sendEmail.useMutation();

  const handleSendEmail = async () => {
    if (!htmlContent) {
      alert("Por favor, carga una plantilla HTML antes de enviar correos.");
      return;
    }

    if (!subscribers || subscribers.length === 0) {
      alert("No hay suscriptores registrados.");
      return;
    }

    // Verificar límite de envíos
    if (subscribers.length > 300) {
      alert(
        "El plan gratuito de Brevo solo permite enviar 300 correos por día. Por favor, actualiza tu plan o reduce la lista de suscriptores."
      );
      return;
    }

    setIsSending(true);

    try {
      // Enviar correos en paralelo
      const sendPromises = subscribers.map((subscriber) =>
        sendEmailMutation.mutateAsync({
          to: subscriber.email,
          subject: "Newsletter",
          htmlContent: htmlContent,
        })
      );

      await Promise.all(sendPromises);
      alert("Correos enviados correctamente.");
    } catch (error) {
      alert("Hubo un error al enviar los correos.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Button onClick={handleSendEmail} disabled={isSending}>
      {isSending ? "Enviando..." : "Enviar correos masivos"}
    </Button>
  );
}