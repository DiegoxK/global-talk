// src/app/academy/teacher/newsletter/page.tsx
"use client";

import { Separator } from "@/components/ui/separator";
import { SubscribersList } from "./components/subscribers-list";
import { EmailTemplateSelector } from "./components/email-template-selector";
import { SendEmailButton } from "./components/send-email-button";
import { useState } from "react";

export default function NewsletterPage() {
  const [htmlContent, setHtmlContent] = useState("");

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold text-primary">Gestión de Newsletter</h1>
      <Separator />
      <div className="mt-4 space-y-6">
        {/* Lista de suscriptores */}
        <SubscribersList />

        {/* Cargar plantilla HTML */}
        <EmailTemplateSelector onTemplateLoad={setHtmlContent} />

        {/* Botón para enviar correos masivos */}
        <SendEmailButton htmlContent={htmlContent} />
      </div>
    </div>
  );
}