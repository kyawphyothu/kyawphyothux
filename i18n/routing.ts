import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja', 'my'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      // ja: '/自己紹介',
      ja: "/about",
      my: '/about'
    },
    '/projects': {
      en: '/projects',
      // ja: '/プロジェクト',
      ja: "/projects",
      my: '/projects'
    },
    '/contact': {
      en: '/contact',
      // ja: '/お問い合わせ',
      ja: "/contact",
      my: '/contact'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
