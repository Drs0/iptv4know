"use client";

import React from "react";
import { Sparkles, Tv, Flame, Star, ShieldCheck } from "lucide-react";

interface FamousChannel {
  id: string;
  name: string;
  category: string;
  resolution: string;
  badgeBg: string;
  initials: string;
}

const FAMOUS_CHANNELS: FamousChannel[] = [
  {
    id: "natgeo",
    name: "National Geographic",
    category: "Documentary",
    resolution: "4K Ultra HD",
    badgeBg: "linear-gradient(135deg, #ffcc00 0%, #ff9900 100%)",
    initials: "NG",
  },
  {
    id: "hbo",
    name: "HBO HD",
    category: "Movies & Series",
    resolution: "4K HDR",
    badgeBg: "linear-gradient(135deg, #7000ff 0%, #4a00e0 100%)",
    initials: "HBO",
  },
  {
    id: "sky-sports",
    name: "Sky Sports 4K",
    category: "Live Sports",
    resolution: "60 FPS 4K",
    badgeBg: "linear-gradient(135deg, #0052cc 0%, #ff0055 100%)",
    initials: "SKY",
  },
  {
    id: "bbc",
    name: "BBC World",
    category: "News & Docs",
    resolution: "1080p 60fps",
    badgeBg: "linear-gradient(135deg, #bb0000 0%, #880000 100%)",
    initials: "BBC",
  },
  {
    id: "espn",
    name: "ESPN Ultra",
    category: "Live Sports",
    resolution: "4K Ultra",
    badgeBg: "linear-gradient(135deg, #d50000 0%, #990000 100%)",
    initials: "ESPN",
  },
  {
    id: "discovery",
    name: "Discovery HD",
    category: "Science & Nature",
    resolution: "4K HDR",
    badgeBg: "linear-gradient(135deg, #00a8ff 0%, #0059ff 100%)",
    initials: "DISC",
  },
  {
    id: "cnn",
    name: "CNN International",
    category: "Global News",
    resolution: "1080p HD",
    badgeBg: "linear-gradient(135deg, #cc0000 0%, #660000 100%)",
    initials: "CNN",
  },
  {
    id: "canal",
    name: "Canal+ Cinema",
    category: "Blockbusters",
    resolution: "4K Atmos",
    badgeBg: "linear-gradient(135deg, #ffaa00 0%, #cc6600 100%)",
    initials: "C+",
  },
  {
    id: "eurosport",
    name: "Eurosport 4K",
    category: "Global Sports",
    resolution: "4K 60FPS",
    badgeBg: "linear-gradient(135deg, #003399 0%, #001a4d 100%)",
    initials: "EURO",
  },
  {
    id: "mtv",
    name: "MTV Live Neon",
    category: "Music & Shows",
    resolution: "1080p HD",
    badgeBg: "linear-gradient(135deg, #ff007a 0%, #99004d 100%)",
    initials: "MTV",
  }
];

export const ChannelSlider: React.FC = () => {
  // Duplicate array to enable seamless infinite continuous marquee scrolling
  const duplicatedChannels = [...FAMOUS_CHANNELS, ...FAMOUS_CHANNELS];

  return (
    <section className="famous-channels-section">
      <div className="container" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="glass-badge" style={{ marginBottom: "0.5rem" }}>
              <Flame size={14} className="gradient-text-pink" />
              <span>Broadcast Network Partners</span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff" }}>
              Watch World-Famous <span className="gradient-text">TV Networks</span>
            </h2>
          </div>

          <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="live-dot"></span>
            <span>All Channels Transmitted in Original 4K Bitrate</span>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Slider */}
      <div className="slider-wrapper">
        <div className="slider-track">
          {duplicatedChannels.map((channel, index) => (
            <div key={`${channel.id}-${index}`} className="famous-card">
              <div
                className="channel-logo-badge"
                style={{ background: channel.badgeBg }}
              >
                {channel.initials}
              </div>

              <div className="channel-info">
                <span className="name">{channel.name}</span>
                <div className="meta">
                  <span className="quality-tag">{channel.resolution}</span>
                  <span>• {channel.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
