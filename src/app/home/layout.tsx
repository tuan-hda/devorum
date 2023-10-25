import { Header, HorizontalNav } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="grid grid-cols-12 gap-5 px-10 pt-5 bg-dark-1 h-screen">
        <HorizontalNav />
        {children}
      </div>
    </section>
  );
}
