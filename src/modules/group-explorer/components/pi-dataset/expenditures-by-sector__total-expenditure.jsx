import React from "react";
import { BUDGET_CATEGORIES__PI } from "../../../../static/budget-categories";

const initialValues = ["expenditure_by_sector_percentage_total_expenditure"];
const ExpendituresBySectorTotalExpenditure = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES__PI[11].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "expenditure_by_sector_percentage_total_expenditure";
  if (!filterCategories?.length) return null;
  return (
    <React.Fragment>
      <tr>
        <td className="sticky-left text-underline fw-semibold">
          Expenditure by Sector (% of Total Expenditure)
        </td>
        {data?.map((_, index) => (
          <td className="text-end" key={index} />
        ))}
      </tr>
      <AppTableCell
        titleClass=""
        title="Administration Sector Total Expenditure (% of Total Expenditure)"
        values={data.map((item) => item[name]?.admin_sector_total_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Economic Sector Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.economic_sector_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Law and Justice Sector Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.law_justice_sector_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Regional Sector Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.regional_sector_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Social Sector Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.social_sector_sector_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
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

function AppTableCell({ title, isFixed, values, titleClass, isVisible }) {
  if (!isVisible) return null;
  return (
    <tr>
      <td className={["sticky-left", titleClass].join(" ")}>{title}</td>
      {values?.map((item, index) => (
        <td className="text-end" key={index}>
          {numberWithPercent(item, isFixed)}
        </td>
      ))}
    </tr>
  );
}

function numberWithPercent(x, isFixed) {
  if (isFixed) {
    if (isNaN(x)) return Number(0).toLocaleString();
    else
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(x);
  } else {
    if (isNaN(x)) return `${0}%`;
    else return `${Number(x * 100).toFixed(2)}%`;
  }
}

export default ExpendituresBySectorTotalExpenditure;
