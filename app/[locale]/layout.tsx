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

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://kyawphyothu.com'),
  title: "Kyaw Phyo Thu - Software Engineer & Web Developer",
  description: "Portfolio of Kyaw Phyo Thu, a Software Engineer & Web Developer specializing in modern web technologies.",
  openGraph: {
    title: "Kyaw Phyo Thu's Portfolio",
    description: "Explore the professional work and projects of Kyaw Phyo Thu.",
    url: "https://kyawphyothu.com",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/profile.png",
        width: 1080,
        height: 1080,
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
    </html>
  )
}