"use client";

import React from "react";
import { Tv, Sparkles, ShieldCheck } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="navbar glass-nav">
      <div className="container nav-inner">
        {/* Brand Logo */}
        <a href="#" className="brand-logo">
          <div className="logo-icon">
            <Tv size={22} />
          </div>
          <span>
            IPTV<span className="gradient-text">NOW</span>
          </span>
        </a>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="#channels">Channels</a></li>
          <li><a href="#pricing">Pricing Plans</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>

        {/* Actions & Status */}
        <div className="nav-actions">
          <a
            href="#pricing"
            className="glass-button-primary"
            style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem" }}
          >
            Explore Plans
          </a>
        </div>
      </div>
    </header>
  );
};
