"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import budgetService from "../service/budgetService";

function seriesFromApi(timeSeries, mode) {
  const fallback = { years: [], expenditure: [], revenue: [] };
  if (!timeSeries || !timeSeries[mode]) return fallback;

  const sorted = [...timeSeries[mode]].sort((a, b) => a.year - b.year);

  // Filter out years where both expenditure and revenue are zero
  const filtered = sorted.filter(item => item.expenditure > 0 || item.revenue > 0);

  const years = filtered.map(item => item.year);
  const expenditure = filtered.map(item => Number((item.expenditure / 1e12).toFixed(2)));
  const revenue = filtered.map(item => Number((item.revenue / 1e12).toFixed(2)));

  return { years, expenditure, revenue };
}

function DownloadMenu({ chartRef, title, chartTitle, years, series }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getSvg = () => chartRef.current?.querySelector("svg") || chartRef.current;
  const trigger = (url, name) => { const a = document.createElement("a"); a.href = url; a.download = name; a.click(); };

  const downloadSVG = () => {
    const el = getSvg(); if (!el) return;
    const clone = el.cloneNode(true);

    // Shift content down by 45px to make room for the title, and add 25px at bottom for source
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", "translate(0, 45)");
    while (clone.firstChild) {
      g.appendChild(clone.firstChild);
    }
    clone.appendChild(g);

    clone.setAttribute("viewBox", "0 0 560 410");
    clone.setAttribute("width", "560");
    clone.setAttribute("height", "410");

    // Add title text
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", "20");
    titleText.setAttribute("y", "28");
    titleText.setAttribute("font-family", "sans-serif");
    titleText.setAttribute("font-size", "14px");
    titleText.setAttribute("font-weight", "bold");
    titleText.setAttribute("fill", "#111111");
    titleText.textContent = chartTitle;
    clone.appendChild(titleText);

    // Add source text
    const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sourceText.setAttribute("x", "540");
    sourceText.setAttribute("y", "398");
    sourceText.setAttribute("font-family", "sans-serif");
    sourceText.setAttribute("font-size", "10px");
    sourceText.setAttribute("fill", "#999999");
    sourceText.setAttribute("text-anchor", "end");
    sourceText.textContent = "Source: NGF PFM";
    clone.appendChild(sourceText);

    trigger(URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml" })), `${title}.svg`);
    setOpen(false);
  };

  const rasterize = (type, quality = 1) => {
    const el = getSvg(); if (!el) return;
    const clone = el.cloneNode(true);

    // Shift content down by 45px to make room for the title, and add 25px at bottom for source
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", "translate(0, 45)");
    while (clone.firstChild) {
      g.appendChild(clone.firstChild);
    }
    clone.appendChild(g);

    clone.setAttribute("viewBox", "0 0 560 410");
    clone.setAttribute("width", "560");
    clone.setAttribute("height", "410");

    // Add title text
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", "20");
    titleText.setAttribute("y", "28");
    titleText.setAttribute("font-family", "sans-serif");
    titleText.setAttribute("font-size", "14px");
    titleText.setAttribute("font-weight", "bold");
    titleText.setAttribute("fill", "#111111");
    titleText.textContent = chartTitle;
    clone.appendChild(titleText);

    // Add source text
    const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sourceText.setAttribute("x", "540");
    sourceText.setAttribute("y", "398");
    sourceText.setAttribute("font-family", "sans-serif");
    sourceText.setAttribute("font-size", "10px");
    sourceText.setAttribute("fill", "#999999");
    sourceText.setAttribute("text-anchor", "end");
    sourceText.textContent = "Source: NGF PFM";
    clone.appendChild(sourceText);

    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: "image/svg+xml;charset=utf-8" }));
    const img = new Image();
    img.onload = () => {
      const w = 560 * 2, h = 410 * 2;
      const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); ctx.scale(2, 2); ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      trigger(canvas.toDataURL(`image/${type}`, quality), `${title}.${type === "jpeg" ? "jpg" : type}`);
    };
    img.src = url; setOpen(false);
  };

  const downloadCSV = () => {
    const headers = ["Year", ...series.map(s => `${s.label} (NGN Trillion)`)].join(",");
    const rows = [
      headers,
      ...years.map((y, i) => {
        const vals = series.map(s => s.vals[i]);
        return [y, ...vals].join(",");
      })
    ];
    trigger(URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" })), `${title}.csv`);
    setOpen(false);
  };

  const downloadXLS = () => {
    const headers = ["Year", ...series.map(s => `${s.label} (NGN Trillion)`)].join("\t");
    const rows = [
      headers,
      ...years.map((y, i) => {
        const vals = series.map(s => s.vals[i]);
        return [y, ...vals].join("\t");
      })
    ];
    trigger(URL.createObjectURL(new Blob([rows.join("\n")], { type: "application/vnd.ms-excel" })), `${title}.xls`);
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
      <button onClick={() => setOpen(v => !v)} className="w-7 h-7 flex items-center justify-center rounded text-[#888] hover:bg-[#f0f0f0] transition-colors" title="Download / export">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 bg-white border border-[#ddd] rounded-lg shadow-lg min-w-[220px] py-1 text-[13px] font-normal">
          {items.map((item) => (
            <div key={item.label}>
              {item.divider && <div className="border-t border-[#eee] my-1" />}
              <button onClick={item.action} className="w-full text-left px-4 py-2 text-[#222] hover:bg-[#f5f5f5] transition-colors">{item.label}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BarChart({ mode, data }) {
  const chartRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const w = 560, h = 340, pl = 58, pr = 20, pt = 20, pb = 50;
  const chartW = w - pl - pr, chartH = h - pt - pb;

  const { maxVal, gridLines } = useMemo(() => {
    const rawMax = Math.max(30, ...data.expenditure);
    const step = rawMax > 30 ? 10 : 5;
    const niceMax = Math.ceil(rawMax / step) * step;
    const grid = [];
    for (let i = 0; i <= niceMax; i += step) {
      grid.push(i);
    }
    return { maxVal: niceMax, gridLines: grid };
  }, [data.expenditure]);

  if (!data.years || data.years.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#e8e8e8] p-5 flex items-center justify-center h-[340px]">
        <span className="text-gray-500">No data available</span>
      </div>
    );
  }

  const n = data.years.length;
  const barW = (chartW / n) * 0.55;
  const gap = chartW / n;

  const bx = (i) => pl + i * gap + gap / 2 - barW / 2;
  const by = (v) => pt + chartH - (v / maxVal) * chartH;
  const bh = (v) => (v / maxVal) * chartH;

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-bold text-[#111]">
          Total Expenditure for the 36 States – <span className="capitalize">{mode === "original" ? "Original" : "Actual"}</span>
        </h3>
        <DownloadMenu
          chartRef={chartRef}
          title={`total_expenditure_${mode}`}
          chartTitle={`Total Expenditure for the 36 States (${mode === "original" ? "Original Budget" : "Actual"})`}
          years={data.years}
          series={[{ label: "Total Expenditure", vals: data.expenditure }]}
        />
      </div>
      <div ref={chartRef}>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
          {gridLines.map(v => (
            <g key={v}>
              <line x1={pl} y1={by(v)} x2={w - pr} y2={by(v)} stroke="#e8e8e8" strokeWidth="1" />
              <text x={pl - 6} y={by(v) + 4} textAnchor="end" fontSize="10" fill="#999" fontFamily="sans-serif">{v > 0 ? `${v}T` : "0"}</text>
            </g>
          ))}
          {data.expenditure.map((v, i) => (
            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
              {v > 0 && (
                <rect x={bx(i)} y={by(v)} width={barW} height={bh(v)} fill={hovered === i ? "#0f6e56" : "#1D9E75"} rx="3" className="transition-colors duration-150" />
              )}
              {hovered === i && v > 0 && (
                <text x={bx(i) + barW / 2} y={by(v) - 5} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1D9E75" fontFamily="sans-serif">{v}T</text>
              )}
              <text x={bx(i) + barW / 2} y={h - pb + 16} textAnchor="middle" fontSize="10" fill="#666" fontFamily="sans-serif">{data.years[i]}</text>
            </g>
          ))}
          {/* Legend */}
          <circle cx={pl + 10} cy={h - 15} r="5" fill="#1D9E75" />
          <text x={pl + 20} y={h - 11} fontSize="11" fill="#555" fontFamily="sans-serif">Total Expenditure</text>
        </svg>
      </div>
    </div>
  );
}

function LineChart({ mode, data }) {
  const chartRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const w = 560, h = 340, pl = 58, pr = 20, pt = 20, pb = 60;
  const chartW = w - pl - pr, chartH = h - pt - pb;

  const { maxVal, gridLines } = useMemo(() => {
    const rawMax = Math.max(30, ...data.expenditure, ...data.revenue);
    const step = rawMax > 30 ? 10 : 5;
    const niceMax = Math.ceil(rawMax / step) * step;
    const grid = [];
    for (let i = step; i <= niceMax; i += step) {
      grid.push(i);
    }
    return { maxVal: niceMax, gridLines: grid };
  }, [data.expenditure, data.revenue]);

  if (!data.years || data.years.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#e8e8e8] p-5 flex items-center justify-center h-[340px]">
        <span className="text-gray-500">No data available</span>
      </div>
    );
  }

  const minVal = 0;
  const range = Math.max(1, maxVal - minVal);
  const n = data.years.length;

  const px = (i) => pl + (n > 1 ? (i / (n - 1)) * chartW : chartW / 2);
  const py = (v) => pt + chartH - ((v - minVal) / range) * chartH;
  const polyline = (vals) => vals.map((v, i) => `${px(i)},${py(v)}`).join(" ");

  const series = [
    { key: "expenditure", label: "Total Expenditure", color: "#E8534A", vals: data.expenditure },
    { key: "revenue", label: "Total Revenue", color: "#1D9E75", vals: data.revenue },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-bold text-[#111]">
          Total Revenue and Expenditure for the 36 States – <span className="capitalize">{mode === "original" ? "Original" : "Actual"}</span>
        </h3>
        <DownloadMenu
          chartRef={chartRef}
          title={`total_revenue_expenditure_${mode}`}
          chartTitle={`Total Revenue and Expenditure for the 36 States (${mode === "original" ? "Original Budget" : "Actual"})`}
          years={data.years}
          series={[
            { label: "Total Expenditure", vals: data.expenditure },
            { label: "Total Revenue", vals: data.revenue }
          ]}
        />
      </div>
      <div ref={chartRef}>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
          {gridLines.map(v => (
            <g key={v}>
              <line x1={pl} y1={py(v)} x2={w - pr} y2={py(v)} stroke="#e8e8e8" strokeWidth="1" />
              <text x={pl - 6} y={py(v) + 4} textAnchor="end" fontSize="10" fill="#999" fontFamily="sans-serif">{v > 0 ? `${v}T` : "0"}</text>
            </g>
          ))}
          {series.map(s => (
            <polyline key={s.key} points={polyline(s.vals)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />
          ))}
          {series.map(s => s.vals.map((v, i) => (
            <circle key={`${s.key}-${i}`} cx={px(i)} cy={py(v)} r={hovered === i ? 5 : 3.5}
              fill={s.color} stroke="white" strokeWidth="1.5"
              className="cursor-pointer transition-all duration-100"
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            />
          )))}
          {data.years.map((y, i) => (
            <text key={y} x={px(i)} y={h - pb + 16} textAnchor="middle" fontSize="10" fill="#666" fontFamily="sans-serif">{y}</text>
          ))}
          {/* Legend */}
          {series.map((s, idx) => (
            <g key={s.key}>
              <circle cx={pl + 10 + idx * 150} cy={h - 15} r="5" fill={s.color} />
              <text x={pl + 20 + idx * 150} y={h - 11} fontSize="11" fill="#555" fontFamily="sans-serif">{s.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function ExpenditureCharts({ mode: defaultMode = "original", onModeChange }) {
  const [internalMode, setInternalMode] = useState(defaultMode);
  const [timeSeries, setTimeSeries] = useState(null);
  const [loading, setLoading] = useState(true);

  const mode = defaultMode !== internalMode ? internalMode : defaultMode;

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        setLoading(true);
        const res = await budgetService.timeSeriesData();
        if (cancelled) return;
        const result = res?.data?.data?.result;
        if (result) {
          setTimeSeries(result);
        }
      } catch (error) {
        console.error("Failed to fetch time series:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, []);

  const handleModeChange = (newMode) => {
    setInternalMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  const data = useMemo(() => seriesFromApi(timeSeries, mode), [timeSeries, mode]);

  return (
    <div className="bg-[#f8faf8] px-8 py-8">
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-3 bg-white border border-[#e0e0e0] rounded-full px-6 py-2.5 shadow-sm">
          <span className={`text-[13px] font-medium w-28 text-right transition-colors duration-150 ${mode === "original" ? "text-[#1D9E75]" : "text-[#bbb]"}`}>
            Original Budget
          </span>

          <button
            onClick={() => handleModeChange(mode === "original" ? "actual" : "original")}
            aria-label="Toggle budget mode"
            className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${mode === "actual" ? "bg-[#888]" : "bg-[#1D9E75]"
              }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${mode === "actual" ? "translate-x-5" : "translate-x-0"
                }`}
            />
          </button>

          <span className={`text-[13px] font-medium w-10 transition-colors duration-150 ${mode === "actual" ? "text-[#555]" : "text-[#bbb]"}`}>
            Actual
          </span>
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto w-full">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto w-full">
          <BarChart mode={mode} data={data} />
          <LineChart mode={mode} data={data} />
        </div>
      )}
      <div className="flex justify-center">
        <span className="text-[13px] mt-2 font-medium transition-colors duration-150 text-[#555]">
          Source: NGF Public Finance database
        </span>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#e8e8e8] p-5 h-[340px] flex flex-col justify-between w-full">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
      <div className="flex-1 flex items-end justify-between px-4 pb-2 pt-8 gap-3 sm:gap-4">
        {[30, 50, 40, 70, 50, 80, 60, 40].map((h, i) => (
          <div key={i} className="w-full bg-gray-100 rounded-t-md animate-pulse" style={{ height: `${h}%` }}></div>
        ))}
      </div>
      <div className="flex justify-between px-4 mt-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-2.5 bg-gray-200 rounded w-6 sm:w-8 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
