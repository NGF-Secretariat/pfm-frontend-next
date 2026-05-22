import React from "react";
import { BUDGET_CATEGORIES__PI } from "../../../../static/budget-categories";

const initialValues = ["expenditure_by_function_percentage_total_expenditure"];
const ExpendituresByFunctionTotalExpenditure = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES__PI[14].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "expenditure_by_function_percentage_total_expenditure";
  if (!filterCategories?.length) return null;
  return (
    <React.Fragment>
      <tr>
        <td className="sticky-left text-underline fw-semibold">
          Expenditure by Function (% of Total Expenditure)
        </td>
        {data?.map((_, index) => (
          <td className="text-end" key={index} />
        ))}
      </tr>
      <AppTableCell
        titleClass=""
        title="General Public Service Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.general_public_service_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Public Order and Safety Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.public_order_safety_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Economic Affairs Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.economic_affairs_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Environmental Protection Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.environment_protection_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Housing and Community Affairs Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.housing_community_affairs_total_expenditure
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Health Total Expenditure (% of Total Expenditure)"
        values={data.map((item) => item[name]?.health_total_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Recreation and Culture Total Expenditure (% of Total Expenditure)"
        values={data.map((item) => item[name]?.recreation_total_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Education Total Expenditure (% of Total Expenditure)"
        values={data.map((item) => item[name]?.education_total_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Social Protection Total Expenditure (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.social_protection_total_expenditure
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

export default ExpendituresByFunctionTotalExpenditure;
