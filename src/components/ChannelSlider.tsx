"use client";

import React from "react";
import { Flame } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { REGIONAL_CONTENT } from "../config/regionalContent";

export const ChannelSlider: React.FC = () => {
  const { market, t } = useI18n();

  const regionalHighlights = REGIONAL_CONTENT[market]?.highlightedNetworks || REGIONAL_CONTENT.intl.highlightedNetworks;
  // Duplicate array to enable seamless infinite continuous marquee scrolling
  const duplicatedChannels = [...regionalHighlights, ...regionalHighlights];

  return (
    <section className="famous-channels-section">
      <div className="container" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="glass-badge" style={{ marginBottom: "0.5rem" }}>
              <Flame size={14} className="gradient-text-pink" />
              <span>{t.channelSlider.badge}</span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff" }}>
              {t.channelSlider.title}
            </h2>
          </div>

          <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="live-dot"></span>
            <span>{t.channelSlider.bitrateNotice}</span>
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
