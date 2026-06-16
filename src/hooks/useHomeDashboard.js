"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import budgetService from "../service/budgetService";
import httpService from "../service/httpService";
import {
  stateApiNameToSlug,
} from "../lib/budget/transformers";

const emptyTimeSeries = () => ({
  years: [],
  original: { expenditure: [], revenue: [] },
  actual: { expenditure: [], revenue: [] },
});

/**
 * @param {{ defaultYear?: string, defaultType?: 'original' | 'actual' }} [options]
 */
export function useHomeDashboard(options = {}) {
  const defaultType = options.defaultType ?? "actual";

  const [year, setYear] = useState("");
  const [budgetType, setBudgetType] = useState(defaultType);
  const [chartMode, setChartMode] = useState(defaultType);

  // All available year+type options from the backend
  const [yearOptions, setYearOptions] = useState([]);

  // Prevents the reactive effect from re-fetching data already loaded by bootstrap
  const bootstrapDone = useRef(false);

  const [stateExpenditureBySlug, setStateExpenditureBySlug] = useState({});
  const [sectorBreakdown, setSectorBreakdown] = useState([]);
  const [sectorTotal, setSectorTotal] = useState(0);
  const [timeSeries, setTimeSeries] = useState(emptyTimeSeries);

  const [loadingMap, setLoadingMap] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [error, setError] = useState(null);

  // ── Bootstrap: mock or fetch non-map data ──
  useEffect(() => {
    let cancelled = false;

    async function bootstrapHome() {
      setLoadingCharts(true);
      setError(null);
      try {
        bootstrapDone.current = true;
        
        // Assuming 2024 as default for now
        setYear("2024");
        setBudgetType("actual");
        setChartMode("actual");

        setSectorBreakdown([]);
        setSectorTotal(0);
        setTimeSeries(emptyTimeSeries());
        
      } catch (err) {
        if (!cancelled) {
          httpService.showFeedback(err);
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Could not load data",
          );
          setSectorBreakdown([]);
          setSectorTotal(0);
          setTimeSeries(emptyTimeSeries());
        }
      } finally {
        if (!cancelled) {
          setLoadingCharts(false);
        }
      }
    }

    bootstrapHome();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Reactive: reload charts whenever year or budgetType changes (after bootstrap) ──
  useEffect(() => {
    if (!bootstrapDone.current || !year) return;
    let cancelled = false;

    async function reloadSnapshot() {
      setError(null);
      try {
        if (cancelled) return;

        setSectorBreakdown([]);
        setSectorTotal(0);

        setTimeSeries({
          years: [Number(year)],
          original: { expenditure: [], revenue: [] },
          actual: {
            expenditure: [0],
            revenue: [0],
          },
        });
      } catch (err) {
        if (!cancelled) {
          httpService.showFeedback(err);
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Could not load data",
          );
          setSectorBreakdown([]);
          setSectorTotal(0);
        }
      }
    }

    reloadSnapshot();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, budgetType]);

  const mapValueForState = useCallback(
    (slug) => stateExpenditureBySlug[slug] ?? 0,
    [stateExpenditureBySlug],
  );

  const hasMapData = useMemo(
    () => Object.keys(stateExpenditureBySlug).length > 0,
    [stateExpenditureBySlug],
  );

  return {
    year,
    setYear,
    budgetType,
    setBudgetType,
    chartMode,
    setChartMode,
    yearOptions,
    stateExpenditureBySlug,
    mapValueForState,
    sectorBreakdown,
    sectorTotal,
    timeSeries,
    loadingMap,
    loadingCharts,
    error,
    hasMapData,
    chartYears: year ? [Number(year)] : [],
  };
}
