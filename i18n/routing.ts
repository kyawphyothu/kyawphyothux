import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      ja: '/自己紹介'
    },
    '/projects': {
      en: '/projects',
      ja: '/プロジェクト'
    },
    '/contact': {
      en: '/contact',
      ja: '/お問い合わせ'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
