'use client'

import { Box } from "@mui/material";
import SignUpUpdate from "../components/SignupUpdate";
import Budget from "../components/Budget";
import Distribution from "../components/Distribution";
import GeoZone from "../components/GeoZone";
import ExpenditureCharts from "../components/Actual";
import HomePage from "../components/Home";
import { useHomeDashboard } from "../hooks/useHomeDashboard";

export default function Home() {
  const {
    chartMode,
    setChartMode,
  } = useHomeDashboard({ defaultType: "actual" });

  return (
    <Box className="flex flex-col gap-8 py-6 sm:py-8">
      <HomePage />
      <ExpenditureCharts
        mode={chartMode}
        onModeChange={setChartMode}
      />
      <GeoZone />
      <Distribution />
      <Budget />
      <SignUpUpdate />
    </Box>
  );
}
