import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="[&_section]:container md:[&_section]:px-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
