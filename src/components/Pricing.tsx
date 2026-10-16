"use client";

import React from "react";
import { Check, MessageCircle } from "lucide-react";
import { useI18n } from "../context/I18nContext";
import {
  PRICING_PLANS,
  formatPrice,
  formatMonthlyEquivalent,
  getWhatsAppSubscribeUrl,
} from "../config/pricing";

export const Pricing: React.FC = () => {
  const { market, lang, t } = useI18n();

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.pricing.tag}</span>
          <h2 className="section-title">
            {t.pricing.title}
          </h2>
          <p className="section-desc">
            {t.pricing.desc}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => {
            const price = plan.prices[market] || plan.prices.intl;
            const planKey = plan.id === '3-months'
              ? 'threeMonths'
              : plan.id === '6-months'
              ? 'sixMonths'
              : 'twelveMonths';

            const localizedPlan = t.pricing.plans[planKey];
            const formattedTotal = formatPrice(price.amount, price.currency, lang);
            const monthlyText = formatMonthlyEquivalent(price.monthlyAmount, price.currency, lang);

            const whatsappUrl = getWhatsAppSubscribeUrl({
              planName: localizedPlan.name,
              durationText: localizedPlan.duration,
              amount: price.amount,
              currency: price.currency,
              market,
              lang,
            });

            return (
              <div
                key={plan.id}
                className={`plan-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    {t.pricing.mostPopular}
                  </div>
                )}

                <h3 className="plan-name">{localizedPlan.name}</h3>
                <p className="plan-desc">{localizedPlan.desc}</p>

                <div className="plan-price">
                  <span className={`amount ${plan.popular ? "gradient-text" : ""}`}>
                    {formattedTotal}
                  </span>
                  <span className="period"> / {localizedPlan.duration}</span>
                  <div style={{ fontSize: "0.825rem", color: "#00ff88", fontWeight: 700, marginTop: "0.25rem" }}>
                    {monthlyText}
                  </div>
                </div>

                <ul className="plan-features">
                  {localizedPlan.features.map((feature, i) => (
                    <li key={i}>
                      <Check size={18} /> {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.popular ? "glass-button-primary" : "glass-button-secondary"}
                  style={{ width: "100%", justifyContent: "center" }}
                  id={`btn-order-${plan.id}`}
                >
                  <MessageCircle size={18} fill={plan.popular ? "currentColor" : undefined} style={!plan.popular ? { color: "#25D366" } : undefined} />
                  {t.pricing.orderWhatsApp.replace("{plan}", localizedPlan.name)}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
