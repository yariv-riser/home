import { GoogleAnalytics } from '@next/third-parties/google';

import { Handjet, Google_Sans } from 'next/font/google';

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

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={`${handjet.variable} ${googleSans.variable}`}>
      <body>
        {children}
        <GoogleAnalytics gaId="G-ZPCGC4MSXL" />
      </body>
    </html>
  );
}