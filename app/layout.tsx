import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ClerkLayout from "./clerkLayout"; // Corrected import statement
// import { UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

// export const metadata: Metadata = {
//   title: "NovaCopy AI",
//   description: "Your personal AI Copywriting Assistant",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* Use ClerkLayout, which is a client component */}
        <ClerkLayout>
          {children}
        </ClerkLayout>
        <Analytics />
      </body>
    </html>
  );
}

// Header component without the toggle button
// export function Header() {
//   return (
//     <header>
//       <UserButton />
//     </header>
//   );
// }
