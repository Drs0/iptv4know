"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export const WhatsAppFloat: React.FC = () => {
  const message = "Hello! I am interested in IPTVNow and would like more information about your subscription offers, available channel lists, and free trial options.";
  const whatsappUrl = `https://wa.me/212666239318?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-float-container">
      <div className="whatsapp-tooltip">
        <span className="live-dot" style={{ backgroundColor: "#25D366" }}></span> Need Help? Chat on WhatsApp
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        title="Request Info on WhatsApp"
        aria-label="Request Info on WhatsApp"
      >
        <MessageCircle size={30} fill="currentColor" />
      </a>
    </div>
  );
};
