import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner-black-friday";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Banner />
      <Header />
      <main className="[&_section]:container md:[&_section]:px-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
