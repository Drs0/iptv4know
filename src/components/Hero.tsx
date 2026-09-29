"use client";

import React from "react";
import { Play, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div className="hero-content">
            <div className="hero-badge-group">
              <div className="glass-badge">
                <Sparkles size={14} className="gradient-text" />
                <span>Next-Gen Streaming Technology</span>
              </div>
              <div className="glass-badge" style={{ borderColor: "rgba(0, 255, 136, 0.4)", color: "#00ff88" }}>
                <span className="live-dot"></span>
                <span>Anti-Freeze 5.0 Active</span>
              </div>
            </div>

            <h1 className="hero-title">
              Stream <span className="gradient-text">10,000+ Premium</span> Live TV Channels in 4K HDR.
            </h1>

            <p className="hero-description">
              Experience zero-buffer live sports, blockbuster movies, breaking news, and international television networks directly on your Smart TV, Mobile, Firestick, or Browser.
            </p>

            <div className="hero-cta">
              <a href="#channels" className="glass-button-primary">
                <Play size={18} fill="currentColor" />
                Explore Channels
              </a>

              <a href="#pricing" className="glass-button-secondary">
                View Subscription Plans
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value gradient-text">10,000+</div>
                <div className="stat-label">Live Channels</div>
              </div>
              <div className="stat-item">
                <div className="stat-value gradient-text-green">0.02s</div>
                <div className="stat-label">Channel Switch Latency</div>
              </div>
              <div className="stat-item">
                <div className="stat-value gradient-text-pink">60,000+</div>
                <div className="stat-label">VOD Movies & Series</div>
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
                  <span className="live-dot"></span> LIVE BROADCAST
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
                      UEFA Champions League Finals 4K
                    </div>
                  </div>

                  <div className="glass-badge" style={{ background: "rgba(0,0,0,0.7)", color: "#00ff88" }}>
                    60 FPS 4K HDR
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
