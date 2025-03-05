/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kyawphyothu.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  sitemapSize: 7000,

  // Exclude unwanted paths like sitemap.xml
  exclude: ['/sitemap.xml'],

  additionalPaths: async () => {
    const baseUrl = 'https://kyawphyothu.com';
    const languages = ['en', 'ja', 'my'];
    const pages = ['/', '/about', '/projects', '/contact'];
    const result = [];

    for (const page of pages) {
      for (const lang of languages) {
        const loc = `${baseUrl}/${lang}${page === '/' ? '' : page}`;
        const alternates = languages.map(altLang => ({
          href: `${baseUrl}/${altLang}${page === '/' ? '' : page}`,
          hreflang: altLang,
        }));
        alternates.push({
          href: `${baseUrl}/en${page === '/' ? '' : page}`, // Set 'en' as the default
          hreflang: 'x-default',
        });

        result.push({
          loc: loc,
          lastmod: new Date().toISOString(),
          priority: page === '/' ? 1.0 : 0.8,
          changefreq: 'weekly',
          alternateRefs: alternates,
        });
      }
    }

    return result;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
};