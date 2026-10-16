import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  MARKETS,
  ROUTE_PREFIX_TO_MARKET,
  resolveMarketAndLang,
  buildLocalizedPath,
  MarketCode,
  LangCode,
} from './config/i18n';

const MOROCCO_COUNTRIES = ['MA'];
const FRENCH_COUNTRIES = ['FR', 'BE', 'CH', 'SN', 'CI', 'DZ', 'TN', 'MC', 'LU', 'MG', 'CM', 'ML', 'NE'];
const SPANISH_COUNTRIES = ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR'];

function detectGeoMarket(country: string | null): MarketCode | null {
  if (!country) return null;
  const upper = country.toUpperCase();
  if (MOROCCO_COUNTRIES.includes(upper)) return 'ma';
  if (FRENCH_COUNTRIES.includes(upper)) return 'fr';
  if (SPANISH_COUNTRIES.includes(upper)) return 'es';
  return null;
}

function detectAcceptLanguage(acceptLangHeader: string | null): LangCode | null {
  if (!acceptLangHeader) return null;
  const languages = acceptLangHeader.toLowerCase();
  if (languages.startsWith('ar') || languages.includes(',ar')) return 'ar';
  if (languages.startsWith('fr') || languages.includes(',fr')) return 'fr';
  if (languages.startsWith('es') || languages.includes(',es')) return 'es';
  if (languages.startsWith('en') || languages.includes(',en')) return 'en';
  return null;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const countryHeader =
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    req.headers.get('x-country-code') ||
    req.headers.get('geo-country') ||
    null;

  const cookieMarket = req.cookies.get('nova_market')?.value as MarketCode | undefined;
  const cookieLang = req.cookies.get('nova_lang')?.value as LangCode | undefined;

  if (pathname === '/') {
    let targetMarket: MarketCode = 'intl';
    let targetLang: LangCode = 'en';

    if (cookieMarket && MARKETS[cookieMarket]) {
      targetMarket = cookieMarket;
      targetLang = cookieLang && MARKETS[cookieMarket].supportedLangs.includes(cookieLang)
        ? cookieLang
        : MARKETS[cookieMarket].defaultLang;
    } else {
      const geoMarket = detectGeoMarket(countryHeader);
      if (geoMarket) {
        targetMarket = geoMarket;
        targetLang = MARKETS[geoMarket].defaultLang;
      } else {
        const browserLang = detectAcceptLanguage(req.headers.get('accept-language'));
        if (browserLang === 'ar') {
          targetMarket = 'ma';
          targetLang = 'ar';
        } else if (browserLang === 'fr') {
          targetMarket = 'fr';
          targetLang = 'fr';
        } else if (browserLang === 'es') {
          targetMarket = 'es';
          targetLang = 'es';
        } else {
          targetMarket = 'intl';
          targetLang = 'en';
        }
      }
    }

    const targetUrl = new URL(buildLocalizedPath(targetMarket, targetLang), req.url);
    const redirectResponse = NextResponse.redirect(targetUrl, 307);

    if (!cookieMarket) {
      redirectResponse.cookies.set('nova_market', targetMarket, { path: '/', maxAge: 31536000, sameSite: 'lax' });
      redirectResponse.cookies.set('nova_lang', targetLang, { path: '/', maxAge: 31536000, sameSite: 'lax' });
    }

    return redirectResponse;
  }

  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  if (firstSegment && ROUTE_PREFIX_TO_MARKET[firstSegment]) {
    const marketCode = ROUTE_PREFIX_TO_MARKET[firstSegment];
    const secondSegment = segments[1]?.toLowerCase();
    const { lang, dir } = resolveMarketAndLang(firstSegment, secondSegment);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-nova-market', marketCode);
    requestHeaders.set('x-nova-lang', lang);
    requestHeaders.set('x-nova-dir', dir);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    if (!cookieMarket || cookieMarket !== marketCode) {
      response.cookies.set('nova_market', marketCode, { path: '/', maxAge: 31536000, sameSite: 'lax' });
    }
    if (!cookieLang || cookieLang !== lang) {
      response.cookies.set('nova_lang', lang, { path: '/', maxAge: 31536000, sameSite: 'lax' });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|sitemap.xml|robots.txt).*)',
  ],
};
