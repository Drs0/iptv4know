"use client";

import React from "react";
import { Tv, ShieldCheck } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { REGIONAL_CONTENT } from "../config/regionalContent";

export const Footer: React.FC = () => {
  const { market, t } = useI18n();
  const regionalConfig = REGIONAL_CONTENT[market];

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
              {t.footer.about}
            </p>

            {regionalConfig?.legalNotice && (
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", maxWidth: "340px", marginTop: "0.75rem", lineHeight: 1.5 }}>
                {regionalConfig.legalNotice}
              </p>
            )}
          </div>

          <div className="footer-col">
            <h4>{t.footer.quickLinks}</h4>
            <ul>
              <li><a href="#channels">{t.nav.channels}</a></li>
              <li><a href="#pricing">{t.nav.pricing}</a></li>
              <li><a href="#faq">{t.nav.faq}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer.supportedApps}</h4>
            <ul>
              <li><a href="#">Tivimate IPTV</a></li>
              <li><a href="#">IPTV Smarters Pro</a></li>
              <li><a href="#">XCIPTV Player</a></li>
              <li><a href="#">GSE Smart IPTV</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer.legalSecurity}</h4>
            <ul>
              <li><a href="#">{t.footer.terms}</a></li>
              <li><a href="#">{t.footer.privacy}</a></li>
              <li><a href="#">{t.footer.refund}</a></li>
              <li><a href="#">{t.footer.uptimeReport}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} IPTVNow. {t.footer.rightsReserved}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#00ff88" }}>
              <ShieldCheck size={16} /> {t.footer.sslEncrypted}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
