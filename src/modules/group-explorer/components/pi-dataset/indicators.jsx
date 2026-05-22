import React from "react";
import { BUDGET_CATEGORIES__PI } from "../../../../static/budget-categories";

const initialValues = ["indicators"];
const Indicators = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES__PI[1].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "indicators";
  if (!filterCategories?.length) return null;
  return (
    <React.Fragment>
      <AppTableCell
        titleClass=""
        title="Budget Performance (%)"
        values={data.map((item) => item[name]?.budget_performance)}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Total Revenue Performance (exluding opening balance) (%)"
        values={data.map(
          (item) =>
            item[name]?.total_revenue_performance_excluding_opening_balance
        )}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Recurrent Revenue Performance (%)"
        values={data.map((item) => item[name]?.recurrent_revenue_performance)}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Federation Revenue Performance (%)"
        values={data.map((item) => item[name]?.federation_revenue_performance)}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="IGR Performance (%)"
        values={data.map((item) => item[name]?.igr_performance)}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Aids and Grants Performance (%)"
        values={data.map((item) => item[name]?.aids_grant_performance)}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Capital Receipts (Capital Development Fund) Performance (%)"
        values={data.map(
          (item) => item[name]?.capital_reciepts_cdf_performance
        )}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Personnel Expenditure Performance"
        values={data.map(
          (item) => item[name]?.personnel_expenditure_performance
        )}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Other Recurrent Expenditure Performance (%)"
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure_performance
        )}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Capital Expenditure Performance (%)"
        values={data.map((item) => item[name]?.capital_expenditure_performance)}
        isVisible={filterCategories.includes("indicators")}
      />
      <AppTableCell
        titleClass=""
        title="Total Expenditure Performance (%)"
        values={data.map((item) => item[name]?.total_expenditure_performance)}
        isVisible={filterCategories.includes("indicators")}
      />
    </React.Fragment>
  );

  function getAllCategories(BUDGET_CATEGORIES) {
    let result = [];
    BUDGET_CATEGORIES.forEach((c) => {
      result.push(c.value);
      const children = c.children;
      if (children.length) {
        result = [...result, ...getAllCategories(children)];
      }
    });
    return [...new Set(result)];
  }
};

function AppTableCell({ title, code, values, titleClass, isVisible }) {
  if (!isVisible) return null;
  return (
    <tr>
      <td className={["sticky-left", titleClass].join(" ")}>{title}</td>
      {values?.map((item, index) => (
        <td className="text-end" key={index}>
          {numberWithPercent(item)}
        </td>
      ))}
    </tr>
  );
}

function numberWithPercent(x) {
  if (isNaN(x)) return `0%`;
  return `${Number(x * 100).toFixed(2)}%`;
}

export default Indicators;
