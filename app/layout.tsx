import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import Providers from "./provider";



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
        <Providers>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
          <Toaster richColors position="top-right" />
        </main>
        </Providers>
      </body>
    </html>
  );
}
