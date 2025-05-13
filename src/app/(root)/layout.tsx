import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className="h-20" />
      <div className="h-20 " /> {/* Used as a space between FIXED header and rest of layout */}
      <main className="">
        {children}
      </main>
      <Footer />
    </>
  );
}
