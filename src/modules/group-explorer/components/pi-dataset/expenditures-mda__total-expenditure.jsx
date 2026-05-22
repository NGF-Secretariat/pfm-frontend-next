import React from "react";
import { BUDGET_CATEGORIES__PI } from "../../../../static/budget-categories";

const initialValues = ["expenditure_mda_percentage_total_expenditure"];
const ExpendituresMDATotalExpenditure = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES__PI[8].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "expenditure_mda_percentage_total_expenditure";
  if (!filterCategories?.length) return null;
  return (
    <React.Fragment>
      <tr>
        <td className="sticky-left text-underline fw-semibold">
          Expenditure by MDA (% of Total Expenditure)
        </td>
        {data?.map((_, index) => (
          <td className="text-end" key={index} />
        ))}
      </tr>
      <AppTableCell
        titleClass="fw-semibold"
        title="Administration Sector (% of Total Expenditure)"
        values={data.map((item) => item[name]?.admin_sector)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Governor’s Office (% of Total Expenditure)"
        values={data.map((item) => item[name]?.governors_office)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Secretary to the State Government (% of Total Expenditure)"
        values={data.map((item) => item[name]?.secretary_to_state_gov)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="State Assembly (% of Total Expenditure)"
        values={data.map((item) => item[name]?.state_assembly)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Information (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_of_info)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Internal Security and Home Affairs (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.ministry_of_internal_security_home_affairs
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Office of the Head of Service (% of Total Expenditure)"
        values={data.map((item) => item[name]?.office_head_of_service)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Office of the Auditor General State (% of Total Expenditure)"
        values={data.map((item) => item[name]?.office_auditor_general_state)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Office of the Auditor General Local Government (% of Total Expenditure)"
        values={data.map((item) => item[name]?.office_auditor_general_lga)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Civil Service Commission (% of Total Expenditure)"
        values={data.map((item) => item[name]?.civil_service_commission)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Local Government Service Commission (% of Total Expenditure)"
        values={data.map((item) => item[name]?.lga_service_commission)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="State Independent Electoral Commission (% of Total Expenditure)"
        values={data.map((item) => item[name]?.state_inec)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Economic Sector (% of Total Expenditure)"
        values={data.map((item) => item[name]?.economic_sector)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Agriculture & Natural Resources (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.ministry_of_agric_natural_resources
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Finance (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_finance)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Commerce/Trade/Business/Industry/Investment (% of Total Expenditure)"
        values={data.map(
          (item) =>
            item[name]?.ministry_commerce_trade_business_industry_investment
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Labour and Productivity (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_labour_productivity)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Science and Technology (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_science_tech)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Transport (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_transport)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Energy (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_energy)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Works (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_works)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Culture and Tourism (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_culture_tourism)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="State Planning Commission/Ministry of Budget and Economic Planning (% of Total Expenditure)"
        values={data.map((item) => item[name]?.state_planning_commission)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Fiscal Responsibility Commission (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.fiscal_responsibility_commission
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Water Resources (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_water_resources)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Housing and Urban Development (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.ministry_housing_urban_development
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Land and Survey (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_land_survey)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Law and Justice Sector (% of Total Expenditure)"
        values={data.map((item) => item[name]?.law_justuce_sector)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Judiciary (% of Total Expenditure)"
        values={data.map((item) => item[name]?.judiciary)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Justice (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_justice)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Regional Sector (% of Total Expenditure)"
        values={data.map((item) => item[name]?.regional_sector)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Oil Producing Communities Development Agency/Commission (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.oil_producing_communities_dev_agency
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="State Capital Development Agency/Ministry (% of Total Expenditure)"
        values={data.map((item) => item[name]?.state_capital_dev_agency)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Social Sector (% of Total Expenditure)"
        values={data.map((item) => item[name]?.social_sector)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Youth Development (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_youth_development)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Women Affairs (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_women_affairs)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Education (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_education)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Health (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_health)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Environment (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_environment)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Sport Development (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_sports)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Humanitarian Affairs (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ministry_humanitarian_affairs)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Local Government (% of Total Expenditure)"
        values={data.map((item) => item[name]?.minsitry_lga)}
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

export default ExpendituresMDATotalExpenditure;
