import { LangCode } from '../config/i18n';
import { TranslationDictionary } from './types';
import { enTranslations } from './en';
import { arTranslations } from './ar';
import { frTranslations } from './fr';
import { esTranslations } from './es';

export * from './types';

export const TRANSLATIONS: Record<LangCode, TranslationDictionary> = {
  en: enTranslations,
  ar: arTranslations,
  fr: frTranslations,
  es: esTranslations,
};

export function getTranslations(lang: LangCode): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
