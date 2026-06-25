"use client";

import { useState, useRef, useEffect } from "react";
import budgetService from "../service/budgetService";

const colorPalette = ["#3B5998", "#9B59B6", "#7F8C8D", "#27AE60", "#E67E22", "#3498DB", "#2ECC71", "#E74C3C"];

function DownloadMenu({ zone, svgRef }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const downloadSVG = () => {
        const svgEl = svgRef.current;
        if (!svgEl) return;
        const clone = svgEl.cloneNode(true);

        clone.setAttribute("viewBox", "-130 -85 540 450");
        clone.setAttribute("width", "540");
        clone.setAttribute("height", "450");

        // Add title text
        const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        titleText.setAttribute("x", "-120");
        titleText.setAttribute("y", "-60");
        titleText.setAttribute("font-family", "sans-serif");
        titleText.setAttribute("font-size", "11px");
        titleText.setAttribute("font-weight", "bold");
        titleText.setAttribute("fill", "#111111");
        titleText.textContent = `Share of Total Expenditure – ${zone.name} Geopolitical Zone`;
        clone.appendChild(titleText);

        // Add source text
        const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        sourceText.setAttribute("x", "390");
        sourceText.setAttribute("y", "350");
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
        const a = document.createElement("a");
        a.href = url;
        a.download = `${zone.name.replace(/\s+/g, "_")}_chart.svg`;
        a.click();
        URL.revokeObjectURL(url);
        setOpen(false);
    };

    const downloadPNG = () => {
        const svgEl = svgRef.current;
        if (!svgEl) return;
        const clone = svgEl.cloneNode(true);

        clone.setAttribute("viewBox", "-130 -85 540 450");
        clone.setAttribute("width", "540");
        clone.setAttribute("height", "450");

        // Add title text
        const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        titleText.setAttribute("x", "-120");
        titleText.setAttribute("y", "-60");
        titleText.setAttribute("font-family", "sans-serif");
        titleText.setAttribute("font-size", "11px");
        titleText.setAttribute("font-weight", "bold");
        titleText.setAttribute("fill", "#111111");
        titleText.textContent = `Share of Total Expenditure – ${zone.name} Geopolitical Zone`;
        clone.appendChild(titleText);

        // Add source text
        const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        sourceText.setAttribute("x", "390");
        sourceText.setAttribute("y", "350");
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
            canvas.width = 540 * 2;
            canvas.height = 450 * 2;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.scale(2, 2);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            const pngUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = pngUrl;
            a.download = `${zone.name.replace(/\s+/g, "_")}_chart.png`;
            a.click();
        };
        img.src = url;
        setOpen(false);
    };

    const downloadJPEG = () => {
        const svgEl = svgRef.current;
        if (!svgEl) return;
        const clone = svgEl.cloneNode(true);

        clone.setAttribute("viewBox", "-130 -85 540 450");
        clone.setAttribute("width", "540");
        clone.setAttribute("height", "450");

        // Add title text
        const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        titleText.setAttribute("x", "-120");
        titleText.setAttribute("y", "-60");
        titleText.setAttribute("font-family", "sans-serif");
        titleText.setAttribute("font-size", "11px");
        titleText.setAttribute("font-weight", "bold");
        titleText.setAttribute("fill", "#111111");
        titleText.textContent = `Share of Total Expenditure – ${zone.name} Geopolitical Zone`;
        clone.appendChild(titleText);

        // Add source text
        const sourceText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        sourceText.setAttribute("x", "390");
        sourceText.setAttribute("y", "350");
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
            canvas.width = 540 * 2;
            canvas.height = 450 * 2;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.scale(2, 2);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            const jpegUrl = canvas.toDataURL("image/jpeg", 0.92);
            const a = document.createElement("a");
            a.href = jpegUrl;
            a.download = `${zone.name.replace(/\s+/g, "_")}_chart.jpg`;
            a.click();
        };
        img.src = url;
        setOpen(false);
    };

    const downloadCSV = () => {
        const header = "State,Share (%)";
        const rows = zone.states.map((s) => `${s.name},${s.share}`).join("\n");
        const csv = `${header}\n${rows}`;
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${zone.name.replace(/\s+/g, "_")}_data.csv`;
        a.click();
        URL.revokeObjectURL(url);
        setOpen(false);
    };

    const downloadXLS = () => {
        const header = "State\tShare (%)";
        const rows = zone.states.map((s) => `${s.name}\t${s.share}`).join("\n");
        const xls = `${header}\n${rows}`;
        const blob = new Blob([xls], { type: "application/vnd.ms-excel" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${zone.name.replace(/\s+/g, "_")}_data.xls`;
        a.click();
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
                className="w-7 h-7 flex items-center justify-center rounded text-[#888] hover:bg-[#f0f0f0] hover:text-[#333] transition-colors px"
                title="Download / export"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 top-8 z-50 bg-white border border-[#ddd] rounded-lg shadow-lg min-w-[210px] py-1 text-[13px]">
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

function PieChart({ zone }) {
    const [hovered, setHovered] = useState(null);
    const svgRef = useRef(null);
    const size = 300;
    const cx = size / 2;
    const cy = size / 2;
    const R = 100;

    let cum = 0;
    const slices = zone.states.map((s) => {
        const start = cum;
        cum += s.share;
        return { ...s, start, end: cum };
    });
    const total = cum;

    function polar(pct, radius) {
        const angle = (pct / total) * 2 * Math.PI - Math.PI / 2;
        return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
    }

    function slicePath(s) {
        const [sx, sy] = polar(s.start, R);
        const [ex, ey] = polar(s.end, R);
        const large = (s.end - s.start) / total > 0.5 ? 1 : 0;
        return `M ${cx} ${cy} L ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey} Z`;
    }

    function linePoints(s) {
        const mid = (s.start + s.end) / 2;
        const [ox, oy] = polar(mid, R * 1.15);
        const [lx, ly] = polar(mid, R * 1.35);
        const isRight = lx > cx;
        const endX = isRight ? lx + 18 : lx - 18;
        return { ox, oy, lx, ly, endX, isRight };
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full px-1 mb-1">
                <h3 className="text-lg font-bold text-[#111]">{zone.name}</h3>
                <DownloadMenu zone={zone} svgRef={svgRef} />
            </div>
            <svg
                ref={svgRef}
                width="100%"
                height="auto"
                viewBox={`-130 -40 ${size + 240} ${size + 80}`}
                style={{ maxWidth: size + 240 }}
                className="block"
            >
                {slices.map((s, i) => (
                    <g key={s.name}>
                        <path
                            d={slicePath(s)}
                            fill={s.color}
                            stroke="white"
                            strokeWidth="1.5"
                            opacity={hovered === null || hovered === i ? 1 : 0.5}
                            className="cursor-pointer transition-opacity duration-150"
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            transform={hovered === i ? (() => {
                                const mid = (s.start + s.end) / 2;
                                const angle = (mid / total) * 2 * Math.PI - Math.PI / 2;
                                return `translate(${Math.cos(angle) * 4}, ${Math.sin(angle) * 4})`;
                            })() : ""}
                        />
                        {(() => {
                            const { ox, oy, lx, ly, endX, isRight } = linePoints(s);
                            return (
                                <g>
                                    <polyline
                                        points={`${ox},${oy} ${lx},${ly} ${endX},${ly}`}
                                        fill="none"
                                        stroke="#999"
                                        strokeWidth="0.7"
                                    />
                                    <text
                                        x={isRight ? endX + 3 : endX - 3}
                                        y={ly + 1}
                                        textAnchor={isRight ? "start" : "end"}
                                        fontSize="12"
                                        fill="#333"
                                        fontFamily="sans-serif"
                                    >
                                        {s.name}: {s.share} %
                                    </text>
                                </g>
                            );
                        })()}
                    </g>
                ))}
            </svg>
            <p className="text-[12px] text-[#aaa]">Source: NGF Public Finance Database</p>
        </div>
    );
}

const GeoZone = () => {
    const [zonesData, setZonesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [year, setYear] = useState(2026); // Default fallback

    useEffect(() => {
        let cancelled = false;
        const fetchZones = async () => {
            try {
                setLoading(true);
                const res = await budgetService.zonalBreakdown();
                if (cancelled) return;

                const result = res?.data?.data?.result || [];

                // Exclude 'unknown'
                const filteredZones = result.filter(z =>
                    z.zoneName && z.zoneName.toLowerCase() !== 'unknown'
                );

                // Find the first zone record that has data
                const targetZones = filteredZones.filter(z => z.originalExpenditure > 0);

                const targetYear = targetZones.length > 0 ? targetZones[0].year : (filteredZones[0]?.year || 2026);
                setYear(targetYear);

                // Filter for just the target year to prevent duplicates
                const yearZones = filteredZones.filter(z => z.year === targetYear);

                const formattedZones = yearZones.map(z => ({
                    name: z.zoneName,
                    states: Object.entries(z.states)
                        .map(([stateName, percentages], i) => ({
                            name: stateName,
                            share: percentages.originalPercentage,
                            color: colorPalette[i % colorPalette.length]
                        }))
                }));

                setZonesData(formattedZones);
            } catch (err) {
                console.error(err);
                if (!cancelled) setError("Failed to load zonal breakdown.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchZones();
        return () => { cancelled = true; };
    }, []);

    if (loading) {
        return <GeoZoneSkeleton />;
    }

    if (error || zonesData.length === 0) {
        return (
            <section className="bg-[#f8faf8] py-6 sm:py-8">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    {error || `No zone data available for ${year}.`}
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#f8faf8] py-4">
            <div className="mx-auto w-full px-2 sm:px-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 pr-0 sm:pr-2">
                    <h2 className="text-lg font-medium text-[#1D9E75] leading-relaxed min-w-0">
                        Share of Total Expenditure by Geopolitical Zone,{" "}
                        {year}
                    </h2>
                    <a href="/state-explorer" className="text-[13px] text-[#1D9E75] hover:underline font-medium whitespace-nowrap">
                        See all States
                    </a>
                </div>

                <div className="bg-white rounded-md overflow-x-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {zonesData.map((zone) => (
                            <div key={zone.name} className="p-2 sm:p-3 flex justify-center min-w-0">
                                <PieChart zone={zone} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

function PieChartSkeleton() {
    return (
        <div className="flex flex-col items-center w-full max-w-[300px] animate-pulse p-2">
            <div className="flex items-center justify-between w-full px-1 mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-6"></div>
            </div>
            <div className="w-[180px] h-[180px] rounded-full bg-gray-100 mt-2"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2 mt-8"></div>
        </div>
    );
}

function GeoZoneSkeleton() {
    return (
        <section className="bg-[#f8faf8] py-6 sm:py-8">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 pr-0 sm:pr-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3 sm:w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>

                <div className="bg-white rounded-md overflow-x-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="p-4 sm:p-6 flex justify-center min-w-0 border-r border-b border-[#f0f0f0]">
                                <PieChartSkeleton />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GeoZone;