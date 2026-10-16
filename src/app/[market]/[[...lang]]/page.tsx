import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ROUTE_PREFIX_TO_MARKET,
  resolveMarketAndLang,
  MARKETS,
  SUPPORTED_MARKET_CODES,
  buildLocalizedPath,
} from "@/config/i18n";
import { getTranslations } from "@/translations";
import { I18nProvider } from "@/context/I18nContext";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ChannelSlider } from "@/components/ChannelSlider";
import { ChannelExplorer } from "@/components/ChannelExplorer";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

interface LocalizedPageProps {
  params: Promise<{
    market: string;
    lang?: string[];
  }>;
}

export async function generateStaticParams() {
  const paths: Array<{ market: string; lang?: string[] }> = [];

  for (const mCode of SUPPORTED_MARKET_CODES) {
    const market = MARKETS[mCode];
    const prefix = market.routePrefix;

    paths.push({ market: prefix, lang: undefined });

    for (const lCode of market.supportedLangs) {
      if (lCode !== market.defaultLang) {
        paths.push({ market: prefix, lang: [lCode] });
      }
    }
  }

  return paths;
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { market: marketParam, lang: langParamArray } = await params;
  const langParam = langParamArray?.[0];

  const prefix = marketParam.toLowerCase();
  if (!ROUTE_PREFIX_TO_MARKET[prefix]) {
    return {};
  }

  const { market, lang } = resolveMarketAndLang(prefix, langParam);
  const t = getTranslations(lang);
  const canonicalPath = buildLocalizedPath(market, lang);

  return {
    title: t.seo.title,
    description: t.seo.description,
    keywords: t.seo.keywords,
    alternates: {
      canonical: `https://iptv4know.webyms.com${canonicalPath}`,
      languages: {
        'ar-MA': 'https://iptv4know.webyms.com/ma',
        'fr-MA': 'https://iptv4know.webyms.com/ma/fr',
        'en-US': 'https://iptv4know.webyms.com/en',
        'fr-FR': 'https://iptv4know.webyms.com/fr',
        'es-ES': 'https://iptv4know.webyms.com/es',
        'x-default': 'https://iptv4know.webyms.com/en',
      },
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: `https://iptv4know.webyms.com${canonicalPath}`,
      siteName: "IPTVNow",
      locale: lang === 'ar' ? 'ar_MA' : lang === 'fr' ? 'fr_FR' : lang === 'es' ? 'es_ES' : 'en_US',
      type: "website",
    },
  };
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { market: marketParam, lang: langParamArray } = await params;
  const langParam = langParamArray?.[0];

  const prefix = marketParam.toLowerCase();
  if (!ROUTE_PREFIX_TO_MARKET[prefix]) {
    notFound();
  }

  const { market, lang } = resolveMarketAndLang(prefix, langParam);

  return (
    <I18nProvider initialMarket={market} initialLang={lang}>
      <main style={{ minHeight: "100vh", position: "relative" }}>
        <Navbar />
        <Hero />
        <ChannelSlider />
        <ChannelExplorer />
        <Pricing />
        <FAQ />
        <Footer />
        <WhatsAppFloat />
      </main>
    </I18nProvider>
  );
}
