import type { Metadata } from "next";
import { Inter,  Calistoga } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ConvexClientProvider } from "./ConvexClientProvider ";
import icon from "public/NovaCopy_8.svg"
import { twMerge } from "tailwind-merge";


const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
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
      <head>
        <link rel="icon" href="/NovaCopy_8.svg" type="image/svg+xml" />
      </head>
        <body className={twMerge('inter.classname, calistoga.classname, font-sans')}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
    </html>
  );
}
