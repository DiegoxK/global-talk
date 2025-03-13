"use client"; // Necesario para usar hooks y manejar estado en Next.js 13+

import { useState } from "react";
import { api } from "@/trpc/react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [error, setError] = useState("");

  // Validar el correo electrónico
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Mutación para suscribir un correo
  const subscribeMutation = api.brevo.subscribe.useMutation({
    onSuccess: () => {
      setError(""); // Limpiar errores
      alert("¡Gracias por suscribirte!"); // Mostrar mensaje de éxito
    },
    onError: (error) => {
      setError(error.message); // Mostrar el error
    },
  });

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!acceptTerms || !acceptPrivacy) {
      setError("Debes aceptar los términos y condiciones y la política de privacidad.");
      return;
    }

    // Llamar a la mutación de tRPC
    subscribeMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20 px-6 sm:px-8 lg:px-10">
      <div className="max-w-2xl w-full space-y-8 bg-white p-12 rounded-lg border-4 border-purple-700 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-purple-700">
            SUSCRÍBETE A <br /> LA NEWSLETTER
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            Recibe novedades sobre la academia, eventos especiales, promociones y mucho más.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-5 w-5 text-purple-700 focus:ring-purple-700 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-lg">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Acepto los Términos y condiciones de uso.
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="h-5 w-5 text-purple-700 focus:ring-purple-700 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-lg">
                <label htmlFor="privacy" className="font-medium text-gray-700">
                  Acepto la Política de privacidad.
                </label>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-lg text-red-600 text-center">
              {error}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={!acceptTerms || !acceptPrivacy || !validateEmail(email)}
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed tracking-widest"
            >
              S U S C R I B I R M E
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}