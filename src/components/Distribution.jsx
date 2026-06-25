"use client"

import { useState, useEffect, useRef } from "react";
import budgetService from "../service/budgetService";
import { useRouter } from "next/navigation";

const colorPalette = [
  '#1D9E75', '#2E5BFF', '#FF8A00', '#E53E3E', '#805AD5',
  '#3182CE', '#D69E2E', '#38A169', '#E53E3E', '#D53F8C',
  '#00B5D8', '#4A5568'
];

function formatSectorName(enumStr) {
  if (!enumStr) return 'Unknown';
  return enumStr.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
}

function DownloadMenu({ data, total, svgRef, title }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getSvg = () => svgRef.current;
  const trigger = (url, name) => { const a = document.createElement("a"); a.href = url; a.download = name; a.click(); };

  const downloadSVG = () => {
    const el = getSvg(); if (!el) return;
    const clone = el.cloneNode(true);

    clone.setAttribute("viewBox", "0 -60 400 495");
    clone.setAttribute("width", "400");
    clone.setAttribute("height", "495");

    // Add title text
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", "20");
    titleText.setAttribute("y", "-35");
    titleText.setAttribute("font-family", "sans-serif");
    titleText.setAttribute("font-size", "11px");
    titleText.setAttribute("font-weight", "bold");
    titleText.setAttribute("fill", "#111111");
    titleText.textContent = "Distribution of Total Expenditure by Sector (Original Budget 2026)";
    clone.appendChild(titleText);

    // Add source text
    const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sourceText.setAttribute("x", "380");
    sourceText.setAttribute("y", "425");
    sourceText.setAttribute("font-family", "sans-serif");
    sourceText.setAttribute("font-size", "10px");
    sourceText.setAttribute("fill", "#999999");
    sourceText.setAttribute("text-anchor", "end");
    sourceText.textContent = "Source: NGF Public Finance Database";
    clone.appendChild(sourceText);

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(clone);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    trigger(url, `${title.replace(/\s+/g, "_")}_chart.svg`);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const downloadPNG = () => {
    const el = getSvg(); if (!el) return;
    const clone = el.cloneNode(true);

    clone.setAttribute("viewBox", "0 -60 400 495");
    clone.setAttribute("width", "400");
    clone.setAttribute("height", "495");

    // Add title text
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", "20");
    titleText.setAttribute("y", "-35");
    titleText.setAttribute("font-family", "sans-serif");
    titleText.setAttribute("font-size", "11px");
    titleText.setAttribute("font-weight", "bold");
    titleText.setAttribute("fill", "#111111");
    titleText.textContent = "Distribution of Total Expenditure by Sector (Original Budget 2026)";
    clone.appendChild(titleText);

    // Add source text
    const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sourceText.setAttribute("x", "380");
    sourceText.setAttribute("y", "425");
    sourceText.setAttribute("font-family", "sans-serif");
    sourceText.setAttribute("font-size", "10px");
    sourceText.setAttribute("fill", "#999999");
    sourceText.setAttribute("text-anchor", "end");
    sourceText.textContent = "Source: NGF Public Finance Database";
    clone.appendChild(sourceText);

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(clone);
    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400 * 2;
      canvas.height = 495 * 2;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL("image/png");
      trigger(pngUrl, `${title.replace(/\s+/g, "_")}_chart.png`);
    };
    img.src = url;
    setOpen(false);
  };

  const downloadJPEG = () => {
    const el = getSvg(); if (!el) return;
    const clone = el.cloneNode(true);

    clone.setAttribute("viewBox", "0 -60 400 495");
    clone.setAttribute("width", "400");
    clone.setAttribute("height", "495");

    // Add title text
    const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    titleText.setAttribute("x", "20");
    titleText.setAttribute("y", "-35");
    titleText.setAttribute("font-family", "sans-serif");
    titleText.setAttribute("font-size", "11px");
    titleText.setAttribute("font-weight", "bold");
    titleText.setAttribute("fill", "#111111");
    titleText.textContent = "Distribution of Total Expenditure by Sector (Original Budget 2026)";
    clone.appendChild(titleText);

    // Add source text
    const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sourceText.setAttribute("x", "380");
    sourceText.setAttribute("y", "425");
    sourceText.setAttribute("font-family", "sans-serif");
    sourceText.setAttribute("font-size", "10px");
    sourceText.setAttribute("fill", "#999999");
    sourceText.setAttribute("text-anchor", "end");
    sourceText.textContent = "Source: NGF Public Finance Database";
    clone.appendChild(sourceText);

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(clone);
    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400 * 2;
      canvas.height = 495 * 2;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const jpegUrl = canvas.toDataURL("image/jpeg", 0.92);
      trigger(jpegUrl, `${title.replace(/\s+/g, "_")}_chart.jpg`);
    };
    img.src = url;
    setOpen(false);
  };

  const downloadCSV = () => {
    const header = "Sector,Value (NGN)";
    const rows = data.map((s) => `${s.name},${s.value}`).join("\n");
    const csv = `${header}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    trigger(url, `${title.replace(/\s+/g, "_")}_data.csv`);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const downloadXLS = () => {
    const header = "Sector\tValue (NGN)";
    const rows = data.map((s) => `${s.name}\t${s.value}`).join("\n");
    const xls = `${header}\n${rows}`;
    const blob = new Blob([xls], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    trigger(url, `${title.replace(/\s+/g, "_")}_data.xls`);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const MENU_ITEMS = [
    { label: "Download PNG image", action: downloadPNG },
    { label: "Download JPEG image", action: downloadJPEG },
    { label: "Download SVG vector image", action: downloadSVG, dividerBefore: true },
    { label: "Download CSV", action: downloadCSV, dividerBefore: true },
    { label: "Download XLS", action: downloadXLS },
  ];

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-7 h-7 flex items-center justify-center rounded text-[#888] hover:bg-[#e0eee0] transition-colors"
        title="Download / export"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-50 bg-white border border-[#ddd] rounded-lg shadow-lg min-w-[210px] py-1 text-[13px] font-normal">
          {MENU_ITEMS.map((item) => (
            <div key={item.label}>
              {item.dividerBefore && <div className="border-t border-[#eee] my-1" />}
              <button
                onClick={item.action}
                className="w-full text-left px-4 py-2 text-[#222] hover:bg-[#f5f5f5] transition-colors"
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Distribution = () => {
  const [list, setList] = useState([]);
  const [sectorTotal, setSectorTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const svgRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await budgetService.distributionGraph();
        if (cancelled) return;

        const data = res?.data?.data.result || [];

        let total = 0;
        const formattedList = data.map((item, i) => {
          total += item.total;
          return {
            name: formatSectorName(item.function),
            value: item.total,
            color: colorPalette[i % colorPalette.length]
          };
        });

        setList(formattedList);
        setSectorTotal(total);
      } catch (err) {
        console.error('Failed to load distribution graph:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-between h-full min-w-0 pr-0 md:pr-4 py-2">
            <div>
              <span className="text-[11px] font-extrabold tracking-widest text-[#1D9E75] uppercase bg-[#eafbf5] px-3 py-1 rounded-full w-fit mb-4 inline-block">
                Interactive Analytics
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#143D2E] leading-snug mb-3">
                Explore Comparative Data of States
              </h2>
              <p className="text-[14.5px] text-gray-600 leading-relaxed mb-6">
                Users can run selected queries across multiple states and budget performance indicators, comparing capital versus recurrent allocations, personnel costs, and revenue growth.
              </p>

              <div className="space-y-4 my-6">
                {[
                  {
                    title: "Multi-State Benchmarking",
                    desc: "Select and compare performance parameters across multiple states simultaneously.",
                    icon: (
                      <svg className="w-5 h-5 text-[#1D9E75]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                      </svg>
                    )
                  },
                  {
                    title: "Key Performance Indicators",
                    desc: "Filter results by budget size, capital expenditure share, recurrent costs, and revenue performance.",
                    icon: (
                      <svg className="w-5 h-5 text-[#1D9E75]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Geopolitical Aggregations",
                    desc: "Group states by North-West, South-South, and other zones to analyze regional fiscal equity.",
                    icon: (
                      <svg className="w-5 h-5 text-[#1D9E75]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )
                  }
                ].map((feat, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-[#fafdfb] hover:bg-[#f3faf6] hover:border-[#d4ede1] transition-all duration-200 group">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-150 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-800 mb-0.5">{feat.title}</h4>
                      <p className="text-[12.5px] text-gray-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => router.push('/group-explorer')}
                className="inline-flex items-center gap-2 bg-[#1D9E75] text-white font-extrabold px-8 py-3.5 rounded-full hover:bg-[#157F5D] active:scale-[0.98] transition-all duration-150 shadow-md hover:shadow-lg text-sm cursor-pointer"
              >
                Run Comparison
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          <div className="min-w-0 w-full pl-0 md:pl-2 lg:pl-4">
            <div className="mt-5 mb-5 px-4 py-3 bg-[#f8faf8] rounded-lg border border-[#e8ede8] flex items-center justify-between gap-4">
              <p className="text-[13px] text-[#888] leading-relaxed">Distribution of total expenditure by sector, original budget 2026</p>
              {!loading && list.length > 0 && (
                <DownloadMenu data={list} total={sectorTotal} svgRef={svgRef} title="Sector_Expenditure_Distribution" />
              )}
            </div>
            {loading ? (
              <p className="text-sm text-gray-500">Loading sector distribution…</p>
            ) : list.length ? (
              <DonutChart data={list} total={sectorTotal} svgRef={svgRef} />
            ) : (
              <p className="text-sm text-gray-500">No sector data available for this selection.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DonutChart({ data, total, svgRef }) {
  const [hovered, setHovered] = useState(null);
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const R = 150;
  const r = 90; // Inner radius to create the donut hole

  let cum = 0;
  const slices = data.map((d) => {
    const start = cum;
    cum += d.value / Math.max(total, 1);
    return { ...d, start, end: cum };
  });

  function polar(pct, radius) {
    const angle = pct * 2 * Math.PI - Math.PI / 2;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  }

  function slicePath(s, expand = false) {
    const gap = 0.002;
    const s0 = s.start + gap;
    const s1 = s.end - gap;
    const [osx, osy] = polar(s0, R + (expand ? 6 : 0));
    const [oex, oey] = polar(s1, R + (expand ? 6 : 0));
    const [isx, isy] = polar(s1, r);
    const [iex, iey] = polar(s0, r);
    const large = s1 - s0 > 0.5 ? 1 : 0;
    const Rr = R + (expand ? 6 : 0);
    return `M ${osx} ${osy} A ${Rr} ${Rr} 0 ${large} 1 ${oex} ${oey} L ${isx} ${isy} A ${r} ${r} 0 ${large} 0 ${iex} ${iey} Z`;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-4">
        <div className="w-full max-w-[400px] flex-shrink shrink mx-auto">
          <svg
            ref={svgRef}
            width="100%"
            height="auto"
            viewBox={`0 0 ${size} ${size}`}
            preserveAspectRatio="xMidYMid meet"
            className="block"
          >
            {slices.map((s, i) => (
              <g key={s.name}>
                <path
                  d={slicePath(s, hovered === i)}
                  fill={s.color}
                  stroke="white"
                  strokeWidth="1.5"
                  opacity={hovered === null || hovered === i ? 1 : 0.65}
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
              </g>
            ))}
            {/* Render the grand total in the center of the donut hole */}
            <text x={cx} y={cy - 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#333" fontFamily="sans-serif">Total</text>
            <text x={cx} y={cy + 15} textAnchor="middle" fontSize="11" fill="#666" fontFamily="sans-serif">{formatAbbreviated(total)}</text>
          </svg>
        </div>

        <div className="w-full max-w-md max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          <ul className="flex flex-col gap-2">
            {slices.map((s, i) => {
              const percent = (s.value / Math.max(total, 1) * 100).toFixed(1);
              return (
                <li
                  key={s.name}
                  className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ opacity: hovered === null || hovered === i ? 1 : 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="font-semibold text-gray-700">{s.name}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-gray-900 font-medium">{formatAbbreviated(s.value)}</span>
                    <span className="text-gray-500 text-[11px]">{percent}%</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Source */}
      <div className="flex justify-center mt-6">
        <p className="text-[12px] text-[#aaa]">Source: NGF Public Finance Database</p>
      </div>
    </div>
  );
}

function formatAbbreviated(value) {
  const val = Number(value || 0);
  if (val >= 1e12) {
    return "N" + (val / 1e12).toFixed(2) + "T";
  } else if (val >= 1e9) {
    return "N" + (val / 1e9).toFixed(2) + "B";
  } else if (val >= 1e6) {
    return "N" + (val / 1e6).toFixed(2) + "M";
  }
  return "N" + val.toLocaleString("en-NG", { maximumFractionDigits: 2 });
}

function formatN(value) {
  return "N" + Number(value || 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default Distribution
