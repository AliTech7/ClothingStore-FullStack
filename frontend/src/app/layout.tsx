import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout";

export const metadata: Metadata = {
  title: "Clothing Store",
  description: "Test Assignment - Full Stack Clothing App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
