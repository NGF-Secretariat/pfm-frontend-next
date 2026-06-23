import React from "react";
import RevenueByEconomic from "./datasets/revenue-by-economic";
import { Box } from "@mui/material";
import ExpenditureByEconomic from "./datasets/expenditure-by-economic";
import ExpenditureByAdminRecurrent from "./datasets/expenditure-by-admin__recurrent";
import ExpenditureByAdminCapital from "./datasets/expenditure-by-admin__capital";
import ExpenditureByFunctionRecurrent from "./datasets/expenditure-by-function__recurrent";
import ExpenditureByFunctionCapital from "./datasets/expenditure-by-function__capital";
import Indicators from "./pi-dataset/indicators";
import RevenuesTotalRevenue from "./pi-dataset/revenues__total-revenue";
import RevenuesTotalExpenditure from "./pi-dataset/revenues__total-expenditure";
import ExpendituresTotalRevenue from "./pi-dataset/expenditures__total-revenue";
import ExpendituresTotalExpenditure from "./pi-dataset/expenditures__total-expenditure";
import Expenditures from "./pi-dataset/expenditures";
import ExpendituresMDA from "./pi-dataset/expenditures-mda";
import ExpendituresMDATotalExpenditure from "./pi-dataset/expenditures-mda__total-expenditure";
import ExpendituresMDATotalRevenue from "./pi-dataset/expenditures-mda__total-revenue";
import ExpendituresBySector from "./pi-dataset/expenditures-by-sector";
import ExpendituresBySectorTotalExpenditure from "./pi-dataset/expenditures-by-sector__total-expenditure";
import ExpendituresBySectorTotalRevenue from "./pi-dataset/expenditures-by-sector__total-revenue";
import ExpendituresByFunction from "./pi-dataset/expenditures-by-function";
import ExpendituresByFunctionTotalExpenditure from "./pi-dataset/expenditures-by-function__total-expenditure";
import ExpendituresByFunctionTotalRevenue from "./pi-dataset/expenditures-by-function__total-revenue";
import ExpenditureByProgrammeRecurrent from "./datasets/expenditure-by-programme__recurrent";
import ExpenditureByProgrammeCapital from "./datasets/expenditure-by-programme__capital";
import ExpenditureByProgramme from "./pi-dataset/expenditures-by-programme";
import ExpenditureByProgrammeTotalExpenditure from "./pi-dataset/expenditures-by-programme__total-expenditure";
import ExpenditureByProgrammeTotalRevenue from "./pi-dataset/expenditures-by-programme__total-revenue";

const DataTable = ({ data, type, componentRef, categories = [] }) => {
  const states = data?.states;
  const payload = data?.data;
  if (!payload?.length) return null;
  if (type === "pi")
    return (
      <div className="mt-10 max-h-[600px] overflow-auto w-full" >
        <table ref={componentRef} id="data-table" className="data-table pi-table">
          <thead className="thead">
            <tr className="sticky-top">
              <th align="left" className="sticky-left">
                Indicators
              </th>
              {states?.map((item, index) => {
                return (
                  <th className="text-center text-nowrap" key={index}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <Indicators data={payload} categories={categories} />
            <RevenuesTotalRevenue data={payload} categories={categories} />
            <RevenuesTotalExpenditure data={payload} categories={categories} />
            <ExpendituresTotalRevenue data={payload} categories={categories} />
            <ExpendituresTotalExpenditure
              data={payload}
              categories={categories}
            />
            <Expenditures data={payload} categories={categories} />
            <ExpendituresMDA data={payload} categories={categories} />
            <ExpendituresMDATotalExpenditure
              data={payload}
              categories={categories}
            />
            <ExpendituresMDATotalRevenue
              data={payload}
              categories={categories}
            />
            <ExpendituresBySector data={payload} categories={categories} />
            <ExpendituresBySectorTotalExpenditure
              data={payload}
              categories={categories}
            />
            <ExpendituresBySectorTotalRevenue
              data={payload}
              categories={categories}
            />
            <ExpendituresByFunction data={payload} categories={categories} />
            <ExpendituresByFunctionTotalExpenditure
              data={payload}
              categories={categories}
            />
            <ExpendituresByFunctionTotalRevenue
              data={payload}
              categories={categories}
            />
            <ExpenditureByProgramme data={payload} categories={categories} />
            <ExpenditureByProgrammeTotalExpenditure
              data={payload}
              categories={categories}
            />
            <ExpenditureByProgrammeTotalRevenue
              data={payload}
              categories={categories}
            />
          </tbody>
        </table>
        <div className="flex justify-end py-4">
          <span className="text-[#888] font-light text-xs">
            <span className="italic">Source:</span> NGF Public Finance Database
          </span>
        </div>
      </div>
    );
  return (
    <div className="mt-10 max-h-[600px] overflow-auto w-full" >
      <table ref={componentRef} id="data-table" className="data-table standard-table">
        <thead className="thead">
          <tr className="sticky-top">
            <th align="left" className="sticky-left">
              Code
            </th>
            <th align="left" className="sticky-left">
              {payload[0]?.revenue_by_economic?.type === "actual"
                ? "Actual"
                : payload[0]?.revenue_by_economic?.type === "original"
                  ? "Original Budget"
                  : payload[0]?.revenue_by_economic?.type === "revised"
                    ? "Revised"
                    : "Indicators"}
            </th>
            {states?.map((item, index) => {
              return (
                <th className="text-center" key={index}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <RevenueByEconomic data={payload} categories={categories} />
          <ExpenditureByEconomic data={payload} categories={categories} />
          <ExpenditureByAdminRecurrent data={payload} categories={categories} />
          <ExpenditureByAdminCapital data={payload} categories={categories} />
          <ExpenditureByFunctionRecurrent
            data={payload}
            categories={categories}
          />
          <ExpenditureByFunctionCapital
            data={payload}
            categories={categories}
          />
          <ExpenditureByProgrammeRecurrent
            data={payload}
            categories={categories}
          />
          <ExpenditureByProgrammeCapital
            data={payload}
            categories={categories}
          />
        </tbody>
      </table>
      <div className="flex justify-end py-4">
        <span className="text-[#888] font-light text-xs">
          <span className="italic">Source:</span> NGF Public Finance Database
        </span>
      </div>
    </div>
  );
};

export default DataTable;
