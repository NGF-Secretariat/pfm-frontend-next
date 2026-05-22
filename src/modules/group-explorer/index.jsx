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

const GroupExplorer = () => {
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
  const states = nextSearchParams.get("states") || "";

  const [budgets, setBudgets] = React.useState(initialValues);
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [isMenu, setIsMenu] = React.useState(null);

  const queries = { year, type, states };

  return (
    <div>
      <div className="px-8">
        <div className="flex items-center justify-between flex-nowrap gap-3">
          {/* Title */}
          <div className="pt-4">
            <h4 className="text-[32px] font-poppins py-12">
              Compare State Expenditure
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
          data={budgets}
          componentRef={printRef}
          categories={categories}
        />
        <Preloader data={budgets} isLoading={isLoading} />
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
    if (states.split(",").filter(Boolean).length < 2) {
      toast.error('"States" cannot be less than 2');
      throw new Error('"States" cannot be less than 2');
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
    updateQueryParam(name, value);

    if (name === "type") {
      setCategories([]);
      setBudgets({ data: [], states: [] });
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
