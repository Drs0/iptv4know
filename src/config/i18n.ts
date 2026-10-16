export type LangCode = 'ar' | 'en' | 'fr' | 'es';
export type MarketCode = 'ma' | 'intl' | 'fr' | 'es';
export type TextDirection = 'ltr' | 'rtl';

export interface LanguageConfig {
  code: LangCode;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: TextDirection;
  localeTag: string;
}

export interface MarketConfig {
  code: MarketCode;
  name: string;
  nativeName: Record<LangCode, string>;
  flag: string;
  currency: 'MAD' | 'USD' | 'EUR';
  currencySymbol: string;
  defaultLang: LangCode;
  supportedLangs: LangCode[];
  routePrefix: string; // The URL segment: 'ma', 'en', 'fr', 'es'
}

export const LANGUAGES: Record<LangCode, LanguageConfig> = {
  ar: {
    code: 'ar',
    label: 'Moroccan Darija',
    nativeLabel: 'الدارجة المغربية',
    flag: '🇲🇦',
    dir: 'rtl',
    localeTag: 'ar-MA',
  },
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    localeTag: 'en-US',
  },
  fr: {
    code: 'fr',
    label: 'French',
    nativeLabel: 'Français',
    flag: '🇫🇷',
    dir: 'ltr',
    localeTag: 'fr-FR',
  },
  es: {
    code: 'es',
    label: 'Spanish',
    nativeLabel: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
    localeTag: 'es-ES',
  },
};

export const MARKETS: Record<MarketCode, MarketConfig> = {
  ma: {
    code: 'ma',
    name: 'Morocco',
    nativeName: {
      ar: 'المغرب',
      en: 'Morocco',
      fr: 'Maroc',
      es: 'Marruecos',
    },
    flag: '🇲🇦',
    currency: 'MAD',
    currencySymbol: 'د.م.',
    defaultLang: 'ar',
    supportedLangs: ['ar', 'fr', 'en'],
    routePrefix: 'ma',
  },
  intl: {
    code: 'intl',
    name: 'International',
    nativeName: {
      ar: 'دولي',
      en: 'International',
      fr: 'International',
      es: 'Internacional',
    },
    flag: '🌐',
    currency: 'USD',
    currencySymbol: '$',
    defaultLang: 'en',
    supportedLangs: ['en', 'fr', 'es', 'ar'],
    routePrefix: 'en',
  },
  fr: {
    code: 'fr',
    name: 'France & Europe',
    nativeName: {
      ar: 'فرنسا وأوروبا',
      en: 'France & Europe',
      fr: 'France & Europe',
      es: 'Francia y Europa',
    },
    flag: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    defaultLang: 'fr',
    supportedLangs: ['fr', 'en', 'ar'],
    routePrefix: 'fr',
  },
  es: {
    code: 'es',
    name: 'Spain & Latin America',
    nativeName: {
      ar: 'إسبانيا وأمريكا اللاتينية',
      en: 'Spain & Latin America',
      fr: 'Espagne & Amérique Latine',
      es: 'España y Latinoamérica',
    },
    flag: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
    defaultLang: 'es',
    supportedLangs: ['es', 'en'],
    routePrefix: 'es',
  },
};

export const ROUTE_PREFIX_TO_MARKET: Record<string, MarketCode> = {
  ma: 'ma',
  en: 'intl',
  fr: 'fr',
  es: 'es',
};

export const MARKET_TO_ROUTE_PREFIX: Record<MarketCode, string> = {
  ma: 'ma',
  intl: 'en',
  fr: 'fr',
  es: 'es',
};

export const SUPPORTED_LANG_CODES: LangCode[] = ['ar', 'en', 'fr', 'es'];
export const SUPPORTED_MARKET_CODES: MarketCode[] = ['ma', 'intl', 'fr', 'es'];
export const VALID_ROUTE_PREFIXES = ['ma', 'en', 'fr', 'es'];

export function isValidRoutePrefix(prefix: string): prefix is 'ma' | 'en' | 'fr' | 'es' {
  return VALID_ROUTE_PREFIXES.includes(prefix);
}

export function isValidLangCode(lang: string): lang is LangCode {
  return SUPPORTED_LANG_CODES.includes(lang as LangCode);
}

export function resolveMarketAndLang(
  marketSegment?: string,
  langSegment?: string
): { market: MarketCode; lang: LangCode; dir: TextDirection } {
  const prefix = marketSegment?.toLowerCase() || 'en';
  const marketCode = ROUTE_PREFIX_TO_MARKET[prefix] || 'intl';
  const market = MARKETS[marketCode];

  let resolvedLang: LangCode = market.defaultLang;

  if (langSegment && isValidLangCode(langSegment.toLowerCase())) {
    const candidateLang = langSegment.toLowerCase() as LangCode;
    if (market.supportedLangs.includes(candidateLang)) {
      resolvedLang = candidateLang;
    }
  }

  const dir = LANGUAGES[resolvedLang]?.dir || 'ltr';

  return {
    market: marketCode,
    lang: resolvedLang,
    dir,
  };
}

export function buildLocalizedPath(market: MarketCode, lang: LangCode): string {
  const prefix = MARKET_TO_ROUTE_PREFIX[market];
  const marketConfig = MARKETS[market];

  if (lang === marketConfig.defaultLang) {
    return `/${prefix}`;
  }
  return `/${prefix}/${lang}`;
}
