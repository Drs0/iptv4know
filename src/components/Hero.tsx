"use client";

import React from "react";
import { Play, Sparkles } from "lucide-react";
import { useI18n } from "../context/I18nContext";

export const Hero: React.FC = () => {
  const { t, lang } = useI18n();

  // Mandatory Moroccan Darija headline check
  const isDarija = lang === "ar";

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div className="hero-content">
            <div className="hero-badge-group">
              <div className="glass-badge">
                <Sparkles size={14} className="gradient-text" />
                <span>{t.hero.techBadge}</span>
              </div>
              <div className="glass-badge" style={{ borderColor: "rgba(0, 255, 136, 0.4)", color: "#00ff88" }}>
                <span className="live-dot"></span>
                <span>{t.hero.antiFreezeBadge}</span>
              </div>
            </div>

            <h1 className="hero-title">
              {isDarija ? (
                <span className="gradient-text">{t.hero.title}</span>
              ) : (
                <>
                  Stream <span className="gradient-text">{t.hero.titleHighlight}</span> Live TV Channels in 4K HDR.
                </>
              )}
            </h1>

            <p className="hero-description">
              {t.hero.description}
            </p>

            <div className="hero-cta">
              <a href="#channels" className="glass-button-primary">
                <Play size={18} fill="currentColor" />
                {t.hero.exploreChannels}
              </a>

              <a href="#pricing" className="glass-button-secondary">
                {t.hero.viewPlans}
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value gradient-text">{t.hero.statChannels}</div>
                <div className="stat-label">{t.hero.statChannelsLabel}</div>
              </div>
              <div className="stat-item">
                <div className="stat-value gradient-text-green">{t.hero.statLatency}</div>
                <div className="stat-label">{t.hero.statLatencyLabel}</div>
              </div>
              <div className="stat-item">
                <div className="stat-value gradient-text-pink">{t.hero.statVod}</div>
                <div className="stat-label">{t.hero.statVodLabel}</div>
              </div>
            </div>
          </div>

          {/* Hero Right Interactive Stream Card */}
          <div className="hero-preview-wrapper floating-element">
            <div className="hero-preview-card shimmer-card">
              <div className="preview-header">
                <div className="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="glass-badge" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>
                  <span className="live-dot"></span> {t.hero.liveBroadcast}
                </div>
              </div>

              <div className="preview-screen">
                <div
                  className="preview-backdrop"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80')`,
                  }}
                ></div>

                <div className="stream-overlay">
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>
                      {t.hero.previewShow}
                    </div>
                  </div>

                  <div className="glass-badge" style={{ background: "rgba(0,0,0,0.7)", color: "#00ff88" }}>
                    {t.hero.streamQuality}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
