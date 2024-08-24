import type { Metadata } from "next";
import { Inter,  Calistoga } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ConvexClientProvider } from "./ConvexClientProvider ";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });
const calistoga = Calistoga({ subsets: ["latin"], variable: '--font-serif', weight: ["400"] });

export const metadata: Metadata = {
  title: "NovaCopy AI",
  description: "Your personal AI Copywriting Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${inter.className}`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
    </html>
  );
}
