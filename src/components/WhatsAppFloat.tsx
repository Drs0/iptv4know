"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import { getWhatsAppFloatUrl } from "../config/pricing";

export const WhatsAppFloat: React.FC = () => {
  const { market, lang, t } = useI18n();
  const whatsappUrl = getWhatsAppFloatUrl(market, lang);

  return (
    <div className="whatsapp-float-container">
      <div className="whatsapp-tooltip">
        <span className="live-dot" style={{ backgroundColor: "#25D366" }}></span> {t.whatsAppFloat.tooltip}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        title={t.whatsAppFloat.ariaLabel}
        aria-label={t.whatsAppFloat.ariaLabel}
        id="btn-whatsapp-float"
      >
        <MessageCircle size={30} fill="currentColor" />
      </a>
    </div>
  );
};
