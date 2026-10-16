"use client";

import React, { useState } from "react";
import { Search, Users, Radio } from "lucide-react";
import { useI18n } from "../context/I18nContext";

interface Channel {
  id: string;
  name: string;
  categoryKey: 'sports' | 'movies' | 'news' | 'documentary' | 'music';
  resolution: string;
  currentShow: Record<string, string>;
  viewers: string;
  thumbnail: string;
}

const CHANNELS_DATA: Channel[] = [
  {
    id: "ch-1",
    name: "Sky Sports Main Event 4K",
    categoryKey: "sports",
    resolution: "4K HDR",
    currentShow: {
      en: "Premier League: Arsenal vs Man City",
      ar: "الدوري الإنجليزي: أرسنال ضد مانشستر سيتي",
      fr: "Premier League : Arsenal vs Man City",
      es: "Premier League: Arsenal vs Man City",
    },
    viewers: "142,500",
    thumbnail: "/assets/Sky_sports_main_event_studio.jpg",
  },
  {
    id: "ch-2",
    name: "HBO Cyberpunk Cinema",
    categoryKey: "movies",
    resolution: "4K UHD",
    currentShow: {
      en: "Blade Runner 2049 (Extended Edition)",
      ar: "بليد رانر 2049 (النسخة الكاملة)",
      fr: "Blade Runner 2049 (Version Longue)",
      es: "Blade Runner 2049 (Edición Extendida)",
    },
    viewers: "89,200",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-3",
    name: "BBC World News Live",
    categoryKey: "news",
    resolution: "1080p 60fps",
    currentShow: {
      en: "Global Economic Summit 2026",
      ar: "القمة الاقتصادية العالمية 2026",
      fr: "Sommet Économique Mondial 2026",
      es: "Cumbre Económica Global 2026",
    },
    viewers: "54,100",
    thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-4",
    name: "National Geographic Ultra",
    categoryKey: "documentary",
    resolution: "4K HDR",
    currentShow: {
      en: "Wonders of the Deep Ocean",
      ar: "أسرار أعماق المحيطات",
      fr: "Les Merveilles des Océans",
      es: "Maravillas del Océano Profundo",
    },
    viewers: "38,700",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-5",
    name: "ESPN+ Formula 1 Grand Prix",
    categoryKey: "sports",
    resolution: "4K 60FPS",
    currentShow: {
      en: "Monaco GP - Final Qualifying Round",
      ar: "سباق موناكو للفورمولا 1 - الجولة النهائية",
      fr: "Grand Prix de Monaco - Qualifications",
      es: "Gran Premio de Mónaco - Ronda Final",
    },
    viewers: "210,000",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-6",
    name: "MTV Neon Hits Live",
    categoryKey: "music",
    resolution: "1080p HD",
    currentShow: {
      en: "Electronic Dance Festival 2026",
      ar: "مهرجان الموسيقى الإلكترونية 2026",
      fr: "Festival de Musique Électronique 2026",
      es: "Festival de Danza Electrónica 2026",
    },
    viewers: "45,900",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-7",
    name: "Canal+ Cinema Premiere",
    categoryKey: "movies",
    resolution: "4K HDR",
    currentShow: {
      en: "Dune: Part Two (Dolby Atmos)",
      ar: "كثيب: الجزء الثاني (Dolby Atmos)",
      fr: "Dune : Deuxième Partie (Dolby Atmos)",
      es: "Dune: Parte Dos (Dolby Atmos)",
    },
    viewers: "98,300",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-8",
    name: "Eurosport 1 4K",
    categoryKey: "sports",
    resolution: "4K Ultra",
    currentShow: {
      en: "Grand Slam Tennis Semi-Finals",
      ar: "نصف نهائي بطولة الغراند سلام للتنس",
      fr: "Demi-finales de Tennis du Grand Chelem",
      es: "Semifinales de Tenis de Grand Slam",
    },
    viewers: "115,400",
    thumbnail: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=600&q=80",
  }
];

export const ChannelExplorer: React.FC = () => {
  const { t, lang } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { key: "all", label: t.channelExplorer.categories.all },
    { key: "sports", label: t.channelExplorer.categories.sports },
    { key: "movies", label: t.channelExplorer.categories.movies },
    { key: "news", label: t.channelExplorer.categories.news },
    { key: "documentary", label: t.channelExplorer.categories.documentary },
    { key: "music", label: t.channelExplorer.categories.music },
  ];

  const filteredChannels = CHANNELS_DATA.filter((ch) => {
    const matchesCategory = selectedCategory === "all" || ch.categoryKey === selectedCategory;
    const showTitle = ch.currentShow[lang] || ch.currentShow.en;
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      showTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="channel-explorer" id="channels">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.channelExplorer.tag}</span>
          <h2 className="section-title">
            {t.channelExplorer.title}
          </h2>
          <p className="section-desc">
            {t.channelExplorer.desc}
          </p>
        </div>

        {/* Category Pills & Search */}
        <div className="search-filter-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder={t.channelExplorer.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={t.channelExplorer.searchPlaceholder}
          />
        </div>

        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`category-btn ${selectedCategory === cat.key ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="channels-grid">
          {filteredChannels.map((channel) => {
            const showTitle = channel.currentShow[lang] || channel.currentShow.en;
            return (
              <div key={channel.id} className="channel-card">
                <div className="card-thumbnail">
                  <img src={channel.thumbnail} alt={channel.name} loading="lazy" />
                  <div className="badge-overlay">
                    <span className="glass-badge" style={{ padding: "0.15rem 0.5rem", fontSize: "0.7rem", background: "rgba(0,0,0,0.7)" }}>
                      <span className="live-dot"></span> {t.channelExplorer.liveBadge}
                    </span>
                    <span className="resolution-badge">{channel.resolution}</span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="channel-meta">
                    <span className="channel-name">{channel.name}</span>
                  </div>

                  <div className="current-program">
                    <Radio size={14} className="gradient-text" />
                    <span>{showTitle}</span>
                  </div>

                  <div className="viewers-count">
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Users size={12} /> {channel.viewers} {t.channelExplorer.viewersSuffix}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
