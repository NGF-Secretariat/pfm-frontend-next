// "use client";

// import { useState } from "react";

// const GEO_ZONES = [
//     {
//         name: "South West",
//         color: "#4A6FA5",
//         states: [
//             { name: "Lagos", share: 51.0, color: "#3B5998" },
//             { name: "Ogun", share: 16.0, color: "#9B59B6" },
//             { name: "Oyo", share: 10.4, color: "#7F8C8D" },
//             { name: "Osun", share: 6.5, color: "#27AE60" },
//             { name: "Ondo", share: 10.6, color: "#E67E22" },
//             { name: "Ekiti", share: 5.7, color: "#3498DB" },
//         ],
//     },
//     {
//         name: "North West",
//         color: "#1D9E75",
//         states: [
//             { name: "Jigawa", share: 15.3, color: "#1ABC9C" },
//             { name: "Kano", share: 15.8, color: "#3B5998" },
//             { name: "Katsina", share: 15.2, color: "#E74C3C" },
//             { name: "Kaduna", share: 17.4, color: "#E67E22" },
//             { name: "Kebbi", share: 12.7, color: "#7F8C8D" },
//             { name: "Sokoto", share: 11.6, color: "#9B59B6" },
//             { name: "Zamfara", share: 12.0, color: "#2ECC71" },
//         ],
//     },
//     {
//         name: "South South",
//         color: "#D4537E",
//         states: [
//             { name: "Akwa Ibom", share: 19.0, color: "#3B5998" },
//             { name: "Bayelsa", share: 13.9, color: "#9B59B6" },
//             { name: "Cross River", share: 10.7, color: "#2ECC71" },
//             { name: "Delta", share: 19.5, color: "#E67E22" },
//             { name: "Edo", share: 13.4, color: "#7F8C8D" },
//             { name: "Rivers", share: 23.4, color: "#9B59B6" },
//         ],
//     },
//     {
//         name: "North Central",
//         color: "#BA7517",
//         states: [
//             { name: "Benue", share: 13.2, color: "#3498DB" },
//             { name: "Kogi", share: 14.0, color: "#E74C3C" },
//             { name: "Kwara", share: 14.1, color: "#27AE60" },
//             { name: "Nasarawa", share: 9.2, color: "#E67E22" },
//             { name: "Niger", share: 37.5, color: "#3B5998" },
//             { name: "Plateau", share: 12.0, color: "#9B59B6" },
//         ],
//     },
//     {
//         name: "North East",
//         color: "#D85A30",
//         states: [
//             { name: "Adamawa", share: 18.1, color: "#3498DB" },
//             { name: "Bauchi", share: 17.4, color: "#3B5998" },
//             { name: "Borno", share: 22.9, color: "#7F8C8D" },
//             { name: "Gombe", share: 13.7, color: "#E67E22" },
//             { name: "Taraba", share: 16.0, color: "#27AE60" },
//             { name: "Yobe", share: 11.9, color: "#9B59B6" },
//         ],
//     },
//     {
//         name: "South East",
//         color: "#7F77DD",
//         states: [
//             { name: "Abia", share: 21.0, color: "#3498DB" },
//             { name: "Anambra", share: 17.0, color: "#9B59B6" },
//             { name: "Ebonyi", share: 12.4, color: "#E67E22" },
//             { name: "Enugu", share: 27.1, color: "#E74C3C" },
//             { name: "Imo", share: 22.5, color: "#7F8C8D" },
//         ],
//     },
// ];

// function PieChart({ zone }) {
//     const [hovered, setHovered] = useState(null);
//     const size = 200;
//     const cx = size / 2;
//     const cy = size / 2;
//     const R = 80;

//     let cum = 0;
//     const slices = zone.states.map((s) => {
//         const start = cum;
//         cum += s.share;
//         return { ...s, start, end: cum };
//     });
//     const total = cum;

//     function polar(pct, radius) {
//         const angle = (pct / total) * 2 * Math.PI - Math.PI / 2;
//         return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
//     }

//     function slicePath(s) {
//         const [sx, sy] = polar(s.start, R);
//         const [ex, ey] = polar(s.end, R);
//         const large = (s.end - s.start) / total > 0.5 ? 1 : 0;
//         return `M ${cx} ${cy} L ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey} Z`;
//     }

//     function labelPos(s) {
//         const mid = (s.start + s.end) / 2;
//         const [lx, ly] = polar(mid, R * 1.35);
//         return [lx, ly];
//     }

//     function linePoints(s) {
//         const mid = (s.start + s.end) / 2;
//         const [ix, iy] = polar(mid, R * 0.85);
//         const [ox, oy] = polar(mid, R * 1.15);
//         const [lx, ly] = polar(mid, R * 1.35);
//         const isRight = lx > cx;
//         const endX = isRight ? lx + 18 : lx - 18;
//         return { ix, iy, ox, oy, lx, ly, endX, isRight };
//     }

//     return (
//         <div className="flex flex-col items-center">
//             <h3 className="text-[15px] font-bold text-[#111] mb-1 text-center">{zone.name}</h3>
//             <div className="relative">
//                 <svg width={size + 140} height={size + 80} viewBox={`-70 -40 ${size + 140} ${size + 80}`}>
//                     {slices.map((s, i) => (
//                         <g key={s.name}>
//                             <path
//                                 d={slicePath(s)}
//                                 fill={s.color}
//                                 stroke="white"
//                                 strokeWidth="1.5"
//                                 opacity={hovered === null || hovered === i ? 1 : 0.5}
//                                 className="cursor-pointer transition-opacity duration-150"
//                                 onMouseEnter={() => setHovered(i)}
//                                 onMouseLeave={() => setHovered(null)}
//                                 transform={hovered === i ? (() => {
//                                     const mid = (s.start + s.end) / 2;
//                                     const angle = (mid / total) * 2 * Math.PI - Math.PI / 2;
//                                     return `translate(${Math.cos(angle) * 4}, ${Math.sin(angle) * 4})`;
//                                 })() : ""}
//                             />
//                             {(() => {
//                                 const { ix, iy, ox, oy, lx, ly, endX, isRight } = linePoints(s);
//                                 return (
//                                     <g>
//                                         <polyline
//                                             points={`${ox},${oy} ${lx},${ly} ${endX},${ly}`}
//                                             fill="none"
//                                             stroke="#999"
//                                             strokeWidth="0.7"
//                                         />
//                                         <text
//                                             x={isRight ? endX + 3 : endX - 3}
//                                             y={ly + 1}
//                                             textAnchor={isRight ? "start" : "end"}
//                                             fontSize="8.5"
//                                             fill="#333"
//                                             fontFamily="sans-serif"
//                                         >
//                                             {s.name}: {s.share} %
//                                         </text>
//                                     </g>
//                                 );
//                             })()}
//                         </g>
//                     ))}
//                 </svg>
//             </div>
//             <p className="text-[10px] text-[#aaa] mt-0">Source: NGF Public Finance Database</p>
//         </div>
//     );
// }

// const GeoZone = () => {
//     const [budgetTab, setBudgetTab] = useState("original");

//     return (
//         <section className="bg-[#f5f5f5] py-6 px-6">
//             <div className="mx-auto">
//                 {/* Header row */}
//                 <div className="flex items-start justify-between mb-6">
//                     <h2 className="text-[15px] font-normal text-[#222]">
//                         Share of Total Expenditure by Geopolitical Zone,{" "}
//                         <span className="font-medium">
//                             {budgetTab === "original" ? "Original Budget" : "Actual"}
//                         </span>
//                         , 2025
//                     </h2>
//                     <a href="/nigeria-state-budget" className="text-[13px] text-[#1D9E75] hover:underline font-medium whitespace-nowrap">
//                         See all States
//                     </a>
//                 </div>

//                 {/* 2×3 grid of pie charts */}
//                 <div className="bg-white rounded border border-[#e0e0e0]">
//                     <div className="grid grid-cols-3 divide-x divide-y divide-[#e8e8e8]">
//                         {GEO_ZONES.map((zone) => (
//                             <div key={zone.name} className="p-6 flex justify-center">
//                                 <PieChart zone={zone} />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default GeoZone;


"use client";

import { useState, useRef, useEffect } from "react";

const GEO_ZONES = [
    {
        name: "South West",
        states: [
            { name: "Lagos", share: 51.0, color: "#3B5998" },
            { name: "Ogun", share: 16.0, color: "#9B59B6" },
            { name: "Oyo", share: 10.4, color: "#7F8C8D" },
            { name: "Osun", share: 6.5, color: "#27AE60" },
            { name: "Ondo", share: 10.6, color: "#E67E22" },
            { name: "Ekiti", share: 5.7, color: "#3498DB" },
        ],
    },
    {
        name: "North West",
        states: [
            { name: "Jigawa", share: 15.3, color: "#1ABC9C" },
            { name: "Kano", share: 15.8, color: "#3B5998" },
            { name: "Katsina", share: 15.2, color: "#E74C3C" },
            { name: "Kaduna", share: 17.4, color: "#E67E22" },
            { name: "Kebbi", share: 12.7, color: "#7F8C8D" },
            { name: "Sokoto", share: 11.6, color: "#9B59B6" },
            { name: "Zamfara", share: 12.0, color: "#2ECC71" },
        ],
    },
    {
        name: "South South",
        states: [
            { name: "Akwa Ibom", share: 19.0, color: "#3B5998" },
            { name: "Bayelsa", share: 13.9, color: "#9B59B6" },
            { name: "Cross River", share: 10.7, color: "#2ECC71" },
            { name: "Delta", share: 19.5, color: "#E67E22" },
            { name: "Edo", share: 13.4, color: "#7F8C8D" },
            { name: "Rivers", share: 23.4, color: "#9B59B6" },
        ],
    },
    {
        name: "North Central",
        states: [
            { name: "Benue", share: 13.2, color: "#3498DB" },
            { name: "Kogi", share: 14.0, color: "#E74C3C" },
            { name: "Kwara", share: 14.1, color: "#27AE60" },
            { name: "Nasarawa", share: 9.2, color: "#E67E22" },
            { name: "Niger", share: 37.5, color: "#3B5998" },
            { name: "Plateau", share: 12.0, color: "#9B59B6" },
        ],
    },
    {
        name: "North East",
        states: [
            { name: "Adamawa", share: 18.1, color: "#3498DB" },
            { name: "Bauchi", share: 17.4, color: "#3B5998" },
            { name: "Borno", share: 22.9, color: "#7F8C8D" },
            { name: "Gombe", share: 13.7, color: "#E67E22" },
            { name: "Taraba", share: 16.0, color: "#27AE60" },
            { name: "Yobe", share: 11.9, color: "#9B59B6" },
        ],
    },
    {
        name: "South East",
        states: [
            { name: "Abia", share: 21.0, color: "#3498DB" },
            { name: "Anambra", share: 17.0, color: "#9B59B6" },
            { name: "Ebonyi", share: 12.4, color: "#E67E22" },
            { name: "Enugu", share: 27.1, color: "#E74C3C" },
            { name: "Imo", share: 22.5, color: "#7F8C8D" },
        ],
    },
];

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
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svgEl);
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
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svgEl);
        const img = new Image();
        const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = svgEl.viewBox.baseVal.width * 2;
            canvas.height = svgEl.viewBox.baseVal.height * 2;
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
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svgEl);
        const img = new Image();
        const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = svgEl.viewBox.baseVal.width * 2;
            canvas.height = svgEl.viewBox.baseVal.height * 2;
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
        // Simple TSV masquerading as XLS — opens in Excel
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
    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    const R = 80;

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
                <h3 className="text-[15px] font-bold text-[#111]">{zone.name}</h3>
                <DownloadMenu zone={zone} svgRef={svgRef} />
            </div>
            <svg ref={svgRef} width={size + 140} height={size + 80} viewBox={`-70 -40 ${size + 140} ${size + 80}`}>
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
                                        fontSize="8.5"
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
            <p className="text-[10px] text-[#aaa]">Source: NGF Public Finance Database</p>
        </div>
    );
}

const GeoZone = ({ year = 2025 }) => {

    return (
        <section className="bg-[#f8faf8] py-6 px-6">
            <div className="mx-auto">
                <div className="flex items-start justify-between mb-6">
                    <h2 className="text-[15px] font-normal text-[#1D9E75]">
                        Share of Total Expenditure by Geopolitical Zone,{" "}
                        <span className="font-medium">
                            Original Budget
                        </span>,  {year}
                    </h2>
                    <a href="/nigeria-state-budget" className="text-[13px] text-[#1D9E75] hover:underline font-medium whitespace-nowrap">
                        See all States
                    </a>
                </div>

                <div className="bg-white rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                        {GEO_ZONES.map((zone) => (
                            <div key={zone.name} className="p-6 flex justify-center">
                                <PieChart zone={zone} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeoZone;