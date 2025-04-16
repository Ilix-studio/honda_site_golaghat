import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/spacing-fixes.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Improve performance by using swap
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Honda Motorcycles - Performance, Reliability, Pure Joy",
  description:
    "Discover our latest lineup of motorcycles designed for performance, reliability, and the pure joy of riding.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#e62020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        {/* Add preconnect for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />

        {/* Add viewport meta tag */}
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        {/* Add social media tags */}
        <meta property='og:title' content='Honda Motorcycles' />
        <meta
          property='og:description'
          content='Discover our latest lineup of motorcycles'
        />
        <meta property='og:image' content='/og-image.jpg' />
        <meta name='twitter:card' content='summary_large_image' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
