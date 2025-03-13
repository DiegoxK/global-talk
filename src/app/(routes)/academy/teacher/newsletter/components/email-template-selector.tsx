// src/app/newsletter/components/email-template-selector.tsx
"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type EmailTemplateSelectorProps = {
  onTemplateLoad: (htmlContent: string) => void;
};

export function EmailTemplateSelector({ onTemplateLoad }: EmailTemplateSelectorProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/html") {
        alert("Por favor, carga un archivo HTML válido.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const htmlContent = e.target?.result as string;
        onTemplateLoad(htmlContent); // Pasar el contenido HTML al componente padre
      };
      reader.onerror = () => {
        alert("Error al cargar el archivo. Inténtalo de nuevo.");
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Cargar plantilla HTML</Label>
      <Input type="file" accept=".html" onChange={handleFileUpload} />
    </div>
  );
}