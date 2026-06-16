import { normalizeStateName } from "../../components/nigeria-choropleth-kit/slugs";

/** @typedef {{ message: string, data: { result: unknown[] } | null, success: boolean }} ApiEnvelope */

/**
 * @param {unknown} field
 * @returns {number}
 */
export function extractBudgetValue(field) {
  if (field == null) return 0;
  if (typeof field === "number" && Number.isFinite(field)) return field;
  if (typeof field === "object") {
    const obj = /** @type {Record<string, unknown>} */ (field);
    if (typeof obj.value === "number" && Number.isFinite(obj.value)) {
      return obj.value;
    }
    if (obj.default && typeof obj.default === "object") {
      return extractBudgetValue(obj.default);
    }
  }
  return 0;
}

/**
 * Backend state codes (e.g. Cross_River, AKWA_IBOM) → map slug.
 * @param {string} apiState
 */
export function stateApiNameToSlug(apiState) {
  if (!apiState) return "";
  const key = apiState.trim().toUpperCase().replace(/\s+/g, "_");
  const overrides = {
    FCT: "fct",
    FCT_ABUJA: "fct",
    ABUJA: "fct",
    AKWA_IBOM: "akwa-ibom",
    CROSS_RIVER: "cross-river",
    NASARAWA: "nasarawa",
    NASSARAWA: "nasarawa",
  };
  if (overrides[key]) return overrides[key];
  return key.toLowerCase().replace(/_/g, "-");
}

/**
 * @param {string} displayName
 */
export function displayNameToApiState(displayName) {
  return displayName.trim().split(/\s+/).join("_").toUpperCase();
}

/**
 * Normalize raw `/budget/fetch` rows (single state object or nested array).
 * @param {unknown[]} result
 */
export function normalizeBudgetRows(result) {
  if (!Array.isArray(result)) return [];
  return result
    .map((item) => {
      if (Array.isArray(item)) return item[0] ?? null;
      if (item && typeof item === "object" && "revenue_by_economuc" in item) {
        return item;
      }
      return null;
    })
    .filter(Boolean);
}

/**
 * @param {ReturnType<typeof normalizeBudgetRows>} rows
 * @returns {Record<string, number>} slug → expenditure in billions ₦
 */
export function buildStateExpenditureMap(rows) {
  /** @type {Record<string, number>} */
  const map = {};
  for (const row of rows) {
    const apiState = row.revenue_by_economuc?.state;
    const slug = stateApiNameToSlug(apiState);
    if (!slug) continue;
    const expRow = Array.isArray(row.exp_by_economic)
      ? row.exp_by_economic[0]
      : row.exp_by_economic;
    const naira = extractBudgetValue(expRow?.total_expenditure);
    map[slug] = naira / 1e9;
  }
  return map;
}

/**
 * Choropleth fill by expenditure (billions ₦).
 * @param {number} billions
 */
export function expenditureBillionsToColor(billions) {
  if (billions >= 500) return "#064e3b";
  if (billions >= 200) return "#059669";
  if (billions >= 100) return "#34d399";
  return "#a7f3d0";
}

export const EXPENDITURE_LEGEND = [
  { label: "500 billion and above", color: "#064e3b", min: 500 },
  { label: "200 billion to 499 billion", color: "#059669", min: 200 },
  { label: "100 billion to 199 billion", color: "#34d399", min: 100 },
  { label: "99 billion and below", color: "#a7f3d0", min: 0 },
];

/**
 * @param {ReturnType<typeof normalizeBudgetRows>} rows
 */
export function aggregateNationalTotals(rows) {
  let expenditureNaira = 0;
  let revenueNaira = 0;
  for (const row of rows) {
    const expRow = Array.isArray(row.exp_by_economic)
      ? row.exp_by_economic[0]
      : row.exp_by_economic;
    expenditureNaira += extractBudgetValue(expRow?.total_expenditure);
    revenueNaira += extractBudgetValue(row.revenue_by_economuc?.total_revenue);
  }
  return {
    expenditureTrillions: expenditureNaira / 1e12,
    revenueTrillions: revenueNaira / 1e12,
  };
}

const SECTOR_DEFINITIONS = [
  { name: "Economic Affairs", keys: ["economic_affairs"], color: "#4ade80" },
  { name: "Education", keys: ["education"], color: "#86efac" },
  {
    name: "Environmental Protection",
    keys: ["evironmental_protection", "environmental_protection"],
    color: "#bbf7d0",
  },
  { name: "General Public Service", keys: ["general_public_service"], color: "#166534" },
  { name: "Health", keys: ["health"], color: "#15803d" },
  {
    name: "Housing and Community Amenities",
    keys: ["housing_community_amenities"],
    color: "#16a34a",
  },
  { name: "Public Order & Safety", keys: ["public_order_safety"], color: "#22c55e" },
  {
    name: "Recreation and Culture",
    keys: ["recreation_culture_religon", "recreation_culture_religion"],
    color: "#1D9E75",
  },
  { name: "Social Protection", keys: ["social_protection"], color: "#6ee7b7" },
];

/**
 * @param {ReturnType<typeof normalizeBudgetRows>} rows
 */
export function aggregateSectorExpenditure(rows) {
  /** @type {Record<string, number>} */
  const totals = {};
  for (const def of SECTOR_DEFINITIONS) {
    totals[def.name] = 0;
  }

  for (const row of rows) {
    const recurrent = Array.isArray(row.exp_by_func_recurrent)
      ? row.exp_by_func_recurrent[0]
      : row.exp_by_func_recurrent;
    const capital = Array.isArray(row.exp_by_func_capital)
      ? row.exp_by_func_capital[0]
      : row.exp_by_func_capital;

    for (const def of SECTOR_DEFINITIONS) {
      let sum = 0;
      for (const key of def.keys) {
        if (recurrent?.[key]) sum += extractBudgetValue(recurrent[key]);
        if (capital?.[key]) sum += extractBudgetValue(capital[key]);
      }
      totals[def.name] += sum;
    }
  }

  return SECTOR_DEFINITIONS.map((def) => ({
    name: def.name,
    value: totals[def.name],
    color: def.color,
  })).filter((s) => s.value > 0);
}

/**
 * @param {number} valueNaira
 */
export function formatNaira(valueNaira) {
  if (!Number.isFinite(valueNaira)) return "N0.00";
  return (
    "₦" +
    valueNaira.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * @param {number} billions
 */
export function formatBillionsLabel(billions) {
  if (!Number.isFinite(billions)) return "—";
  return `${billions.toLocaleString("en-NG", { maximumFractionDigits: 1 })} B`;
}

/**
 * GeoJSON feature name → slug (for validation).
 * @param {string} name
 */
export function geoNameToSlug(name) {
  return normalizeStateName(name);
}
