import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { MarketCode, LangCode, MARKETS } from "@/config/i18n";

export default async function RootPage() {
  const cookieStore = await cookies();
  const cookieMarket = cookieStore.get("nova_market")?.value as MarketCode | undefined;
  const cookieLang = cookieStore.get("nova_lang")?.value as LangCode | undefined;

  if (cookieMarket && MARKETS[cookieMarket]) {
    const market = MARKETS[cookieMarket];
    const lang = cookieLang && market.supportedLangs.includes(cookieLang) ? cookieLang : market.defaultLang;
    if (lang === market.defaultLang) {
      redirect(`/${market.routePrefix}`);
    } else {
      redirect(`/${market.routePrefix}/${lang}`);
    }
  }

  redirect("/en");
}
