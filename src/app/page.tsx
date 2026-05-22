'use client'

import { Box, Slider, Typography } from "@mui/material";
import { NigeriaStatesChoropleth } from "../components/nigeria-choropleth-kit/NigeriaStatesChoropleth";
import { toast } from "react-toastify";
import SignUpUpdate from "../components/SignupUpdate";
import Budget from "../components/Budget";
import Distribution from "../components/Distribution";
import GeoZone from "../components/GeoZone";

export default function Home() {

  const DEMO_SCORES: Record<string, number> = {
    lagos: 650,   // 500+
    kano: 350,    // 200 - 499
    fct: 150,     // 100 - 199
    rivers: 80,   // < 100
  };

  const getMapColor = (val: number) => {
    if (val >= 500) return "#064e3b"; // Dark green
    if (val >= 200) return "#059669"; // Medium-dark green
    if (val >= 100) return "#34d399"; // Medium-light green
    return "#a7f3d0"; // Light green
  };

  const legendItems = [
    { label: "500 billion and above", color: "#064e3b" },
    { label: "200 billion to 499 billion", color: "#059669" },
    { label: "100 billion to 199 billion", color: "#34d399" },
    { label: "99 billion and below", color: "#a7f3d0" },
  ];

  return (
    <Box className="flex flex-col gap-5 py-5 ">
      <div className="flex flex-col md:flex-row gap-2 px-2 sm:px-4 lg:px-8">
        <div className="font-bubblegum w-1/2">
          <Typography >This is an open source database of the fiscal data of the 36 state governments of Nigeria.</Typography>
          <Typography>The portal hosts comparable annual data on government spending, revenues, and financing. It also features hundreds of performance indicators that measure the quality of public spending and the intersection of public financial management and service delivery.</Typography>
          <Typography>All data published are sourced from State government budget documents and audited financial statements, and presented in line with the National Chart of Accounts (NCOA).</Typography>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <NigeriaStatesChoropleth
            height={520}
            valueLabel="2023 Actual (Billions ₦)"
            valueForState={(slug) => DEMO_SCORES[slug] ?? 80}
            colorScale={getMapColor}
            onSelect={(slug, info) => console.log(slug, info)}
            onHover={(slug, info) => {
              /* slug null on mouse leave */
            }}
          />

          {/* Map Legend */}
          <div className="flex flex-col gap-2 mt-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm ml-auto">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded shadow-sm border border-black/10" style={{ backgroundColor: item.color }} />
                <Typography className="text-sm font-medium text-gray-600">{item.label}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GeoZone />
      <Distribution />
      <Budget />
      <SignUpUpdate />
    </Box>
  )
}
