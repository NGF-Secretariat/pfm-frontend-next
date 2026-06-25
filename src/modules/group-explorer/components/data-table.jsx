import React from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
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

  const containerRef = React.useRef(null);
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(false);
  const [showUp, setShowUp] = React.useState(false);
  const [showDown, setShowDown] = React.useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 5);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    setShowUp(el.scrollTop > 5);
    setShowDown(el.scrollTop < el.scrollHeight - el.clientHeight - 5);
  };

  React.useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      // Run initially
      checkScroll();
      
      const observer = new ResizeObserver(checkScroll);
      observer.observe(el);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        observer.disconnect();
      };
    }
  }, [payload]);

  if (!payload?.length) return null;

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };
  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollDown = () => {
    containerRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };
  const scrollUp = () => {
    containerRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  };

  return (
    <div className="relative w-full mt-10 group/table">
      {/* Scroll Left Button */}
      {showLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#016630] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center border border-gray-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Scroll Right Button */}
      {showRight && (
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#016630] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center border border-gray-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Scroll Up & Down Buttons Below */}
      {(showUp || showDown) && (
        <div className="absolute right-6 bottom-16 z-20 flex flex-col gap-2">
          {showUp && (
            <button
              onClick={scrollUp}
              className="w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#016630] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center border border-gray-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Scroll Up"
            >
              <ChevronUp size={24} />
            </button>
          )}
          {showDown && (
            <button
              onClick={scrollDown}
              className="w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#016630] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center border border-gray-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Scroll Down"
            >
              <ChevronDown size={24} />
            </button>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        className="max-h-[600px] overflow-auto w-full border border-gray-100 rounded-3xl shadow-sm bg-white"
      >
        {type === "pi" ? (
          <table ref={componentRef} id="data-table" className="data-table pi-table">
            <thead className="thead">
              <tr className="sticky-top">
                <th align="left" className="sticky-left">
                  Indicators
                </th>
                {states?.map((item, index) => (
                  <th className="text-center text-nowrap" key={index}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Indicators data={payload} categories={categories} />
              <RevenuesTotalRevenue data={payload} categories={categories} />
              <RevenuesTotalExpenditure data={payload} categories={categories} />
              <ExpendituresTotalRevenue data={payload} categories={categories} />
              <ExpendituresTotalExpenditure data={payload} categories={categories} />
              <Expenditures data={payload} categories={categories} />
              <ExpendituresMDA data={payload} categories={categories} />
              <ExpendituresMDATotalExpenditure data={payload} categories={categories} />
              <ExpendituresMDATotalRevenue data={payload} categories={categories} />
              <ExpendituresBySector data={payload} categories={categories} />
              <ExpendituresBySectorTotalExpenditure data={payload} categories={categories} />
              <ExpendituresBySectorTotalRevenue data={payload} categories={categories} />
              <ExpendituresByFunction data={payload} categories={categories} />
              <ExpendituresByFunctionTotalExpenditure data={payload} categories={categories} />
              <ExpendituresByFunctionTotalRevenue data={payload} categories={categories} />
              <ExpenditureByProgramme data={payload} categories={categories} />
              <ExpenditureByProgrammeTotalExpenditure data={payload} categories={categories} />
              <ExpenditureByProgrammeTotalRevenue data={payload} categories={categories} />
            </tbody>
          </table>
        ) : (
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
                {states?.map((item, index) => (
                  <th className="text-center" key={index}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <RevenueByEconomic data={payload} categories={categories} />
              <ExpenditureByEconomic data={payload} categories={categories} />
              <ExpenditureByAdminRecurrent data={payload} categories={categories} />
              <ExpenditureByAdminCapital data={payload} categories={categories} />
              <ExpenditureByFunctionRecurrent data={payload} categories={categories} />
              <ExpenditureByFunctionCapital data={payload} categories={categories} />
              <ExpenditureByProgrammeRecurrent data={payload} categories={categories} />
              <ExpenditureByProgrammeCapital data={payload} categories={categories} />
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-end py-4">
        <span className="text-[#888] font-light text-xs">
          <span className="italic">Source:</span> NGF Public Finance Database
        </span>
      </div>
    </div>
  );
};

export default DataTable;
