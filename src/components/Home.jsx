"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { NigeriaStatesChoropleth } from "./nigeria-choropleth-kit/NigeriaStatesChoropleth";
import {
  EXPENDITURE_LEGEND,
  expenditureBillionsToColor,
  formatBillionsLabel,
  stateApiNameToSlug,
} from "../lib/budget/transformers";
import budgetService from "../service/budgetService";

const HomePage = () => {
  const router = useRouter();

  const [loadingMap, setLoadingMap] = useState(true);
  const [error, setError] = useState(null);
  const [stateExpenditureBySlug, setStateExpenditureBySlug] = useState({});
  const [currentYear, setCurrentYear] = useState("");
  const [mapHeight, setMapHeight] = useState(520);

  useEffect(() => {
    const handleResize = () => {
      setMapHeight(window.innerWidth < 640 ? 320 : 520);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        setLoadingMap(true);
        const response = await budgetService.mapdata();
        const result = response?.data ?? [];

        const map = {};
        let year = "";
        for (const item of result) {
          if (item.year) year = item.year;
          const slug = stateApiNameToSlug(item.stateName);
          if (slug && item.amount !== null && item.amount !== undefined) {
            const amt = Number(item.amount);
            map[slug] = amt > 1000000 ? amt / 1e9 : amt;
          }
        }

        if (!cancelled) {
          setStateExpenditureBySlug(map);
          setCurrentYear(year);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.response?.data?.message || err?.message || "Could not load map data");
        }
      } finally {
        if (!cancelled) setLoadingMap(false);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, []);

  const mapValueForState = useCallback(
    (slug) => stateExpenditureBySlug[slug],
    [stateExpenditureBySlug]
  );

  const hasMapData = useMemo(
    () => Object.keys(stateExpenditureBySlug).length > 0,
    [stateExpenditureBySlug]
  );

  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-5 min-w-0">
            <p className="text-xl sm:text-2xl font-bold leading-relaxed text-[#1D9E75]">
              This is an open-access database of the fiscal data of the 36 State governments of Nigeria.

            </p>
            <p className="leading-relaxed text-gray-600">
              The portal hosts comparable annual data on government revenue, expenditure, and financing. It also features performance indicators that measure the quality of public spending and the intersection of public financial management and service delivery.

            </p>
            <p className="leading-relaxed text-gray-600">
              All published data are sourced from State government budget documents and audited financial statements and presented in line with the National Chart of Accounts (NCOA).
            </p>
          </div>

          <div className="w-full min-w-0 flex flex-col gap-4">
            <div className="w-full relative bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6" style={{ minHeight: mapHeight + 60 }}>
              {loadingMap ? (
                <div className="grid place-items-center text-sm text-gray-500" style={{ height: mapHeight }}>
                  Loading state expenditure…
                </div>
              ) : error ? (
                <div className="grid place-items-center px-6 text-center text-sm text-red-600" style={{ height: mapHeight }}>
                  {error}
                </div>
              ) : !hasMapData ? (
                <div className="grid place-items-center px-6 text-center text-sm text-gray-500" style={{ height: mapHeight }}>
                  No budget data available.
                </div>
              ) : (
                <NigeriaStatesChoropleth
                  height={mapHeight}
                  valueLabel={currentYear ? `Expenditure (${currentYear})` : "Expenditure"}
                  valueForState={mapValueForState}
                  colorScale={expenditureBillionsToColor}
                  formatValue={formatBillionsLabel}
                  onSelect={(slug) => router.push(`/state-explorer/${slug}`)}
                />
              )}

              <div className="sm:absolute sm:bottom-3 sm:right-3 w-full sm:w-52 mt-4 sm:mt-0 bg-white/95 backdrop-blur rounded-xl border border-gray-100 shadow-md p-3 z-10">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">
                  Legend (Billions ₦)
                </h3>
                <div className="space-y-2">
                  {EXPENDITURE_LEGEND.map((item) => (
                    <div key={item.label} className="flex items-start gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded border border-black/10 shrink-0 mt-0.5"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[11px] leading-snug text-gray-600">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
