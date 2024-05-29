import "@/styles/globals.css";
import { Outfit } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import Header from "@/components/header";

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
    <html lang="es" className={`${outfit.className}`}>
      <body>
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
