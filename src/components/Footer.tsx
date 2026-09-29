"use client";

import React from "react";
import { Tv, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: "1rem" }}>
              <div className="logo-icon">
                <Tv size={22} />
              </div>
              <span style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                IPTV<span className="gradient-text">NOW</span>
              </span>
            </div>

            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", maxWidth: "340px", lineHeight: 1.6 }}>
              The industry benchmark for 4K Ultra HD IPTV streaming, offering over 10,000 live channels and anti-freeze CDN performance.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#channels">Live Channels</a></li>
              <li><a href="#pricing">Pricing Plans</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Supported Apps</h4>
            <ul>
              <li><a href="#">Tivimate IPTV</a></li>
              <li><a href="#">IPTV Smarters Pro</a></li>
              <li><a href="#">XCIPTV Player</a></li>
              <li><a href="#">GSE Smart IPTV</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal & Security</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Server Uptime Report</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} IPTVNow. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#00ff88" }}>
              <ShieldCheck size={16} /> 256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
