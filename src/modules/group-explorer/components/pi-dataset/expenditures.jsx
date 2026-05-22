import React from "react";
import { BUDGET_CATEGORIES__PI } from "../../../../static/budget-categories";

const initialValues = ["expenditure"];
const Expenditures = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES__PI[6].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "expenditure";
  if (!filterCategories?.length) return null;
  return (
    <React.Fragment>
      <tr>
        <td className="sticky-left text-underline fw-semibold">Expenditure</td>
        {data?.map((_, index) => (
          <td className="text-end" key={index} />
        ))}
      </tr>
      <AppTableCell
        isFixed
        titleClass="fw-semibold"
        title="Total Expenditure"
        values={data.map((item) => item[name]?.total_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        isFixed
        title="Recurrent Expenditure"
        values={data.map((item) => item[name]?.recurrent_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        isFixed
        title="Capital Expenditure"
        values={data.map((item) => item[name]?.capital_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Recurrent Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.recurrent_expenditure_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Capital Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.capital_expenditure_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Recurrent Expenditure (% of Total Revenue)"
        values={data.map(
          (item) => item[name]?.recurrent_expenditure_total_revenue
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Capital Expenditure (% of Total Revenue)"
        values={data.map(
          (item) => item[name]?.capital_expenditure_total_revenue
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Recurrent Revenue (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.recurrent_revenue_total_expenditure
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

export default Expenditures;
