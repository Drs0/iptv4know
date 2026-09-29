"use client";

import React, { useState } from "react";
import { Search, Users, Radio } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  category: string;
  resolution: string;
  currentShow: string;
  viewers: string;
  thumbnail: string;
}

const CHANNELS_DATA: Channel[] = [
  {
    id: "ch-1",
    name: "Sky Sports Main Event 4K",
    category: "Sports",
    resolution: "4K HDR",
    currentShow: "Premier League: Arsenal vs Man City",
    viewers: "142,500 Viewers",
    thumbnail: "/assets/Sky_sports_main_event_studio.jpg",
  },
  {
    id: "ch-2",
    name: "HBO Cyberpunk Cinema",
    category: "Movies",
    resolution: "4K UHD",
    currentShow: "Blade Runner 2049 (Extended Edition)",
    viewers: "89,200 Viewers",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-3",
    name: "BBC World News Live",
    category: "News",
    resolution: "1080p 60fps",
    currentShow: "Global Economic Summit 2026",
    viewers: "54,100 Viewers",
    thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-4",
    name: "National Geographic Ultra",
    category: "Documentary",
    resolution: "4K HDR",
    currentShow: "Wonders of the Deep Ocean",
    viewers: "38,700 Viewers",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-5",
    name: "ESPN+ Formula 1 Grand Prix",
    category: "Sports",
    resolution: "4K 60FPS",
    currentShow: "Monaco GP - Final Qualifying Round",
    viewers: "210,000 Viewers",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-6",
    name: "MTV Neon Hits Live",
    category: "Music",
    resolution: "1080p HD",
    currentShow: "Electronic Dance Festival 2026",
    viewers: "45,900 Viewers",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-7",
    name: "Canal+ Cinema Premiere",
    category: "Movies",
    resolution: "4K HDR",
    currentShow: "Dune: Part Two (Dolby Atmos)",
    viewers: "98,300 Viewers",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ch-8",
    name: "Eurosport 1 4K",
    category: "Sports",
    resolution: "4K Ultra",
    currentShow: "Grand Slam Tennis Semi-Finals",
    viewers: "115,400 Viewers",
    thumbnail: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=600&q=80",
  }
];

const CATEGORIES = ["All", "Sports", "Movies", "News", "Documentary", "Music"];

export const ChannelExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChannels = CHANNELS_DATA.filter((ch) => {
    const matchesCategory = selectedCategory === "All" || ch.category === selectedCategory;
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.currentShow.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="channel-explorer" id="channels">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Live Channel Directory</span>
          <h2 className="section-title">
            Explore 10,000+ Live Channels & <span className="gradient-text">4K Streams</span>
          </h2>
          <p className="section-desc">
            Filter channels by category or search your favorite sports team, movie network, or news broadcasting channel.
          </p>
        </div>

        {/* Category Pills & Search */}
        <div className="search-filter-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search channels, sports tournaments, movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="channels-grid">
          {filteredChannels.map((channel) => (
            <div key={channel.id} className="channel-card">
              <div className="card-thumbnail">
                <img src={channel.thumbnail} alt={channel.name} loading="lazy" />
                <div className="badge-overlay">
                  <span className="glass-badge" style={{ padding: "0.15rem 0.5rem", fontSize: "0.7rem", background: "rgba(0,0,0,0.7)" }}>
                    <span className="live-dot"></span> LIVE
                  </span>
                  <span className="resolution-badge">{channel.resolution}</span>
                </div>
              </div>

              <div className="card-body">
                <div className="channel-meta">
                  <span className="channel-name">{channel.name}</span>
                </div>

                <div className="current-program">
                  <Radio size={14} className="gradient-text" />
                  <span>{channel.currentShow}</span>
                </div>

                <div className="viewers-count">
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Users size={12} /> {channel.viewers}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
