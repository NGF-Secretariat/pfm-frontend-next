"use client";

import React from "react";
import budgetService from "../../service/budgetService";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { BUDGET_TYPES } from "../../static/budget-types";
import { YEARS } from "../../static/years";
import { STATES } from "../../static/states";
import { BUDGET_CATEGORIES, BUDGET_CATEGORIES__PI } from "../../static/budget-categories";
import CategorySelect from "./components/category-select";
import DataTable from "./components/data-table";
import { Print, Save } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import Preloader from "../../components/preloader";
import httpService from "../../service/httpService";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const initialValues = {
  data: [],
  states: [],
};

function getFlatCategories(type) {
  const CATEGORIES = type === "pi" ? BUDGET_CATEGORIES__PI : BUDGET_CATEGORIES;
  const flatten = (arr) => {
    let res = [];
    arr.forEach((item) => {
      res.push(item.value);
      if (item.children && item.children.length > 0) {
        res = [...res, ...flatten(item.children)];
      }
    });
    return res;
  };
  return flatten(CATEGORIES);
}

const getAmountForRanking = (item, type) => {
  if (type !== 'pi') {
    if (item?.revenue_by_economic?.total_revenue_with_opening_balance !== undefined) {
      const field = item.revenue_by_economic.total_revenue_with_opening_balance;
      const val = parseFloat(typeof field === 'object' && field !== null ? field.value : field);
      if (!isNaN(val)) return val;
    }
    if (item?.exp_by_economic?.total_expenditure !== undefined) {
      const field = item.exp_by_economic.total_expenditure;
      const val = parseFloat(typeof field === 'object' && field !== null ? field.value : field);
      if (!isNaN(val)) return val;
    }
  }
  
  let sum = 0;
  const traverse = (val, key) => {
    if (["year", "code", "id", "state", "status", "createdAt", "updatedAt"].includes(key)) {
      return;
    }
    if (val === null || val === undefined) return;
    
    if (typeof val === "object") {
      if (val.value !== undefined) {
        const parsed = parseFloat(val.value);
        if (!isNaN(parsed)) {
          sum += parsed;
        }
      } else {
        for (let k in val) {
          if (Object.prototype.hasOwnProperty.call(val, k)) {
            traverse(val[k], k);
          }
        }
      }
    } else if (typeof val === "number") {
      sum += val;
    } else if (typeof val === "string") {
      const parsed = parseFloat(val);
      if (!isNaN(parsed) && /^\d+(\.\d+)?$/.test(val.trim())) {
        sum += parsed;
      }
    }
  };
  traverse(item);
  return sum;
};

const GroupExplorer = ({ isRank = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
  const printRef = React.useRef();
  const handlePrint = useReactToPrint({
    contentRef: printRef,

    // onBeforePrint: () => {
    //   toast.info("Preparing document for printing...");
    // },

    // onAfterPrint: () => {
    //   toast.success("Print completed successfully!");
    // },

    // onPrintError: () => {
    //   toast.error("Failed to print document!");
    // },
  });


  const year = nextSearchParams.get("year") || "";
  const type = nextSearchParams.get("type") || "";
  const statesParam = nextSearchParams.get("states") || "";
  const states = statesParam === "all"
    ? STATES.map((item) => item.value).join(",")
    : statesParam;

  const [budgets, setBudgets] = React.useState(initialValues);
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [isMenu, setIsMenu] = React.useState(null);
  const [sortBy, setSortBy] = React.useState(""); // "asc" | "desc" | ""

  const queries = { year, type, states };

  const hasAutoFetched = React.useRef(false);

  React.useEffect(() => {
    const categoriesParam = nextSearchParams.get("categories");
    if (categoriesParam === "all" && type) {
      setCategories(getFlatCategories(type));
    } else if (categoriesParam) {
      setCategories(categoriesParam.split(","));
    } else {
      setCategories([]);
    }
  }, [nextSearchParams, type]);

  React.useEffect(() => {
    if (type && states && year && categories.length > 0 && !hasAutoFetched.current) {
      hasAutoFetched.current = true;
      getBudgets();
    }
  }, [type, states, year, categories.length]);

  const sortedBudgets = React.useMemo(() => {
    if (!sortBy || !budgets.data || !budgets.states || budgets.data.length === 0) {
      return budgets;
    }
    // Zip states and data
    const zipped = budgets.states.map((state, idx) => ({
      state,
      item: budgets.data[idx],
      amount: getAmountForRanking(budgets.data[idx], type)
    }));
    // Sort
    zipped.sort((a, b) => {
      if (sortBy === "asc") {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
    // Unzip
    return {
      states: zipped.map(z => z.state),
      data: zipped.map(z => z.item)
    };
  }, [budgets, sortBy, type]);

  return (
    <div>
      <div className="px-8">
        <div className="flex items-center justify-between flex-nowrap gap-3">
          {/* Title */}
          <div className="pt-4">
            <h4 className="text-[32px] font-poppins py-12">
              {isRank ? "Rank States" : "Compare State Expenditure"}
            </h4>
          </div>

          {/* Actions */}
          <div className="flex gap-2 items-center pt-4">
            <Button
              endIcon={<Save />}
              variant="outlined"
              onClick={(e) => setIsMenu(e.currentTarget)}
              color="success"
            >
              Export
            </Button>

            <div>
              <Button variant="outlined" endIcon={<Print />} onClick={handlePrint}
                color="success">
                Print
              </Button>

              <Menu
                open={!!isMenu}
                anchorEl={isMenu}
                onClose={() => setIsMenu(null)}
              >
                <MenuItem disabled>Export as</MenuItem>
                <MenuItem onClick={() => budgetService.download("data-table", "xlsx")}>
                  Microsoft Excel (.xlsx)
                </MenuItem>
                <MenuItem onClick={() => budgetService.download("data-table", "csv")}>
                  Comma Separated Values (.csv)
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="type_select">Budget Type</InputLabel>
              <Select
                fullWidth
                value={type}
                size="small"
                label="Budget Type"
                variant="outlined"
                labelId="type_select"
                onChange={(e) => handleChange(e, "type")}
              >
                <MenuItem value="" disabled>
                  Budget Type
                </MenuItem>
                {BUDGET_TYPES.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: isRank ? 2 : 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="state_select">States</InputLabel>
              <Select
                size="small"
                fullWidth
                multiple
                label="States"
                labelId="state_select"
                variant="outlined"
                onChange={handleSelectState}
                value={states ? states?.split(",") : []}
                renderValue={(selected) =>
                  selected.map((s) => s.split("_").join(" ")).join(", ")
                }
              >
                <MenuItem value="" disabled>
                  States
                </MenuItem>
                <MenuItem value="">
                  <Checkbox
                    size="small"
                    onChange={handleSelectAllStates}
                    checked={states.split(",").length === STATES.length}
                    indeterminate={
                      states && states.split(",").length !== STATES.length
                    }
                  />
                  Select All
                </MenuItem>
                {STATES.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    <Checkbox
                      size="small"
                      checked={states.split(",").indexOf(item.value) > -1}
                    />
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: isRank ? 2 : 3 }}>
            <CategorySelect
              type={type}
              value={categories}
              onChange={(value) => setCategories(value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="year_select">Year</InputLabel>
              <Select
                fullWidth
                size="small"
                value={year}
                label="Year"
                labelId="year_select"
                variant="outlined"
                onChange={(e) => handleChange(e, "year")}
              >
                <MenuItem value="" disabled>
                  Select Year
                </MenuItem>
                {type === "revised" ? (
                  <MenuItem value="2020">2020</MenuItem>
                ) : (
                  YEARS.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      {item.label}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          {isRank && (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="sort_by_select">Sort By</InputLabel>
                <Select
                  fullWidth
                  size="small"
                  value={sortBy}
                  label="Sort By"
                  labelId="sort_by_select"
                  variant="outlined"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="">
                    None
                  </MenuItem>
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={getBudgets}
              disabled={isLoading}
              endIcon={
                isLoading && (
                  <CircularProgress
                    style={{ color: "#fff", width: "20px", height: "20px" }}
                  />
                )
              }
            >
              Filter
            </Button>
          </Grid>
        </Grid>
        <DataTable
          type={type}
          data={sortedBudgets}
          componentRef={printRef}
          categories={categories}
        />
        <Preloader data={sortedBudgets} isLoading={isLoading} />
      </div>
    </div>
  );

  async function getBudgets() {
    try {
      inputValidator();
      setIsLoading(true);
      const { data } = await budgetService.get(queries);
      setBudgets(budgetService.formatData(data, type) || initialValues);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      httpService.showFeedback(error);
    }
  }

  function inputValidator() {
    if (!type) {
      toast.error('"Budget Type" is not allowed to be empty');
      throw new Error('"Budget Type" is not allowed to be empty');
    }
    if (states.split(",").filter(Boolean).length < 1) {
      toast.error('Please select at least one State');
      throw new Error('Please select at least one State');
    }
    if (!categories.length) {
      toast.error('"Budget Categories" is not allowed to be empty');
      throw new Error('"Budget Categories" is not allowed to be empty');
    }
    if (!year) {
      toast.error('"Year" is not allowed to be empty');
      throw new Error('"Year" is not allowed to be empty');
    }
  }

  function updateQueryParam(name, value) {
    const params = new URLSearchParams(nextSearchParams.toString());
    params.set(name, value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleChange(e, name) {
    const value = e.target.value;

    if (name === "type") {
      const params = new URLSearchParams(nextSearchParams.toString());
      params.set("type", value);
      params.delete("categories");
      router.replace(`${pathname}?${params.toString()}`);

      setCategories([]);
      setBudgets({ data: [], states: [] });
    } else {
      updateQueryParam(name, value);
    }
  }

  function handleSelectState(e) {
    const value = e.target.value?.filter((item) => !!item);
    updateQueryParam("states", value.join(","));
  }

  function handleSelectAllStates(e) {
    try {
      const checked = e.target.checked;
      let value = [];

      if (checked) value = STATES.map((item) => item?.value);

      updateQueryParam("states", value.join(","));
    } catch (error) {
      console.error(error);
    }
  }
};

export default GroupExplorer;
