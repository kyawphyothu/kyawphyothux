"use client"

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { startTransition, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Locale, routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  // const [isChangingLocale, setIsChangingLocale] = useState(false);
  
  const switchLocale = (newLocale: string) => {
    const nextLocale = newLocale as Locale;
    
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params: {} },
        { locale: nextLocale }
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-9 h-9 rounded-full"
          aria-label="Switch language"
        >
          <Globe className={`h-5 w-5`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((localeOption) => (
          <DropdownMenuItem 
            key={localeOption}
            onClick={() => switchLocale(localeOption)}
            className={currentLocale === localeOption ? 'font-bold bg-accent' : ''}
          >
            {localeOption === 'en' ? 'English' : '日本語'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}