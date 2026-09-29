"use client";

import React from "react";
import { Check, MessageCircle, Sparkles, Star, Zap } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: string;
  monthlyEquivalent: string;
  description: string;
  popular?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: "3-months",
    name: "3 Months Pass",
    duration: "3 Months Access",
    price: "29.99",
    monthlyEquivalent: "$9.99 / mo",
    description: "Ideal for short-term access to all 4K sports & TV channels.",
    features: [
      "10,000+ Premium Live Channels",
      "4K Ultra HD & 1080p 60FPS",
      "Full Sports & Movie Package",
      "7-Day EPG Guide & Catchup",
      "Anti-Freeze 5.0 CDN Technology",
      "Works on Smart TV, Phone & Firestick",
    ],
  },
  {
    id: "6-months",
    name: "6 Months VIP",
    duration: "6 Months Access",
    price: "39.99",
    monthlyEquivalent: "$6.66 / mo",
    description: "Our most popular package with 50% extra savings.",
    popular: true,
    features: [
      "10,000+ Premium Live Channels",
      "Uncompressed 4K HDR Stream Quality",
      "60,000+ VOD Movies & Series",
      "Multi-Device Compatibility",
      "Anti-Freeze 5.0 CDN Technology",
      "Instant 60-Second Setup",
      "24/7 Priority Support",
    ],
  },
  {
    id: "12-months",
    name: "12 Months Ultimate",
    duration: "1 Year Full Access",
    price: "49.99",
    monthlyEquivalent: "$4.16 / mo",
    description: "Maximum value pass for full year uninterrupted 4K streaming.",
    features: [
      "10,000+ Premium Live Channels",
      "4K Ultra HD & Dolby Sound",
      "Complete VOD Cinema Library",
      "Multi-Room / Multi-Device Access",
      "Dedicated High-Speed Server Node",
      "Unlimited DVR & 7-Day Catchup",
      "24/7 VIP Customer Support",
    ],
  },
];

export const Pricing: React.FC = () => {
  const getWhatsAppUrl = (planName: string, price: string, duration: string) => {
    const message = `Hello! I would like to subscribe to the IPTVNow "${planName}" offer (${duration} for $${price}). Please send me the payment and setup details.`;
    // Phone number 0666239318 -> Morocco country code +212 666239318
    return `https://wa.me/212666239318?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Unbeatable IPTV Offers</span>
          <h2 className="section-title">
            Choose Your <span className="gradient-text">IPTVNow</span> Plan
          </h2>
          <p className="section-desc">
            No hidden fees. Instant automatic activation on all your devices. Click any plan to order directly on WhatsApp.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? "popular" : ""}`}
            >
              {plan.popular && <div className="popular-badge">Most Popular • Best Value</div>}

              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>

              <div className="plan-price">
                <span className={`amount ${plan.popular ? "gradient-text" : ""}`}>
                  ${plan.price}
                </span>
                <span className="period"> / {plan.duration}</span>
                <div style={{ fontSize: "0.825rem", color: "#00ff88", fontWeight: 700, marginTop: "0.25rem" }}>
                  Only {plan.monthlyEquivalent}
                </div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={18} /> {feature}
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppUrl(plan.name, plan.price, plan.duration)}
                target="_blank"
                rel="noopener noreferrer"
                className={plan.popular ? "glass-button-primary" : "glass-button-secondary"}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <MessageCircle size={18} fill={plan.popular ? "currentColor" : undefined} style={!plan.popular ? { color: "#25D366" } : undefined} />
                Order {plan.name} via WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
