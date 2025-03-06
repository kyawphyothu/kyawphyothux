import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    metadataBase: new URL("https://kyawphyothu.com"),
    icons: { icon: "/images/profile.png" },
    title: t("title"),
    description: t("description"),
    keywords:
      "software engineer, web developer, frontend developer, full stack developer, React developer, Next.js, TypeScript, JavaScript, mobile app development, UI/UX, responsive design, portfolio",
    authors: [{ name: "Kyaw Phyo Thu" }],
    creator: "Kyaw Phyo Thu",
    publisher: "Kyaw Phyo Thu",
    verification: { google: "trIbAdtvmd9dCZf7adXX4OYJzffWlGGn2rE9NcTCDmc" },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "ja" ? "ja_JP" : "my_MM",
      siteName: "Kyaw Phyo Thu's Portfolio",
      title: t("og.title"),
      description: t("og.description"),
      url: "https://kyawphyothu.com",
      images: [
        {
          url: "/images/profile.png",
          width: 1080,
          height: 1080,
          alt: "Kyaw Phyo Thu",
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale }); // Explicitly pass locale
  const tFooter = await getTranslations({ locale, namespace: "footer" }); // Fetch footer translations
  const currentYear = new Date().getFullYear();
  const copyright = tFooter("copyright", { year: currentYear }); // Prepare copyright string

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen flex flex-col")}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer copyright={copyright} />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-FXBN9P271T" />
    </html>
  );
}