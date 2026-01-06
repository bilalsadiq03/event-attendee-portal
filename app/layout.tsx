import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";



export const metadata: Metadata = {
  title: "Event Management Dashboard",
  description: "Manage events and attendees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
