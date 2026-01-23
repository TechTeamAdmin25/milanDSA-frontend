import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConditionalLayout } from "@/components/conditional-layout";
import { Footer } from "@/components/footer";

const grotesk = localFont({
  src: [
    { path: "./fonts/Grotesk-Regular.ttf", weight: "400" },
    { path: "./fonts/Grotesk-DemiBold.ttf", weight: "600" },
    { path: "./fonts/Grotesk-Bold.ttf", weight: "700" },
  ],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MILAN 2026 | SRMIST",
  description:
    "National Cultural Festival of SRM Institute of Science and Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={grotesk.variable}>
      <body className="antialiased font-sans">
        <ConditionalLayout />
        {children}
        <Footer />
      </body>
    </html>
  );
}
