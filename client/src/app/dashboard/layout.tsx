import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | Product Management",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4 w-full max-w-7xl mx-auto px-4 xl:px-0">
          <Link
            href="/dashboard"
            className="text-lg font-semibold hover:text-muted-foreground transition-colors"
          >
            Product Dashboard
          </Link>
        </div>
      </header>
      <div className="container flex-1 gap-12 w-full max-w-7xl mx-auto px-4 xl:px-0">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
