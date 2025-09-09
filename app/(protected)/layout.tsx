import Header from "@/components/layout/header";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-sans h-screen">
      <Header />
      <main className="container max-w-2xl lg:max-w-4xl mx-auto px-3 space-y-8 pt-22 min-w-max">
        {children}
      </main>
    </div>
  );
}
