import type { Metadata } from "next";
import { Header } from "@/src/components/shared/Header/header";

export const metadata: Metadata = {
  title: "Fintech Aggregator | Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header type="auth" />
      {children}
    </main>
  );
}
