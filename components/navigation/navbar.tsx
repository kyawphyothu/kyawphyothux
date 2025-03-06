"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

type Route = {
  href: "/about" | "/contact" | "/projects" | "/";
  label: string;
};

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations("navigation");
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  // Better keyboard support - trap focus in mobile menu when open
  React.useEffect(() => {
    if (isOpen) {
      // Set focus to first menu item when menu opens
      const firstItem = mobileMenuRef.current?.querySelector('a');
      if (firstItem) {
        (firstItem as HTMLElement).focus();
      }
      
      // Handle ESC key to close menu
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          menuButtonRef.current?.focus();
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const routes: Route[] = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between">
        <Link 
          href="/" 
          locale={locale} 
          className="font-bold text-xl"
          aria-label="Kyaw Phyo Thu's homepage"
        >
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            KPT
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6" role="navigation" aria-label="Main navigation">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              locale={locale}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-2",
                pathname === route.href || pathname === `/${locale}${route.href}`
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              aria-current={pathname === route.href || pathname === `/${locale}${route.href}` ? "page" : undefined}
            >
              {route.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pl-2" role="group" aria-label="Theme and language controls">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button with accessibility improvements */}
        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          id="mobile-menu"
          ref={mobileMenuRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b"
          role="navigation" 
          aria-label="Mobile navigation"
        >
          <div className="container max-w-6xl mx-auto flex flex-col space-y-4 py-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                locale={locale}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-md",
                  pathname === route.href || pathname === `/${locale}${route.href}`
                    ? "text-foreground bg-accent rounded-md"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
                aria-current={pathname === route.href || pathname === `/${locale}${route.href}` ? "page" : undefined}
              >
                {route.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2 px-2" role="group" aria-label="Theme and language controls">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}