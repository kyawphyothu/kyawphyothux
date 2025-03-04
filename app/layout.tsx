import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen flex flex-col")}>
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
      </body>
    </html>
  )
}