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
      '/500'
    ],
    transform: async (config, path) => {
      // Custom transformation for specific paths
      if (path.includes('/blog/')) {
        // Higher priority for blog posts
        return {
          loc: path,
          changefreq: 'weekly',
          priority: 0.8,
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
        // Add any additional sitemaps here if needed
        // 'https://kyawphyothu.com/server-sitemap.xml',
      ]
    }
  }