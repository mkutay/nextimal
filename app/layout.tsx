import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';

import { ThemeProvider } from '@/components/themeProvider';
import ThemeChanger from '@/components/themeChanger';
import { siteConfig } from '@/config/site';
import '@/app/globals.css';

const inter = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.url}`),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  generator: 'Next.js',
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  openGraph: {
    title: {
      template: `%s | ${siteConfig.name}`,
      default: siteConfig.name,
    },
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_UK',
    type: 'website',
    images: ['images/favicon.png'],
  },
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-foreground bg-background min-h-screen flex flex-col justify-between`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="bottom-4 left-4 h-fit w-fit md:sticky my-4 mx-4">
            <ThemeChanger/>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
