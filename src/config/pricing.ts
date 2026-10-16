import { MarketCode, LangCode, MARKETS } from './i18n';

export const WHATSAPP_PHONE_NUMBER = '212666239318';

export interface PlanPrice {
  amount: number;
  currency: 'MAD' | 'USD' | 'EUR';
  monthlyAmount: number;
}

export interface PricingPlanConfig {
  id: '3-months' | '6-months' | '12-months';
  durationMonths: number;
  popular?: boolean;
  prices: Record<MarketCode, PlanPrice>;
}

export const PRICING_PLANS: PricingPlanConfig[] = [
  {
    id: '3-months',
    durationMonths: 3,
    popular: false,
    prices: {
      ma: { amount: 60, currency: 'MAD', monthlyAmount: 20 },
      intl: { amount: 29.99, currency: 'USD', monthlyAmount: 9.99 },
      fr: { amount: 29.99, currency: 'EUR', monthlyAmount: 9.99 },
      es: { amount: 29.99, currency: 'EUR', monthlyAmount: 9.99 },
    },
  },
  {
    id: '6-months',
    durationMonths: 6,
    popular: true,
    prices: {
      ma: { amount: 120, currency: 'MAD', monthlyAmount: 20 },
      intl: { amount: 39.99, currency: 'USD', monthlyAmount: 6.66 },
      fr: { amount: 39.99, currency: 'EUR', monthlyAmount: 6.66 },
      es: { amount: 39.99, currency: 'EUR', monthlyAmount: 6.66 },
    },
  },
  {
    id: '12-months',
    durationMonths: 12,
    popular: false,
    prices: {
      ma: { amount: 200, currency: 'MAD', monthlyAmount: 16.66 },
      intl: { amount: 49.99, currency: 'USD', monthlyAmount: 4.16 },
      fr: { amount: 49.99, currency: 'EUR', monthlyAmount: 4.16 },
      es: { amount: 49.99, currency: 'EUR', monthlyAmount: 4.16 },
    },
  },
];

export function formatPrice(amount: number, currency: 'MAD' | 'USD' | 'EUR', lang: LangCode): string {
  const isWhole = Number.isInteger(amount);
  const formattedNumber = isWhole ? amount.toString() : amount.toFixed(2);

  if (currency === 'MAD') {
    if (lang === 'ar') {
      return `${formattedNumber} د.م.`;
    }
    return `${formattedNumber} MAD`;
  }

  if (currency === 'EUR') {
    if (lang === 'fr' || lang === 'es') {
      return `${formattedNumber.replace('.', ',')} €`;
    }
    return `€${formattedNumber}`;
  }

  if (currency === 'USD') {
    return `$${formattedNumber}`;
  }

  return `${formattedNumber} ${currency}`;
}

export function formatMonthlyEquivalent(monthlyAmount: number, currency: 'MAD' | 'USD' | 'EUR', lang: LangCode): string {
  const formattedPrice = formatPrice(monthlyAmount, currency, lang);
  switch (lang) {
    case 'ar':
      return `فقط ${formattedPrice} / للشهر`;
    case 'fr':
      return `Seulement ${formattedPrice} / mois`;
    case 'es':
      return `Solo ${formattedPrice} / mes`;
    case 'en':
    default:
      return `Only ${formattedPrice} / mo`;
  }
}

export interface WhatsAppSubscribeOptions {
  planName: string;
  durationText: string;
  amount: number;
  currency: 'MAD' | 'USD' | 'EUR';
  market: MarketCode;
  lang: LangCode;
}

export function getWhatsAppSubscribeUrl({
  planName,
  durationText,
  amount,
  currency,
  market,
  lang,
}: WhatsAppSubscribeOptions): string {
  const formattedPrice = formatPrice(amount, currency, lang);
  const regionName = MARKETS[market].name;

  let message = '';
  switch (lang) {
    case 'ar':
      message = `السلام عليكم! باغي نشترك فعرض IPTVNow باقة "${planName}" (${durationText} بـ ${formattedPrice} - سوق: ${MARKETS[market].nativeName.ar}). عفاك صيفط ليا تفاصيل الأداء والتفعيل فالحين.`;
      break;
    case 'fr':
      message = `Bonjour ! Je souhaite m'abonner à l'offre IPTVNow "${planName}" (${durationText} pour ${formattedPrice} - Région: ${regionName}). Merci de m'envoyer les détails de paiement et d'activation.`;
      break;
    case 'es':
      message = `¡Hola! Me gustaría suscribirme a la oferta de IPTVNow "${planName}" (${durationText} por ${formattedPrice} - Región: ${regionName}). Por favor envíenme los detalles de pago y activación.`;
      break;
    case 'en':
    default:
      message = `Hello! I would like to subscribe to the IPTVNow "${planName}" offer (${durationText} for ${formattedPrice} - Region: ${regionName}). Please send me the payment and setup details.`;
      break;
  }

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppFloatUrl(market: MarketCode, lang: LangCode): string {
  const regionName = MARKETS[market].name;

  let message = '';
  switch (lang) {
    case 'ar':
      message = `السلام عليكم! مهتم بخدمة IPTVNow وبغيت معلومات أكثر على باقات الاشتراك، قائمة القنوات المتاحة، وإمكانية تجربة السيرفر. (سوق: ${MARKETS[market].nativeName.ar})`;
      break;
    case 'fr':
      message = `Bonjour ! Je m'intéresse à IPTVNow et je souhaite obtenir plus d'informations sur vos formules d'abonnement, la liste des chaînes et les options d'essai. (Région: ${regionName})`;
      break;
    case 'es':
      message = `¡Hola! Estoy interesado en IPTVNow y me gustaría recibir más información sobre sus planes de suscripción, canales disponibles y prueba gratuita. (Región: ${regionName})`;
      break;
    case 'en':
    default:
      message = `Hello! I am interested in IPTVNow and would like more information about your subscription offers, available channel lists, and free trial options. (Region: ${regionName})`;
      break;
  }

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
