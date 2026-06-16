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

function BarChart({ mode, data }) {
  const chartRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const w = 560, h = 340, pl = 58, pr = 20, pt = 20, pb = 50;
  const chartW = w - pl - pr, chartH = h - pt - pb;
  
  if (!data.years || data.years.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#e8e8e8] p-5 flex items-center justify-center h-[340px]">
        <span className="text-gray-500">No data available</span>
      </div>
    );
  }

  const maxVal = Math.max(30, ...data.expenditure);
  const n = data.years.length;
  const barW = (chartW / n) * 0.55;
  const gap = chartW / n;
  const gridLines = [0, 5, 10, 15, 20, 25, 30];

  const bx = (i) => pl + i * gap + gap / 2 - barW / 2;
  const by = (v) => pt + chartH - (v / maxVal) * chartH;
  const bh = (v) => (v / maxVal) * chartH;

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e8] p-5">
      <h3 className="text-[15px] font-bold text-[#111] mb-4">Total Expenditure for the 36 States</h3>
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
  
  if (!data.years || data.years.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#e8e8e8] p-5 flex items-center justify-center h-[340px]">
        <span className="text-gray-500">No data available</span>
      </div>
    );
  }

  const minVal = 0;
  const maxVal = Math.max(30, ...data.expenditure, ...data.revenue);
  const range = Math.max(1, maxVal - minVal);
  const gridLines = [5, 10, 15, 20, 25, 30];
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
      <h3 className="text-[15px] font-bold text-[#111] mb-4">Total Revenue and Expenditure for the 36 States</h3>
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
