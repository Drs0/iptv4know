export interface TranslationDictionary {
  nav: {
    channels: string;
    pricing: string;
    faq: string;
    explorePlans: string;
    regionSelector: string;
  };
  hero: {
    techBadge: string;
    antiFreezeBadge: string;
    title: string;
    titleHighlight: string;
    description: string;
    exploreChannels: string;
    viewPlans: string;
    statChannels: string;
    statChannelsLabel: string;
    statLatency: string;
    statLatencyLabel: string;
    statVod: string;
    statVodLabel: string;
    liveBroadcast: string;
    previewShow: string;
    streamQuality: string;
  };
  channelSlider: {
    badge: string;
    title: string;
    titleHighlight: string;
    bitrateNotice: string;
  };
  channelExplorer: {
    tag: string;
    title: string;
    titleHighlight: string;
    desc: string;
    searchPlaceholder: string;
    categories: {
      all: string;
      sports: string;
      movies: string;
      news: string;
      documentary: string;
      music: string;
    };
    liveBadge: string;
    viewersSuffix: string;
  };
  pricing: {
    tag: string;
    title: string;
    titleHighlight: string;
    desc: string;
    mostPopular: string;
    orderWhatsApp: string;
    plans: {
      threeMonths: {
        name: string;
        duration: string;
        desc: string;
        features: string[];
      };
      sixMonths: {
        name: string;
        duration: string;
        desc: string;
        features: string[];
      };
      twelveMonths: {
        name: string;
        duration: string;
        desc: string;
        features: string[];
      };
    };
  };
  faq: {
    tag: string;
    title: string;
    titleHighlight: string;
    desc: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  footer: {
    about: string;
    quickLinks: string;
    supportedApps: string;
    legalSecurity: string;
    terms: string;
    privacy: string;
    refund: string;
    uptimeReport: string;
    rightsReserved: string;
    sslEncrypted: string;
  };
  whatsAppFloat: {
    tooltip: string;
    ariaLabel: string;
  };
  regionSelector: {
    buttonLabel: string;
    modalTitle: string;
    marketSection: string;
    marketDesc: string;
    languageSection: string;
    languageDesc: string;
    saveBtn: string;
    closeBtn: string;
    currencyLabel: string;
    currentSelection: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
