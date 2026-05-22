import React from "react";
import { BUDGET_CATEGORIES__PI } from "../../../../static/budget-categories";

const initialValues = ["expenditure_by_programme_percentage_total_revenue"];
const ExpenditureByProgrammeTotalRevenue = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES__PI[16].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "expenditure_by_programme_percentage_total_revenue";
  if (!filterCategories?.length) return null;

  return (
    <React.Fragment>
      <tr>
        <td className="sticky-left text-underline fw-semibold">
          Expenditure by Programme (% of Total Revenue)
        </td>
        {data?.map((_, index) => (
          <td className="text-end" key={index} />
        ))}
      </tr>
      <AppTableCell
        titleClass=""
        title="Agriculture (% of Total Revenue)"
        values={data.map((item) => item[name]?.agriculture)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Societal Re-orientation (% of Total Revenue)"
        values={data.map((item) => item[name]?.societal_reorientation)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Poverty Alleviation (% of Total Revenue)"
        values={data.map((item) => item[name]?.poverty_alleviation)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Health (% of Total Revenue)"
        values={data.map((item) => item[name]?.health)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Education (% of Total Revenue)"
        values={data.map((item) => item[name]?.education)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Housing and Urban Development (% of Total Revenue)"
        values={data.map((item) => item[name]?.housing_and_urban_development)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Gender (% of Total Revenue)"
        values={data.map((item) => item[name]?.gender)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Youth (% of Total Revenue)"
        values={data.map((item) => item[name]?.youth)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Environmental Improvement (% of Total Revenue)"
        values={data.map((item) => item[name]?.environmental_improvement)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Water Resources and Rural Development (% of Total Revenue)"
        values={data.map(
          (item) => item[name]?.water_resources_and_rural_development
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Information Communication and Technology (% of Total Revenue)"
        values={data.map(
          (item) => item[name]?.information_communication_and_tech
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Growing the Private Sector (% of Total Revenue)"
        values={data.map((item) => item[name]?.growing_private_sector)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Reform of Government and Governance (% of Total Revenue)"
        values={data.map(
          (item) => item[name]?.reform_of_government_and_governance
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Power (% of Total Revenue)"
        values={data.map((item) => item[name]?.power)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Rail (% of Total Revenue)"
        values={data.map((item) => item[name]?.rail)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Water Ways (% of Total Revenue)"
        values={data.map((item) => item[name]?.water_ways)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Road (% of Total Revenue)"
        values={data.map((item) => item[name]?.road)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Airways (% of Total Revenue)"
        values={data.map((item) => item[name]?.airways)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="COVID-19 (% of Total Revenue)"
        values={data.map((item) => item[name]?.covid_19)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="CLIMATE CHANGE (% of Total Revenue)"
        values={data.map((item) => item[name]?.climate_change)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Oil and Gas Infrastructure (% of Total Revenue)"
        values={data.map((item) => item[name]?.oil_and_gas_infrastructure)}
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

export default ExpenditureByProgrammeTotalRevenue;
