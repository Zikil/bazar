import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";


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
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
