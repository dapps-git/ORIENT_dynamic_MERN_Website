import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orient Energy — Operations & Admin Portal",
  description: "Orient Energy Trading Company administrative portal for catalog and inquiry management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
