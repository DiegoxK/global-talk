/* eslint-disable @next/next/no-img-element */
import "@/styles/globals.css";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { TRPCReactProvider } from "@/trpc/react";
import { MetaPixel } from "@/components/meta/meta-pixel";

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
      <MetaPixel />
      <body>
        <img
          alt=""
          height="1"
          width="1"
          className="hidden"
          src="https://www.facebook.com/tr?id=1757671605066556&ev=PageView&noscript=1"
        />
        <Toaster />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
