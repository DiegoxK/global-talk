import "@/styles/globals.css";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Global Talk Medallo",
  description: "La mejor academia de Inglés",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.className} antialiased`}>
      <body>
        <Toaster />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
