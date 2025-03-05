import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] })

// Add this function to generate static paths for all locales
// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export const metadata: Metadata = {
  metadataBase: new URL('https://kyawphyothu.com'),
  title: {
    default: "Kyaw Phyo Thu - Software Engineer & Web Developer",
    template: "%s | Kyaw Phyo Thu",
  },
  description: "Portfolio of Kyaw Phyo Thu, a Software Engineer & Web Developer specializing in modern web technologies.",
  keywords: "software engineer, web developer, frontend developer, full stack developer, React developer, Next.js, TypeScript, JavaScript, mobile app development, UI/UX, responsive design, portfolio, software development, web applications, Node.js, tailwind css, Myanmar developer, international developer, multilingual developer",
  authors: [{name: "Kyaw Phyo Thu"}],
  creator: "Kyaw Phyo Thu",
  publisher: "Kyaw Phyo Thu",
  verification: {
    google: 'trIbAdtvmd9dCZf7adXX4OYJzffWlGGn2rE9NcTCDmc'
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kyaw Phyo Thu's Portfolio",
    title: "Kyaw Phyo Thu | Portfolio",
    description: 'Professional portfolio showcasing my projects and skills in web development',
    url: "https://kyawphyothu.com",
    images: [
      {
        url: "/images/profile.png",
        width: 1080,
        height: 1080,
        alt: "Kyaw Phyo Thu"
      }
    ]
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen flex flex-col")}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-FXBN9P271T" />
    </html>
  )
}