/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://kyawphyothu.com',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,
    sitemapBaseFileName: 'sitemap',
    exclude: [
      '/api/*',
      '/admin/*',
      '/404',
      '/500',
      // Exclude any internal paths or paths you don't want indexed
      '/_*',
      '/[locale]/admin/*' // If you have locale-specific admin pages
    ],
    transform: async (config, path) => {
      // Special handling for project pages
      if (path.includes('/projects/')) {
        return {
          loc: path,
          changefreq: 'monthly', // Projects may not change as frequently
          priority: 0.8,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
      }
      
      // Prioritize main pages
      if (path === '/' || path === '/about' || path === '/contact') {
        return {
          loc: path,
          changefreq: 'monthly',
          priority: 0.9,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
      }
      
      // Default transformation
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    },
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/admin/']
        }
      ],
      additionalSitemaps: [
        // If you implement server-side sitemaps later, uncomment and add them here
        // 'https://kyawphyothu.com/server-sitemap.xml',
      ]
    }
  }