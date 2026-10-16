"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  LangCode,
  MarketCode,
  TextDirection,
  LanguageConfig,
  MarketConfig,
  LANGUAGES,
  MARKETS,
  buildLocalizedPath,
} from '../config/i18n';
import { getTranslations, TranslationDictionary } from '../translations';

export interface I18nContextValue {
  market: MarketCode;
  lang: LangCode;
  dir: TextDirection;
  t: TranslationDictionary;
  marketConfig: MarketConfig;
  languageConfig: LanguageConfig;
  changeMarketAndLang: (newMarket: MarketCode, newLang?: LangCode) => void;
  isPending: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

interface I18nProviderProps {
  initialMarket: MarketCode;
  initialLang: LangCode;
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  initialMarket,
  initialLang,
  children,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [market, setMarket] = useState<MarketCode>(initialMarket);
  const [lang, setLang] = useState<LangCode>(initialLang);

  // Synchronize state during render if props changed (React recommended pattern)
  const [prevProps, setPrevProps] = useState({ market: initialMarket, lang: initialLang });
  if (prevProps.market !== initialMarket || prevProps.lang !== initialLang) {
    setPrevProps({ market: initialMarket, lang: initialLang });
    setMarket(initialMarket);
    setLang(initialLang);
  }

  const marketConfig = MARKETS[market] || MARKETS.intl;
  const languageConfig = LANGUAGES[lang] || LANGUAGES.en;
  const dir = languageConfig.dir;
  const t = getTranslations(lang);

  // Sync document lang and dir to DOM
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const changeMarketAndLang = (newMarket: MarketCode, newLang?: LangCode) => {
    const targetMarketConfig = MARKETS[newMarket] || MARKETS.intl;
    let targetLang = newLang;

    if (!targetLang || !targetMarketConfig.supportedLangs.includes(targetLang)) {
      if (targetMarketConfig.supportedLangs.includes(lang)) {
        targetLang = lang;
      } else {
        targetLang = targetMarketConfig.defaultLang;
      }
    }

    setCookie('nova_market', newMarket);
    setCookie('nova_lang', targetLang);

    setMarket(newMarket);
    setLang(targetLang);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = targetLang;
      document.documentElement.dir = LANGUAGES[targetLang].dir;
    }

    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
    const targetPath = `${buildLocalizedPath(newMarket, targetLang)}${currentHash}`;

    startTransition(() => {
      router.push(targetPath);
    });
  };

  return (
    <I18nContext.Provider
      value={{
        market,
        lang,
        dir,
        t,
        marketConfig,
        languageConfig,
        changeMarketAndLang,
        isPending,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
