"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Which devices and IPTV apps are supported?",
    answer: "IPTVNow works seamlessly across Smart TVs (Samsung Tizen, LG WebOS, Android TV), Amazon Firestick, Apple TV, iOS & Android smartphones, MAG boxes, Enigma2, and Web browsers. We support all major IPTV players including Tivimate, IPTV Smarters, GSE Smart IPTV, and XCIPTV.",
  },
  {
    question: "How fast is my subscription account activated after payment?",
    answer: "Activation is instantaneous! As soon as your checkout completes, your M3U playlist URL, Xtream Codes API credentials, and setup instructions are immediately delivered to your email and displayed on screen.",
  },
  {
    question: "What internet speed do I need for 4K streaming?",
    answer: "For 1080p Full HD streaming, a minimum speed of 15 Mbps is recommended. For 4K Ultra HD 60FPS streams, we recommend a stable internet connection of 30+ Mbps.",
  },
  {
    question: "What is Anti-Freeze Technology 5.0?",
    answer: "Our proprietary Anti-Freeze algorithm dynamically balances traffic load across multi-region CDN server nodes. If a channel experiences high traffic (such as during major live sports events), your stream is automatically rerouted in under 10ms to a zero-congested node.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer an unconditional 7-day money-back guarantee. If you are not 100% satisfied with stream quality, channel selection, or performance, contact our support team for a full refund.",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Got Questions?</span>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-desc">
            Everything you need to know about setting up IPTVNow on your devices.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="faq-item">
              <button className="faq-question" onClick={() => toggleAccordion(idx)}>
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
