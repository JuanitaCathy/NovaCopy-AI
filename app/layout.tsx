import type { Metadata } from "next";
import { Inter,  Calistoga } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script';
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ConvexClientProvider } from "./ConvexClientProvider ";
import { useTranslation } from 'next-i18next'; // Import from next-i18next

const inter = Inter({ subsets: ["latin"] });
const calistoga = Calistoga({ subsets: ["latin"], variable: '--font-serif', weight: ["400"] });

export const metadata: Metadata = {
  title: "NovaCopy AI",
  description: "Your personal AI Copywriting Assistant",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { i18n } = useTranslation(); // Use useTranslation to get the i18n object
  const locale = i18n.language; // Get the current language from the i18n object

    return (
      <html lang={locale}>
      {/* <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>
      </head> */}
      <body className={`${inter.className}`}>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;
