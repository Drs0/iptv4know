import { MarketCode } from './i18n';

export interface RegionalChannelHighlight {
  id: string;
  name: string;
  category: string;
  resolution: string;
  badgeBg: string;
  initials: string;
}

export interface RegionalContentConfig {
  market: MarketCode;
  highlightedNetworks: RegionalChannelHighlight[];
  legalNotice: string;
  complianceReviewNote: string;
}

export const REGIONAL_CONTENT: Record<MarketCode, RegionalContentConfig> = {
  ma: {
    market: 'ma',
    highlightedNetworks: [
      { id: 'bein-mena', name: 'beIN Sports MENA 4K', category: 'Sports', resolution: '4K HDR', badgeBg: 'linear-gradient(135deg, #7000ff 0%, #4a00e0 100%)', initials: 'beIN' },
      { id: 'arryadia-tnt', name: 'Arryadia TNT HD', category: 'Moroccan Sports', resolution: '1080p 60fps', badgeBg: 'linear-gradient(135deg, #00c853 0%, #007e33 100%)', initials: 'SNRT' },
      { id: '2m-monde', name: '2M Maroc HD', category: 'General', resolution: '1080p HD', badgeBg: 'linear-gradient(135deg, #ff8800 0%, #ff4444 100%)', initials: '2M' },
      { id: 'canal-plus-fr', name: 'Canal+ Sport France', category: 'Sports', resolution: '4K UHD', badgeBg: 'linear-gradient(135deg, #111 0%, #333 100%)', initials: 'C+' },
      { id: 'sky-sports', name: 'Sky Sports Premier League', category: 'Sports', resolution: '4K HDR', badgeBg: 'linear-gradient(135deg, #0070ba 0%, #1546a0 100%)', initials: 'SKY' },
      { id: 'al-aoula', name: 'Al Aoula Inter HD', category: 'Moroccan TV', resolution: '1080p HD', badgeBg: 'linear-gradient(135deg, #d50000 0%, #8b0000 100%)', initials: 'RTM' },
    ],
    legalNotice: 'خدمة IPTVNow موجهة للاستخدام الترفيهي الشخصي. جودة البث وسرعة القنوات تعتمد على استقرار صبيب الإنترنت لدى الزبون.',
    complianceReviewNote: 'Provisional claims flagged for Moroccan regional review: channel availability subject to internet service provider stability and regional content rights.',
  },
  intl: {
    market: 'intl',
    highlightedNetworks: [
      { id: 'sky-sports', name: 'Sky Sports Main Event', category: 'Sports', resolution: '4K HDR', badgeBg: 'linear-gradient(135deg, #0070ba 0%, #1546a0 100%)', initials: 'SKY' },
      { id: 'hbo-max', name: 'HBO Cyber Cinema', category: 'Cinema', resolution: '4K UHD', badgeBg: 'linear-gradient(135deg, #7000ff 0%, #4a00e0 100%)', initials: 'HBO' },
      { id: 'bbc-world', name: 'BBC World News', category: 'News', resolution: '1080p 60fps', badgeBg: 'linear-gradient(135deg, #cc0000 0%, #8b0000 100%)', initials: 'BBC' },
      { id: 'espn-plus', name: 'ESPN+ Formula 1', category: 'Sports', resolution: '4K 60FPS', badgeBg: 'linear-gradient(135deg, #ff0055 0%, #ff5500 100%)', initials: 'ESPN' },
      { id: 'nat-geo', name: 'National Geographic', category: 'Documentary', resolution: '4K HDR', badgeBg: 'linear-gradient(135deg, #ffcc00 0%, #ff9900 100%)', initials: 'NAT' },
      { id: 'mtv-live', name: 'MTV Neon Hits', category: 'Music', resolution: '1080p HD', badgeBg: 'linear-gradient(135deg, #ff007a 0%, #99004d 100%)', initials: 'MTV' },
    ],
    legalNotice: 'IPTVNow streaming services are designed for compatible internet-connected devices. Stream quality depends on connection speed and device hardware decoder.',
    complianceReviewNote: 'Provisional claims flagged for international compliance review: uptime guarantee and total channel numbers are provisional marketing estimates.',
  },
  fr: {
    market: 'fr',
    highlightedNetworks: [
      { id: 'canal-plus', name: 'Canal+ Grand Écran 4K', category: 'Cinéma & Sport', resolution: '4K UHD', badgeBg: 'linear-gradient(135deg, #111 0%, #333 100%)', initials: 'C+' },
      { id: 'rmc-sport', name: 'RMC Sport 1 UHD', category: 'Sports', resolution: '4K HDR', badgeBg: 'linear-gradient(135deg, #0055ff 0%, #002288 100%)', initials: 'RMC' },
      { id: 'tf1-uhd', name: 'TF1 4K Direct', category: 'Généraliste', resolution: '4K HDR', badgeBg: 'linear-gradient(135deg, #0088ff 0%, #0044aa 100%)', initials: 'TF1' },
      { id: 'bein-fr', name: 'beIN Sports 1 France', category: 'Sports', resolution: '1080p 60fps', badgeBg: 'linear-gradient(135deg, #7000ff 0%, #4a00e0 100%)', initials: 'beIN' },
      { id: 'm6-direct', name: 'M6 Direct HD', category: 'Divertissement', resolution: '1080p HD', badgeBg: 'linear-gradient(135deg, #ff3366 0%, #aa1133 100%)', initials: 'M6' },
      { id: 'eurosport-fr', name: 'Eurosport 1 4K', category: 'Sports', resolution: '4K Ultra', badgeBg: 'linear-gradient(135deg, #0099ff 0%, #0055aa 100%)', initials: 'EURO' },
    ],
    legalNotice: 'Le service IPTVNow est destiné à une utilisation privée. La stabilité et la résolution 4K requièrent un débit internet stable supérieur à 25 Mb/s.',
    complianceReviewNote: 'Provisional claims flagged for French/EU regulatory review: streaming statistics and performance guarantees are subject to local digital service requirements.',
  },
  es: {
    market: 'es',
    highlightedNetworks: [
      { id: 'movistar-laliga', name: 'Movistar+ LaLiga 4K', category: 'Deportes', resolution: '4K HDR', badgeBg: 'linear-gradient(135deg, #0055ff 0%, #001166 100%)', initials: 'M+' },
      { id: 'dazn-es', name: 'DAZN 1 España 60FPS', category: 'Deportes', resolution: '1080p 60fps', badgeBg: 'linear-gradient(135deg, #222 0%, #444 100%)', initials: 'DAZN' },
      { id: 'la1-tve', name: 'La 1 UHD TVE', category: 'General', resolution: '4K HDR', badgeBg: 'linear-gradient(135deg, #0088ff 0%, #0044aa 100%)', initials: 'TVE' },
      { id: 'antena3', name: 'Antena 3 HD', category: 'Entretenimiento', resolution: '1080p HD', badgeBg: 'linear-gradient(135deg, #ff8800 0%, #cc5500 100%)', initials: 'A3' },
      { id: 'eurosport-es', name: 'Eurosport 1 4K', category: 'Deportes', resolution: '4K Ultra', badgeBg: 'linear-gradient(135deg, #0099ff 0%, #0055aa 100%)', initials: 'EURO' },
      { id: 'telecinco', name: 'Telecinco HD', category: 'Variedades', resolution: '1080p HD', badgeBg: 'linear-gradient(135deg, #00bbee 0%, #0066aa 100%)', initials: 'T5' },
    ],
    legalNotice: 'El servicio IPTVNow está pensado para uso personal doméstico. La calidad 4K precisa de una conexión estable de fibra óptica o banda ancha.',
    complianceReviewNote: 'Provisional claims flagged for Spanish/LatAm regulatory review: verify channel lineup terms and network agreements.',
  },
};
