"use client";

import { useState, useRef, useEffect } from "react";
import budgetService from "../service/budgetService";
import { Loader2 } from "lucide-react";

const formatStateName = (name) => {
  if (!name) return "";
  const lower = name.toLowerCase();
  if (lower === "fct") return "FCT Abuja";
  const titleCase = lower.charAt(0).toUpperCase() + lower.slice(1);
  return titleCase.endsWith("state") ? titleCase : `${titleCase} State`;
};

function DownloadMenu({ chartRef, title, chartTitle, seriesKeys, years }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getSvg = () => chartRef.current?.querySelector("svg") || chartRef.current;
  const trigger = (url, name) => { const a = document.createElement("a"); a.href = url; a.download = name; a.click(); };

  const prepareSvgClone = (el) => {
    const clone = el.cloneNode(true);
    
    // Remove existing source text to avoid duplication
    const originalSource = [...clone.querySelectorAll("text")].find(t => t.textContent.includes("Source:"));
    if (originalSource) originalSource.remove();

    // Add a white background rect
    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("width", "100%");
    bgRect.setAttribute("height", "100%");
    bgRect.setAttribute("fill", "#ffffff");
    clone.insertBefore(bgRect, clone.firstChild);

    // Wrap existing content in a g element and scale it down to 75%
    // Shifting it horizontally by 87.5px and vertically by 80px to center it
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", "translate(87.5, 80) scale(0.75)");
    
    // Move children that are NOT the bgRect into the g element
    const childrenArray = Array.from(clone.childNodes);
    childrenArray.forEach(child => {
      if (child !== bgRect) {
        g.appendChild(child);
      }
    });
    clone.appendChild(g);

    // Resize the viewBox to make room for title and source
    clone.setAttribute("viewBox", "0 0 700 450");

    // Add title text
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", "24");
    titleText.setAttribute("y", "32");
    titleText.setAttribute("font-family", "sans-serif");
    titleText.setAttribute("font-size", "12px");
    titleText.setAttribute("font-weight", "bold");
    titleText.setAttribute("fill", "#111111");
    titleText.textContent = chartTitle;
    clone.appendChild(titleText);

    // Add source text
    const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sourceText.setAttribute("x", "676");
    sourceText.setAttribute("y", "432");
    sourceText.setAttribute("font-family", "sans-serif");
    sourceText.setAttribute("font-size", "10px");
    sourceText.setAttribute("fill", "#999999");
    sourceText.setAttribute("text-anchor", "end");
    sourceText.textContent = "Source: NGF Public Finance Database";
    clone.appendChild(sourceText);

    return clone;
  };

  const downloadSVG = () => {
    const el = getSvg(); if (!el) return;
    const clone = prepareSvgClone(el);
    clone.setAttribute("width", "560");
    clone.setAttribute("height", "360");
    trigger(URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" })), `${title}.svg`);
    setOpen(false);
  };

  const rasterize = (type, quality = 1) => {
    const el = getSvg(); if (!el) return;
    const clone = prepareSvgClone(el);
    
    const targetW = 560, targetH = 360;
    clone.setAttribute("width", targetW.toString());
    clone.setAttribute("height", targetH.toString());

    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml;charset=utf-8" }));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetW * 2;
      canvas.height = targetH * 2;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      trigger(canvas.toDataURL(`image/${type}`, quality), `${title}.${type === "jpeg" ? "jpg" : type}`);
    };
    img.src = url; setOpen(false);
  };

  const downloadCSV = () => {
    const header = ["Year", ...seriesKeys.map(s => s.label)].join(",");
    const rows = years.map((y, i) => [y, ...seriesKeys.map(s => seriesKeys.find(sk => sk.key === s.key).data[i])].join(","));
    trigger(URL.createObjectURL(new Blob([[header, ...rows].join("\n")], { type: "text/csv" })), `${title}.csv`);
    setOpen(false);
  };

  const downloadXLS = () => {
    const header = ["Year", ...seriesKeys.map(s => s.label)].join("\t");
    const rows = years.map((y, i) => [y, ...seriesKeys.map(s => seriesKeys.find(sk => sk.key === s.key).data[i])].join("\t"));
    trigger(URL.createObjectURL(new Blob([[header, ...rows].join("\n")], { type: "application/vnd.ms-excel" })), `${title}.xls`);
    setOpen(false);
  };

  const items = [
    { label: "Download PNG image", action: () => rasterize("png") },
    { label: "Download JPEG image", action: () => rasterize("jpeg", 0.92) },
    { label: "Download SVG vector image", action: downloadSVG, divider: true },
    { label: "Download CSV", action: downloadCSV, divider: true },
    { label: "Download XLS", action: downloadXLS },
  ];

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-7 h-7 flex items-center justify-center rounded text-[#888] hover:bg-[#f0f0f0] transition-colors"
        title="Download / export"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 bg-white border border-[#ddd] rounded-lg shadow-lg min-w-[220px] py-1 text-[13px]">
          {items.map((item) => (
            <div key={item.label}>
              {item.divider && <div className="border-t border-[#eee] my-1" />}
              <button onClick={item.action} className="w-full text-left px-4 py-2 text-[#222] hover:bg-[#f5f5f5] transition-colors">
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Toggle({ mode, onChange }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className={`text-[13px] font-medium transition-colors duration-150 ${mode === "original" ? "text-[#222]" : "text-[#bbb]"}`}>
        Original
      </span>
      <button
        onClick={() => onChange(mode === "original" ? "actual" : "original")}
        aria-label="Toggle budget mode"
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${mode === "actual" ? "bg-[#9ca3af]" : "bg-[#1D9E75]"
          }`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${mode === "actual" ? "translate-x-5" : "translate-x-0"
          }`} />
      </button>
      <span className={`text-[13px] font-medium transition-colors duration-150 ${mode === "actual" ? "text-[#222]" : "text-[#bbb]"}`}>
        Actual
      </span>
    </div>
  );
}

function LineChart({ mode, title, series, years }) {
  const chartRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const w = 700, h = 400, pl = 68, pr = 30, pt = 30, pb = 60;
  const chartW = w - pl - pr, chartH = h - pt - pb;
  
  const allData = series.flatMap(s => s.data);
  const maxDataVal = Math.max(0, ...allData);
  let maxG = maxDataVal / 1e9;
  if (maxG === 0) maxG = 100;
  
  const order = Math.pow(10, Math.floor(Math.log10(maxG)));
  const fraction = maxG / order;
  let niceFraction;
  if (fraction <= 1) niceFraction = 1;
  else if (fraction <= 2) niceFraction = 2;
  else if (fraction <= 5) niceFraction = 5;
  else niceFraction = 10;

  const maxVal = niceFraction * order * 1e9;
  const gridLines = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];
  const n = years.length;

  const px = (i) => pl + (i / (n - 1)) * chartW;
  const py = (v) => pt + chartH - (v / maxVal) * chartH;
  const polyPoints = (vals) => vals.map((v, i) => `${px(i)},${py(v)}`).join(" ");

  const seriesKeys = series.map(s => ({ key: s.key, label: s.label, data: s.data }));

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-bold text-[#111]">
          {title} – {mode === "original" ? "Original" : "Actual"}
        </h3>
        <DownloadMenu
          chartRef={chartRef}
          title={`${title.toLowerCase().replace(/\s+/g, "_")}_${mode}`}
          chartTitle={`${title} – ${mode === "original" ? "Original" : "Actual"}`}
          seriesKeys={seriesKeys}
          years={years}
        />
      </div>

      <div className="border-t border-[#e8e8e8] pt-2" ref={chartRef}>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
          {/* Grid lines */}
          {gridLines.map(v => (
            <g key={v}>
              <line x1={pl} y1={py(v)} x2={w - pr} y2={py(v)} stroke="#e8e8e8" strokeWidth="1" />
              <text x={pl - 7} y={py(v) + 4} textAnchor="end" fontSize="10" fill="#999" fontFamily="sans-serif">
                {v === 0 ? "0" : `${(v / 1e9).toFixed(1).replace(/\.0$/, '')}G`}
              </text>
            </g>
          ))}

          {/* Y label */}
          <text x={13} y={h / 2} textAnchor="middle" fontSize="10" fill="#999" fontFamily="sans-serif" transform={`rotate(-90,13,${h / 2})`}>
            (NGN Billion)
          </text>

          {/* X axis line */}
          <line x1={pl} y1={py(0)} x2={w - pr} y2={py(0)} stroke="#ccc" strokeWidth="1" />

          {/* Lines */}
          {series.map(s => (
            <polyline
              key={s.key}
              points={polyPoints(s.data)}
              fill="none"
              stroke={s.color}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          ))}

          {/* Dots */}
          {series.map(s =>
            s.data.map((v, i) => (
              <circle
                key={`${s.key}-${i}`}
                cx={px(i)} cy={py(v)} r={hovered === i ? 5.5 : 4}
                fill={s.color} stroke="white" strokeWidth="1.5"
                className="cursor-pointer transition-all duration-100"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))
          )}

          {/* Hover crosshair + tooltips */}
          {hovered !== null && (
            <g>
              <line x1={px(hovered)} y1={pt} x2={px(hovered)} y2={py(0)} stroke="#ddd" strokeWidth="1" strokeDasharray="4,3" />
              {series.map((s, si) => {
                const v = s.data[hovered];
                const tipX = px(hovered) + (si === 0 ? -118 : 8);
                return (
                  <g key={s.key}>
                    <rect x={tipX} y={py(v) - 16} width={120} height={24} rx="4" fill="white" stroke="#e0e0e0" strokeWidth="0.8" className="shadow-sm" />
                    <text x={tipX + 60} y={py(v) + 1} textAnchor="middle" fontSize="12" fontWeight="600" fill={s.color} fontFamily="sans-serif">
                      {v.toLocaleString()}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* X axis labels */}
          {years.map((y, i) => (
            <text key={y} x={px(i)} y={py(0) + 18} textAnchor="middle" fontSize="10" fill="#666" fontFamily="sans-serif">{y}</text>
          ))}

          {/* X axis title */}
          <text x={w / 2} y={py(0) + 34} textAnchor="middle" fontSize="10" fill="#999" fontFamily="sans-serif">Years</text>

          {/* Legend */}
          {series.map((s, i) => (
            <g key={s.key}>
              <circle cx={pl + i * 160 + 6} cy={h - 10} r="5" fill={s.color} />
              <text x={pl + i * 160 + 16} y={h - 6} fontSize="11" fill="#555" fontFamily="sans-serif">{s.label}</text>
            </g>
          ))}

          {/* Source */}
          <text x={w - pr} y={h - 2} textAnchor="end" fontSize="12" fill="#bbb" fontFamily="sans-serif">
            Source: NGF Public Finance Database
          </text>
        </svg>
      </div>
    </div>
  );
}

export default function StateLineChartsPage({ slug, profile: initialProfile }) {
  const [modeLeft, setModeLeft] = useState("original");
  const [modeRight, setModeRight] = useState("original");

  const [profile, setProfile] = useState(initialProfile || null);
  const [loading, setLoading] = useState(!initialProfile);

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
      setLoading(false);
      return;
    }
    let isMounted = true;
    async function fetchProfile() {
      try {
        if (!slug) return;
        const res = await budgetService.getStateProfileBySlug(slug);
        if (isMounted && res?.data?.success) {
          setProfile(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch state profile:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProfile();
    return () => { isMounted = false; };
  }, [slug, initialProfile]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[#f8faf8]">
        <Loader2 className="w-10 h-10 text-[#1D9E75] animate-spin mb-4" />
      </div>
    );
  }

  if (!profile) return null;

  const stateName = formatStateName(profile.state?.name);
  const years = profile.timeSeries?.actual?.expenditure ? profile.timeSeries.actual.expenditure.map(v => v.year) : [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

  return (
    <div className="bg-[#f8faf8] px-10 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 mx-auto">

        {/* LEFT chart */}
        <div>
          <div className="flex justify-center mb-4">
            <Toggle mode={modeLeft} onChange={setModeLeft} />
          </div>
          <LineChart
            mode={modeLeft}
            title={`${stateName} Total Revenue & Expenditure`}
            series={[
              { key: "revenue",     label: "Total Revenue",     color: "#1D9E75", data: profile.timeSeries?.actual?.expenditure ? profile.timeSeries[modeLeft].revenue.map(v => v.value) : Array(years.length).fill(0) },
              { key: "expenditure", label: "Total Expenditure",  color: "#E8534A", data: profile.timeSeries?.actual?.expenditure ? profile.timeSeries[modeLeft].expenditure.map(v => v.value) : Array(years.length).fill(0) },
            ]}
            years={years}
          />
        </div>

        {/* RIGHT chart */}
        <div>
          <div className="flex justify-center mb-4">
            <Toggle mode={modeRight} onChange={setModeRight} />
          </div>
          <LineChart
            mode={modeRight}
            title={`${stateName} Total Capital & Recurrent Expenditure`}
            series={[
              { key: "recurrent", label: "Recurrent", color: "#1D9E75", data: profile.timeSeries?.actual?.expenditure ? profile.timeSeries[modeRight].recurrent.map(v => v.value) : Array(years.length).fill(0) },
              { key: "capital",   label: "Capital",   color: "#E8534A", data: profile.timeSeries?.actual?.expenditure ? profile.timeSeries[modeRight].capital.map(v => v.value) : Array(years.length).fill(0) },
            ]}
            years={years}
          />
        </div>

      </div>
    </div>
  );
}