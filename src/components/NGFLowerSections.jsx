"use client";

import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const GEO_ZONES = [
  { name: "North West", states: ["Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Jigawa", "Zamfara"], share: 22, color: "#1D9E75" },
  { name: "South West", states: ["Lagos", "Ogun", "Oyo", "Osun", "Ondo", "Ekiti"], share: 19, color: "#378ADD" },
  { name: "North Central", states: ["Kogi", "Kwara", "Niger", "Benue", "Plateau", "Nassarawa"], share: 15, color: "#BA7517" },
  { name: "South South", states: ["Rivers", "Delta", "Bayelsa", "Edo", "Cross River", "Akwa Ibom"], share: 18, color: "#D4537E" },
  { name: "South East", states: ["Anambra", "Enugu", "Imo", "Abia", "Ebonyi"], share: 12, color: "#7F77DD" },
  { name: "North East", states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"], share: 14, color: "#D85A30" },
];

const STATES_DATA = [
  { name: "Lagos", budget: 2847, pct: 12.1 },
  { name: "Rivers", budget: 1923, pct: 8.2 },
  { name: "Delta", budget: 1456, pct: 6.2 },
  { name: "Kano", budget: 1234, pct: 5.2 },
  { name: "Ogun", budget: 987, pct: 4.2 },
  { name: "Kaduna", budget: 876, pct: 3.7 },
  { name: "Akwa Ibom", budget: 812, pct: 3.5 },
  { name: "Oyo", budget: 756, pct: 3.2 },
  { name: "Cross River", budget: 698, pct: 3.0 },
  { name: "Anambra", budget: 645, pct: 2.7 },
  { name: "Edo", budget: 612, pct: 2.6 },
  { name: "Enugu", budget: 589, pct: 2.5 },
  { name: "Others", budget: 7465, pct: 42.9 },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function ZoneDonut({ zones }) {
  // simple SVG donut
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const R = 85;
  const r = 52;
  const [hovered, setHovered] = useState(null);

  let cum = 0;
  const slices = zones.map((z) => {
    const start = cum;
    cum += z.share;
    return { ...z, start, end: cum };
  });

  function polar(pct, radius) {
    const angle = (pct / 100) * 2 * Math.PI - Math.PI / 2;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  }

  function arc(start, end, radius) {
    const [sx, sy] = polar(start, radius);
    const [ex, ey] = polar(end, radius);
    const large = end - start > 50 ? 1 : 0;
    return `M ${sx} ${sy} A ${radius} ${radius} 0 ${large} 1 ${ex} ${ey}`;
  }

  function slicePath(s) {
    const [osx, osy] = polar(s.start, R);
    const [oex, oey] = polar(s.end, R);
    const [isx, isy] = polar(s.end, r);
    const [iex, iey] = polar(s.start, r);
    const large = s.end - s.start > 50 ? 1 : 0;
    return `M ${osx} ${osy} A ${R} ${R} 0 ${large} 1 ${oex} ${oey} L ${isx} ${isy} A ${r} ${r} 0 ${large} 0 ${iex} ${iey} Z`;
  }

  const hov = hovered !== null ? slices[hovered] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <path
            key={s.name}
            d={slicePath(s)}
            fill={s.color}
            opacity={hovered === null || hovered === i ? 1 : 0.4}
            style={{ cursor: "pointer", transition: "opacity .15s" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        <circle cx={cx} cy={cy} r={r - 2} fill="white" />
        {hov ? (
          <>
            <text x={cx} y={cy - 10} textAnchor="middle" fontSize="18" fontWeight="600" fill={hov.color}>{hov.share}%</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#555" fontFamily="sans-serif">{hov.name}</text>
          </>
        ) : (
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="12" fill="#888" fontFamily="sans-serif">Hover to explore</text>
        )}
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", justifyContent: "center", maxWidth: 320 }}>
        {zones.map((z) => (
          <span key={z.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#444" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: z.color, flexShrink: 0 }} />
            {z.name}
          </span>
        ))}
      </div>
    </div>
  );
}


// ─── Main Component ────────────────────────────────────────────────────────────

export default function NGFLowerSections() {
  const [budgetTab, setBudgetTab] = useState("original"); // 'original' | 'actual'
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Group Explorer", href: "/group-explorer" },
    { label: "State Explorer", href: "/nigeria-state-budget" },
    { label: "Blog Post", href: "/blog" },
    { label: "Resources", href: "https://ngfrepository.org.ng:8443/handle/123456789/5632" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const SOCIALS = [
    { label: "Facebook", href: "https://www.facebook.com/NGFSecretariat", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
    { label: "Twitter/X", href: "https://twitter.com/NGFSecretariat", icon: "M4 4l16 16M4 20 20 4" },
    { label: "Instagram", href: "https://www.instagram.com/ngfsecretariat/", icon: "M2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7zm10 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-1.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/nigeria-governors-forum/", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCSVqmkD-2gJhCx64EnUcHJQ", icon: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", color: "#1a1a1a", background: "#fff" }}>
      {/* ── Google Font ─────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
      `}</style>

      {/* ══════════════════════════════════════════════
          SECTION 1 – Total Expenditure by Geo Zone
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#f8faf8", padding: "56px 0" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "2px solid #e8e8e8" }}>
            {["original", "actual"].map((tab) => (
              <button
                key={tab}
                onClick={() => setBudgetTab(tab)}
                style={{
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: budgetTab === tab ? "#0f6e56" : "#666",
                  borderBottom: budgetTab === tab ? "2px solid #0f6e56" : "2px solid transparent",
                  marginBottom: -2,
                  transition: "all .15s",
                  letterSpacing: "0.01em",
                  textTransform: "capitalize",
                }}
              >
                {tab === "original" ? "Original Budget" : "Actual"}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#143D2E", marginBottom: 8 }}>
            Share of Total Expenditure by Geopolitical Zone,{" "}
            <span style={{ color: "#1D9E75" }}>{budgetTab === "original" ? "Original Budget" : "Actual"}</span>, 2025
          </h2>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>
            Distribution across Nigeria's six geopolitical zones · All 36 states included
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40, alignItems: "start" }}>
            {/* Donut */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ZoneDonut zones={GEO_ZONES} />
            </div>

            {/* Zone breakdown */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {GEO_ZONES.map((z) => (
                  <div key={z.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: z.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>{z.name}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: z.color }}>{z.share}%</span>
                      </div>
                      <div style={{ height: 6, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${z.share * 4}%`, background: z.color, borderRadius: 3 }} />
                      </div>
                      <p style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{z.states.join(" · ")}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/nigeria-state-budget"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 24,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0f6e56",
                  border: "1.5px solid #1D9E75",
                  borderRadius: 6,
                  padding: "8px 18px",
                  transition: "background .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0faf6")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                See all States
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 – Explore Comparative Data
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#143D2E", color: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32, justifyContent: "space-between" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#5DCAA5", textTransform: "uppercase", marginBottom: 12 }}>
              Group Explorer
            </p>
            <h2 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.25, marginBottom: 16 }}>
              Explore comparative data of states
            </h2>
            <p style={{ fontSize: 15, color: "#a5c9bc", lineHeight: 1.7 }}>
              Users can run selected queries across multiple States and budget performance indicators.
            </p>
          </div>
          <a
            href="/group-explorer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#1D9E75",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "0.01em",
              flexShrink: 0,
              transition: "background .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0f6e56")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1D9E75")}
          >
            Run Comparison
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
        </div>
      </section>


    </div>
  );
}
