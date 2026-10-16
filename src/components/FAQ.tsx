"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "../context/I18nContext";

export const FAQ: React.FC = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.faq.tag}</span>
          <h2 className="section-title">
            {t.faq.title}
          </h2>
          <p className="section-desc">
            {t.faq.desc}
          </p>
        </div>

        <div className="faq-list">
          {t.faq.items.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleAccordion(idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  style={{
                    transform: openIndex === idx ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    color: "#00f0ff",
                  }}
                />
              </button>

              {openIndex === idx && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
