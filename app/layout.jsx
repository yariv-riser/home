import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { Handjet, Google_Sans } from 'next/font/google';
import CookieBanner from '@/components/CookieBanner/CookieBanner';

import "./globals.css";

const handjet = Handjet({
  subsets: ['hebrew', 'latin'],
  variable: '--font-title',
  display: 'swap'
});

const googleSans = Google_Sans({
  subsets: ['hebrew', 'latin'],
  variable: '--font-base',
  fallback: ['Arial'],
  display: 'swap'
});

export const viewport = {
  themeColor: "#6855FB"
};

export const metadata = {
  title: "סטודיו לבניית אתרים ואפלקציות | רייזר",
  description: "חוויות אינטראקטיביות מרגשות",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="he" dir="rtl" className={`${handjet.variable} ${googleSans.variable}`}>
      <head>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>
      </head>
      <body>
        {children}
        <CookieBanner />
        <GoogleAnalytics gaId="G-ZPCGC4MSXL" />
      </body>
    </html>
  );
}