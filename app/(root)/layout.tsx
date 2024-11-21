import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Bazar",
  description: "Bazar",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
    <Suspense>
      <Header />
    </Suspense>
    {children}
  </main>
  );
}
