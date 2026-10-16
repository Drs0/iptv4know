"use client";

import React from "react";
import { Tv } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { RegionLanguageSelector } from "./RegionLanguageSelector";

export const Navbar: React.FC = () => {
  const { t } = useI18n();

  return (
    <header className="navbar glass-nav">
      <div className="container nav-inner">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" aria-label="IPTVNow Home">
          <div className="logo-icon">
            <Tv size={22} />
          </div>
          <span>
            IPTV<span className="gradient-text">NOW</span>
          </span>
        </a>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="#channels">{t.nav.channels}</a></li>
          <li><a href="#pricing">{t.nav.pricing}</a></li>
          <li><a href="#faq">{t.nav.faq}</a></li>
        </ul>

        {/* Actions, Region Selector & CTA */}
        <div className="nav-actions">
          <RegionLanguageSelector />

          <a
            href="#pricing"
            className="glass-button-primary"
            style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem" }}
          >
            {t.nav.explorePlans}
          </a>
        </div>
      </div>
    </header>
  );
};
