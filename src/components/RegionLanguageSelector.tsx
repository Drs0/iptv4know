"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, X } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import {
  MARKETS,
  LANGUAGES,
  SUPPORTED_MARKET_CODES,
  MarketCode,
  LangCode,
} from '../config/i18n';

export const RegionLanguageSelector: React.FC = () => {
  const { market, lang, t, changeMarketAndLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<MarketCode>(market);
  const [selectedLang, setSelectedLang] = useState<LangCode>(lang);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    if (!isOpen) {
      setSelectedMarket(market);
      setSelectedLang(lang);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleApply = () => {
    changeMarketAndLang(selectedMarket, selectedLang);
    setIsOpen(false);
  };

  const currentMarketConfig = MARKETS[market];
  const currentLangConfig = LANGUAGES[lang];

  // Available languages for the highlighted market
  const targetMarketConfig = MARKETS[selectedMarket];
  const availableLangsForMarket = targetMarketConfig.supportedLangs;

  const handleMarketSelect = (mCode: MarketCode) => {
    setSelectedMarket(mCode);
    const mConfig = MARKETS[mCode];
    if (!mConfig.supportedLangs.includes(selectedLang)) {
      setSelectedLang(mConfig.defaultLang);
    }
  };

  return (
    <div className="region-selector-wrapper" ref={containerRef}>
      <button
        type="button"
        className="region-selector-trigger"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={t.regionSelector.buttonLabel}
        id="region-selector-btn"
      >
        <span className="trigger-flag">{currentMarketConfig.flag}</span>
        <span className="trigger-market">{currentMarketConfig.name}</span>
        <span className="trigger-sep">•</span>
        <span className="trigger-lang">{currentLangConfig.nativeLabel}</span>
        <ChevronDown size={14} className={`trigger-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="region-selector-modal shimmer-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="region-modal-title"
        >
          <div className="modal-header">
            <div className="modal-title-wrap">
              <Globe size={18} className="gradient-text" />
              <h3 id="region-modal-title">{t.regionSelector.modalTitle}</h3>
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label={t.regionSelector.closeBtn}
            >
              <X size={18} />
            </button>
          </div>

          <div className="modal-body">
            {/* Step 1: Market Selection */}
            <div className="selector-group">
              <div className="group-label">
                <span className="label-title">{t.regionSelector.marketSection}</span>
                <span className="label-desc">{t.regionSelector.marketDesc}</span>
              </div>

              <div className="market-options-grid">
                {SUPPORTED_MARKET_CODES.map((mCode) => {
                  const mConfig = MARKETS[mCode];
                  const isSelected = selectedMarket === mCode;
                  return (
                    <button
                      key={mCode}
                      type="button"
                      className={`market-card-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleMarketSelect(mCode)}
                    >
                      <div className="market-card-inner">
                        <span className="market-flag">{mConfig.flag}</span>
                        <div className="market-info">
                          <span className="market-name">{mConfig.name}</span>
                          <span className="market-native">{mConfig.nativeName[selectedLang] || mConfig.name}</span>
                        </div>
                      </div>
                      <div className="market-card-badge">
                        <span className="currency-pill">{mConfig.currency}</span>
                        {isSelected && <Check size={16} className="check-icon" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Language Selection */}
            <div className="selector-group" style={{ marginTop: '1.25rem' }}>
              <div className="group-label">
                <span className="label-title">{t.regionSelector.languageSection}</span>
                <span className="label-desc">{t.regionSelector.languageDesc}</span>
              </div>

              <div className="lang-options-grid">
                {availableLangsForMarket.map((lCode) => {
                  const lConfig = LANGUAGES[lCode];
                  const isSelected = selectedLang === lCode;
                  return (
                    <button
                      key={lCode}
                      type="button"
                      className={`lang-card-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedLang(lCode)}
                    >
                      <div className="lang-info">
                        <span className="lang-native">{lConfig.nativeLabel}</span>
                        <span className="lang-label">{lConfig.label}</span>
                      </div>
                      {isSelected && <Check size={16} className="check-icon" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <div className="current-summary">
              <span className="summary-label">{t.regionSelector.currentSelection}:</span>
              <span className="summary-value">
                {MARKETS[selectedMarket].flag} {MARKETS[selectedMarket].name} ({MARKETS[selectedMarket].currency}) • {LANGUAGES[selectedLang].nativeLabel}
              </span>
            </div>
            <div className="footer-actions">
              <button
                type="button"
                className="glass-button-secondary"
                onClick={() => setIsOpen(false)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                {t.regionSelector.closeBtn}
              </button>
              <button
                type="button"
                className="glass-button-primary"
                onClick={handleApply}
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                {t.regionSelector.saveBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
