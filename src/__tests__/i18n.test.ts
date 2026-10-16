import assert from 'node:assert/strict';
import {
  resolveMarketAndLang,
  buildLocalizedPath,
  MARKETS,
  LANGUAGES,
} from '../config/i18n';
import {
  PRICING_PLANS,
  formatPrice,
  formatMonthlyEquivalent,
  getWhatsAppSubscribeUrl,
  getWhatsAppFloatUrl,
  WHATSAPP_PHONE_NUMBER,
} from '../config/pricing';
import { REGIONAL_CONTENT } from '../config/regionalContent';
import { getTranslations } from '../translations';
import sitemap from '../app/sitemap';

console.log('\n--- RUNNING NOVA STREAM I18N VERIFICATION SUITE ---\n');

// 1. Verify Market and Language Modeling & Route Aliases
console.log('Test 1: Route resolution & Market/Language separation');
{
  // Route /ma -> Market: Morocco, Default Language: Moroccan Arabic (Darija), Direction: rtl
  const r1 = resolveMarketAndLang('ma');
  assert.equal(r1.market, 'ma');
  assert.equal(r1.lang, 'ar');
  assert.equal(r1.dir, 'rtl');

  // Moroccan customer switches to French -> Route /ma/fr, Market: Morocco, Language: fr, Direction: ltr
  const r2 = resolveMarketAndLang('ma', 'fr');
  assert.equal(r2.market, 'ma');
  assert.equal(r2.lang, 'fr');
  assert.equal(r2.dir, 'ltr');

  // Moroccan customer switches to English -> Route /ma/en, Market: Morocco, Language: en
  const r3 = resolveMarketAndLang('ma', 'en');
  assert.equal(r3.market, 'ma');
  assert.equal(r3.lang, 'en');

  // Route /en -> Market: International, Default Language: English
  const r4 = resolveMarketAndLang('en');
  assert.equal(r4.market, 'intl');
  assert.equal(r4.lang, 'en');
  assert.equal(r4.dir, 'ltr');

  // Route /fr -> Market: France & Europe, Default Language: French
  const r5 = resolveMarketAndLang('fr');
  assert.equal(r5.market, 'fr');
  assert.equal(r5.lang, 'fr');

  // Route /es -> Market: Spain & Latin America, Default Language: Spanish
  const r6 = resolveMarketAndLang('es');
  assert.equal(r6.market, 'es');
  assert.equal(r6.lang, 'es');

  // Unsupported language in market falls back safely to market default
  const r7 = resolveMarketAndLang('es', 'nonexistent');
  assert.equal(r7.market, 'es');
  assert.equal(r7.lang, 'es');

  console.log('✓ Route resolution and language independence passed.');
}

// 2. Canonical Path Builder
console.log('Test 2: Canonical paths');
{
  assert.equal(buildLocalizedPath('ma', 'ar'), '/ma');
  assert.equal(buildLocalizedPath('ma', 'fr'), '/ma/fr');
  assert.equal(buildLocalizedPath('ma', 'en'), '/ma/en');
  assert.equal(buildLocalizedPath('intl', 'en'), '/en');
  assert.equal(buildLocalizedPath('intl', 'fr'), '/en/fr');
  assert.equal(buildLocalizedPath('fr', 'fr'), '/fr');
  assert.equal(buildLocalizedPath('es', 'es'), '/es');
  console.log('✓ Canonical path builder passed.');
}

// 3. Regional Pricing & Currency Architecture
console.log('Test 3: Regional Pricing configuration');
{
  const p3m = PRICING_PLANS.find((p) => p.id === '3-months')!;
  const p6m = PRICING_PLANS.find((p) => p.id === '6-months')!;
  const p12m = PRICING_PLANS.find((p) => p.id === '12-months')!;

  // Moroccan packages verification (MANDATORY REQUIREMENT 6)
  // 3 months = 60 MAD, 6 months = 120 MAD, 12 months = 200 MAD
  assert.equal(p3m.prices.ma.amount, 60);
  assert.equal(p3m.prices.ma.currency, 'MAD');
  assert.equal(p6m.prices.ma.amount, 120);
  assert.equal(p6m.prices.ma.currency, 'MAD');
  assert.equal(p12m.prices.ma.amount, 200);
  assert.equal(p12m.prices.ma.currency, 'MAD');

  // International pricing verification (provisional existing website values)
  assert.equal(p3m.prices.intl.amount, 29.99);
  assert.equal(p3m.prices.intl.currency, 'USD');
  assert.equal(p6m.prices.intl.amount, 39.99);
  assert.equal(p6m.prices.intl.currency, 'USD');
  assert.equal(p12m.prices.intl.amount, 49.99);
  assert.equal(p12m.prices.intl.currency, 'USD');

  // French pricing verification (EUR)
  assert.equal(p3m.prices.fr.amount, 29.99);
  assert.equal(p3m.prices.fr.currency, 'EUR');

  // Spanish pricing verification (EUR)
  assert.equal(p3m.prices.es.amount, 29.99);
  assert.equal(p3m.prices.es.currency, 'EUR');

  console.log('✓ Regional prices match exact specifications.');
}

// 4. Price Formatters
console.log('Test 4: Price Formatters');
{
  assert.equal(formatPrice(60, 'MAD', 'ar'), '60 د.م.');
  assert.equal(formatPrice(60, 'MAD', 'fr'), '60 MAD');
  assert.equal(formatPrice(60, 'MAD', 'en'), '60 MAD');
  assert.equal(formatPrice(29.99, 'USD', 'en'), '$29.99');
  assert.equal(formatPrice(29.99, 'EUR', 'fr'), '29,99 €');
  assert.equal(formatPrice(29.99, 'EUR', 'es'), '29,99 €');

  assert(formatMonthlyEquivalent(20, 'MAD', 'ar').includes('20 د.م.'));
  assert(formatMonthlyEquivalent(9.99, 'USD', 'en').includes('$9.99'));

  console.log('✓ Price formatters passed.');
}

// 5. WhatsApp Integration Helper
console.log('Test 5: WhatsApp URL generation & phone preservation');
{
  assert.equal(WHATSAPP_PHONE_NUMBER, '212666239318');

  // Test Moroccan Arabic WhatsApp URL
  const waAr = getWhatsAppSubscribeUrl({
    planName: 'باقة 3 أشهر',
    durationText: 'اشتراك 3 أشهر',
    amount: 60,
    currency: 'MAD',
    market: 'ma',
    lang: 'ar',
  });
  assert(waAr.startsWith('https://wa.me/212666239318?text='));
  const decodedAr = decodeURIComponent(waAr);
  assert(decodedAr.includes('60 د.م.'));
  assert(decodedAr.includes('باقة 3 أشهر'));
  assert(decodedAr.includes('المغرب'));

  // Test International English WhatsApp URL
  const waEn = getWhatsAppSubscribeUrl({
    planName: '3 Months Pass',
    durationText: '3 Months Access',
    amount: 29.99,
    currency: 'USD',
    market: 'intl',
    lang: 'en',
  });
  const decodedEn = decodeURIComponent(waEn);
  assert(decodedEn.includes('$29.99'));
  assert(decodedEn.includes('International'));

  // Test Floating WhatsApp button
  const floatAr = getWhatsAppFloatUrl('ma', 'ar');
  assert(decodeURIComponent(floatAr).includes('المغرب'));

  console.log('✓ WhatsApp integration helpers passed.');
}

// 6. Mandatory Moroccan Headline & Translations
console.log('Test 6: Mandatory Moroccan Headline & Translations');
{
  const arT = getTranslations('ar');
  // MANDATORY REQUIREMENT 5: The Moroccan hero headline must be: الفرجة فين ما كنتي
  assert.equal(arT.hero.title, 'الفرجة فين ما كنتي');

  const enT = getTranslations('en');
  assert(enT.hero.title.includes('Stream'));

  const frT = getTranslations('fr');
  assert(frT.hero.title.includes('Diffusez'));

  const esT = getTranslations('es');
  assert(esT.hero.title.includes('Disfruta'));

  // Verify FAQ has all 5 questions translated in all 4 languages
  assert.equal(arT.faq.items.length, 5);
  assert.equal(enT.faq.items.length, 5);
  assert.equal(frT.faq.items.length, 5);
  assert.equal(esT.faq.items.length, 5);

  console.log('✓ Mandatory Moroccan Darija headline & translations passed.');
}

// 7. Regional Content & Compliance Flags
console.log('Test 7: Regional Content configuration');
{
  const maContent = REGIONAL_CONTENT.ma;
  assert(maContent.highlightedNetworks.some((ch) => ch.name.includes('Arryadia')));
  assert(maContent.highlightedNetworks.some((ch) => ch.name.includes('2M')));
  assert(maContent.complianceReviewNote.length > 0);

  const frContent = REGIONAL_CONTENT.fr;
  assert(frContent.highlightedNetworks.some((ch) => ch.name.includes('Canal+')));

  const esContent = REGIONAL_CONTENT.es;
  assert(esContent.highlightedNetworks.some((ch) => ch.name.includes('Movistar')));

  console.log('✓ Regional content configuration passed.');
}

// 8. Sitemap Generation
console.log('Test 8: Sitemap generation');
{
  const siteRoutes = sitemap();
  assert(siteRoutes.length >= 8);
  assert(siteRoutes.some((r) => r.url === 'https://iptv4know.webyms.com/ma'));
  assert(siteRoutes.some((r) => r.url === 'https://iptv4know.webyms.com/ma/fr'));
  assert(siteRoutes.some((r) => r.url === 'https://iptv4know.webyms.com/en'));
  assert(siteRoutes.some((r) => r.url === 'https://iptv4know.webyms.com/fr'));
  assert(siteRoutes.some((r) => r.url === 'https://iptv4know.webyms.com/es'));

  // Ensure hreflang alternates are set
  const maEntry = siteRoutes.find((r) => r.url === 'https://iptv4know.webyms.com/ma');
  assert(maEntry?.alternates?.languages?.['ar-MA']);
  assert(maEntry?.alternates?.languages?.['x-default']);

  console.log('✓ Sitemap generation passed.');
}

console.log('\nALL 8 TEST SUITES PASSED FLAWLESSLY!\n');
