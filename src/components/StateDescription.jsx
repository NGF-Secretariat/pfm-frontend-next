"use client";

import { useState, useRef, useEffect } from "react";

function DownloadMenu({ chartRef, title, dataSeries, years }) {
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
        trigger(URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(el)], { type: "image/svg+xml" })), `${title}.svg`);
        setOpen(false);
    };

    const rasterize = (type, quality = 1) => {
        const el = getSvg(); if (!el) return;
        const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(el)], { type: "image/svg+xml;charset=utf-8" }));
        const img = new Image();
        img.onload = () => {
            const vb = el.viewBox?.baseVal;
            const w = (vb?.width || 700) * 2, h = (vb?.height || 400) * 2;
            const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); ctx.scale(2, 2); ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            trigger(canvas.toDataURL(`image/${type}`, quality), `${title}.${type === "jpeg" ? "jpg" : type}`);
        };
        img.src = url; setOpen(false);
    };

    const downloadCSV = () => {
        const rows = ["Year,Budget (NGN Billion)", ...years.map((y, i) => `${y},${dataSeries[i]}`)];
        trigger(URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" })), `${title}.csv`);
        setOpen(false);
    };

    const downloadXLS = () => {
        const rows = ["Year\tBudget (NGN Billion)", ...years.map((y, i) => `${y}\t${dataSeries[i]}`)];
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
                <div className="absolute right-0 top-9 z-50 bg-white border border-[#ddd] rounded-lg shadow-lg min-w-[220px] py-1 text-[13px]">
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

function BarChart({ mode, stateName, data, years }) {
    const chartRef = useRef(null);
    const [hovered, setHovered] = useState(null);
    const w = 620, h = 360, pl = 70, pr = 20, pt = 24, pb = 60;
    const chartW = w - pl - pr, chartH = h - pt - pb;
    const maxVal = 1000;
    const barW = (chartW / years?.length) * 0.52;
    const gap = chartW / years?.length;
    const gridLines = [0, 250, 500, 750, 1000];

    const bx = (i) => pl + i * gap + gap / 2 - barW / 2;
    const by = (v) => pt + chartH - (v / maxVal) * chartH;
    const bh = (v) => (v / maxVal) * chartH;

    return (
        <div className="bg-white p-5">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-bold text-[#111]">
                    {stateName} Total Expenditure – <span className="capitalize">{mode === "original" ? "Original" : "Actual"}</span>
                </h3>
                <DownloadMenu chartRef={chartRef} title={`${stateName.replace(/\s+/g, '_').toLowerCase()}_expenditure_${mode}`} dataSeries={data} years={years} />
            </div>
            <div ref={chartRef}>
                <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
                    {gridLines.map(v => (
                        <g key={v}>
                            <line x1={pl} y1={by(v)} x2={w - pr} y2={by(v)} stroke="#eeeeee" strokeWidth="1" />
                            <text x={pl - 8} y={by(v) + 4} textAnchor="end" fontSize="10" fill="#999" fontFamily="sans-serif">
                                {v === 0 ? "0" : `${v}G`}
                            </text>
                        </g>
                    ))}
                    <text x={16} y={h / 2} textAnchor="middle" fontSize="10" fill="#999" fontFamily="sans-serif" transform={`rotate(-90,16,${h / 2})`}>(NGN Billion)</text>

                    {data.map((v, i) => (
                        <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
                            <rect x={bx(i)} y={by(v)} width={barW} height={bh(v)} fill={hovered === i ? "#0f6e56" : "#1D9E75"} rx="3" className="transition-colors duration-150" />
                            <text x={bx(i) + barW / 2} y={by(v) - 6} textAnchor="middle" fontSize="10" fontWeight="600" fill="#0f6e56" fontFamily="sans-serif">{v}G</text>
                            <text x={bx(i) + barW / 2} y={h - pb + 16} textAnchor="middle" fontSize="10" fill="#666" fontFamily="sans-serif">{years[i]}</text>
                        </g>
                    ))}

                    {/* Legend */}
                    <circle cx={pl + 10} cy={h - 12} r="5" fill="#1D9E75" />
                    <text x={pl + 20} y={h - 8} fontSize="11" fill="#555" fontFamily="sans-serif">Budget</text>

                    <text x={w / 2} y={h - pb + 32} textAnchor="middle" fontSize="10" fill="#999" fontFamily="sans-serif">Years</text>
                    <text x={w - pr} y={h - 2} textAnchor="end" fontSize="12" fill="#bbb" fontFamily="sans-serif">Source: NGF Public Finance Database</text>
                </svg>
            </div>
        </div>
    );
}

function AboutPanel({ profile }) {
    if (!profile) return null;

    const meta = [
        { label: "Population", value: profile.population ? Number(profile.population).toLocaleString() : "Not available" },
        { label: "Area", value: profile.area || "Not available" },
        { label: "Coordinates", value: profile.coordinates || "Not available" },
    ];

    return (
        <div className="bg-white p-6 h-full">
            <h2 className="text-[18px] font-bold text-[#111] mb-3">About</h2>
            <p className="text-[13.5px] text-[#444] leading-relaxed mb-6">{profile.about || "No description available."}</p>

            <div className="divide-y divide-[#f0f0f0]">
                {meta.map(({ label, value, isLink }) => (
                    <div key={label} className="grid grid-cols-2 py-3 gap-4">
                        <span className="text-[14px] font-semibold text-[#1a1a1a]">{label} -</span>
                        {isLink ? (
                            <a href={value} target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-[#1D9E75] hover:underline break-all">{value}</a>
                        ) : (
                            <span className="text-[13.5px] text-[#444]">{value}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

import budgetService from "../service/budgetService";
import { Loader2 } from "lucide-react";

const formatStateName = (name) => {
    if (!name) return "";
    const lower = name.toLowerCase();
    if (lower === "fct") return "FCT Abuja";
    const titleCase = lower.charAt(0).toUpperCase() + lower.slice(1);
    return titleCase.endsWith("state") ? titleCase : `${titleCase} State`;
};

const StateExpenditurePage = ({ slug }) => {
    const [mode, setMode] = useState("original");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, [slug]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white">
                <Loader2 className="w-10 h-10 text-[#1D9E75] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading state data...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white">
                <p className="text-red-500 font-medium">State profile not found.</p>
            </div>
        );
    }

    const stateName = formatStateName(profile.state?.name);
    const years = profile.timeSeries?.actual?.expenditure ? profile.timeSeries.actual.expenditure.map(v => v.year) : [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

    return (
        <div className="bg-white">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-[#f0f0f0]">
                <h1 className="text-2xl font-bold text-[#1a1a1a]">{stateName}</h1>
                <a href="#data-table" className="text-[13px] text-[#1D9E75] hover:underline font-medium">View Data Table</a>
            </div>

            {/* Toggle */}
            <div className="flex justify-center pt-5 pb-2">
                <div className="inline-flex items-center gap-3 bg-white border border-[#e0e0e0] rounded-full px-6 py-2 shadow-sm">
                    <span className={`text-[13px] font-medium w-16 text-right transition-colors duration-150 ${mode === "original" ? "text-[#1D9E75]" : "text-[#bbb]"}`}>
                        Original
                    </span>
                    <button
                        onClick={() => setMode(m => m === "original" ? "actual" : "original")}
                        aria-label="Toggle budget mode"
                        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${mode === "actual" ? "bg-[#888]" : "bg-[#1D9E75]"}`}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${mode === "actual" ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                    <span className={`text-[13px] font-medium w-10 transition-colors duration-150 ${mode === "actual" ? "text-[#555]" : "text-[#bbb]"}`}>
                        Actual
                    </span>
                </div>
            </div>

            {/* Main two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 py-6 mx-auto">
                <BarChart
                    mode={mode}
                    stateName={stateName}
                    data={profile.timeSeries?.actual?.expenditure ? profile.timeSeries[mode].expenditure.map(v => Math.round(v.value / 1e9)) : Array(years.length).fill(0)}
                    years={years}
                />
                <AboutPanel profile={profile} />
            </div>
        </div>
    );
}

export default StateExpenditurePage;