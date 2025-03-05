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
      '/_*',
      '/[locale]/admin/*'
    ],
    // Add alternateRefs for language versions
    alternateRefs: [
      {
        href: 'https://kyawphyothu.com/en',
        hreflang: 'en'
      },
      {
        href: 'https://kyawphyothu.com/ja',
        hreflang: 'ja'
      },
      {
        href: 'https://kyawphyothu.com/my',
        hreflang: 'my'
      }
    ],
    transform: async (config, path) => {
      // Special handling for project pages
      if (path.includes('/projects/')) {
        return {
          loc: path,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
          alternateRefs: config.alternateRefs ?? []
        }
      }
      
      // Prioritize main pages
      if (path === '/' || path === '/about' || path === '/contact' || 
          path.startsWith('/en/') || path.startsWith('/ja/') || path.startsWith('/my/')) {
        return {
          loc: path,
          changefreq: 'monthly',
          priority: 0.9,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
          alternateRefs: config.alternateRefs ?? []
        }
      }
      
      // Default transformation
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? []
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
      additionalSitemaps: []
    }
  }