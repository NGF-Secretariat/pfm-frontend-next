"use client"

import { useState, useEffect } from "react";
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

const Distribution = () => {
  const [list, setList] = useState([]);
  const [sectorTotal, setSectorTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="min-w-0 pr-0 md:pr-4">
            <p className="text-xl sm:text-2xl font-bold tracking-wide text-[#1D9E75] uppercase mb-2.5 leading-snug">
              Explore Comparative data of states
            </p>
            <h2 className="text-base font-bold leading-relaxed text-[#143D2E] mb-3">
              Users can run selected queries across multiple states and budget performance indicators
            </h2>
            <button className="py-2 px-8 text-white bg-green-600 text-lg font-bold rounded-md cursor-pointer hover:bg-green-700"
              onClick={() =>
                router.push('/group-explorer')
              }> Run Comparison</button>
          </div>

          <div className="min-w-0 w-full pl-0 md:pl-2 lg:pl-4">
            <div className="mt-5 mb-5 px-4 py-3 bg-[#f8faf8] rounded-lg border border-[#e8ede8]">
              <p className="text-[13px] text-[#888] leading-relaxed">Distribution of total expenditure by sector, original budget 2026</p>
            </div>
            {loading ? (
              <p className="text-sm text-gray-500">Loading sector distribution…</p>
            ) : list.length ? (
              <DonutChart data={list} total={sectorTotal} />
            ) : (
              <p className="text-sm text-gray-500">No sector data available for this selection.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function DonutChart({ data, total }) {
  const [hovered, setHovered] = useState(null);
  const size = 350;
  const cx = size / 2;
  const cy = size / 2;
  const R = 120;
  const r = 70; // Inner radius to create the donut hole

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
    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-4">
      <div className="flex-shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet" className="block max-w-[350px]">
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
          <text x={cx} y={cy + 15} textAnchor="middle" fontSize="11" fill="#666" fontFamily="sans-serif">{formatN(total)}</text>
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
                  <span className="text-gray-900 font-medium">{formatN(s.value)}</span>
                  <span className="text-gray-500 text-[11px]">{percent}%</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function formatN(value) {
  return "N" + Number(value || 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default Distribution
