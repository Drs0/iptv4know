"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ChannelSlider } from "@/components/ChannelSlider";
import { ChannelExplorer } from "@/components/ChannelExplorer";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Famous Channels Infinite Marquee Slider */}
      <ChannelSlider />

      {/* Live Channels Explorer */}
      <ChannelExplorer />

      {/* Subscription Pricing */}
      <Pricing />

      {/* FAQ Accordion */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloat />
    </main>
  );
}
