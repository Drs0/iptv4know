import { MetadataRoute } from 'next';
import { MARKETS, SUPPORTED_MARKET_CODES, buildLocalizedPath } from '@/config/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iptv4know.webyms.com';
  const routes: MetadataRoute.Sitemap = [];

  for (const mCode of SUPPORTED_MARKET_CODES) {
    const market = MARKETS[mCode];
    for (const lCode of market.supportedLangs) {
      const path = buildLocalizedPath(mCode, lCode);
      routes.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: path === '/ma' || path === '/en' ? 1.0 : 0.8,
        alternates: {
          languages: {
            'ar-MA': `${baseUrl}/ma`,
            'fr-MA': `${baseUrl}/ma/fr`,
            'en-US': `${baseUrl}/en`,
            'fr-FR': `${baseUrl}/fr`,
            'es-ES': `${baseUrl}/es`,
            'x-default': `${baseUrl}/en`,
          },
        },
      });
    }
  }

  return routes;
}
