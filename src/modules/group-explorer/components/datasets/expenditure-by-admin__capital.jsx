import React from "react";
import { BUDGET_CATEGORIES } from "../../../../static/budget-categories";

const initialValues = ["exp_by_admin_capital"];
let filterCategories = [];
const ExpenditureByAdminCapital = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES[4].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "exp_by_admin_capital";

  if (!filterCategories?.length) return null;
  if (!filterCategories.includes(name)) return null;
  return (
    <React.Fragment>
      <tr className="sticky-top__sub bg-light">
        <td className="sticky-left"></td>
        <td className="sticky-left fw-bold">
          Expenditure by Administrative (Capital)
        </td>
        {data?.map((_, index) => (
          <td className="category" key={index}>
            {""}
          </td>
        ))}
      </tr>
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title="Total Capital Expenditure"
        code={data[0][name]?.total__capital_expenditure?.code}
        values={data.map((item) => item[name]?.total__capital_expenditure)}
        isVisible
      />
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title="Administration Sector (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Governor’s Office (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure?.governors_office?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure?.governors_office
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Secretary to the State Government (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.secretary_to_the_state_government?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.secretary_to_the_state_government
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="State Assembly (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure?.state_assembly?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure?.state_assembly
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Information (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.ministry_of_information?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.ministry_of_information
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Internal Security and Home Affairs (Capital
                  Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.ministry_of_internal_security_and_home_affairs?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.ministry_of_internal_security_and_home_affairs
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Office of the Head of Service (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.office_of_the_head_of_service?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.office_of_the_head_of_service
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Office of the Auditor General State (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.office_of_the_auditor_general_state?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.office_of_the_auditor_general_state
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Office of the Auditor General for Local Government (Capital
                  Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.office_of_the_auditor_general_for_local_government?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.office_of_the_auditor_general_for_local_government
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Civil Service Commission (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.civil_wervice_commission?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.civil_wervice_commission
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Local Government Service Commission (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.local_government_service_commission?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.local_government_service_commission
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="State Independent Electoral Commission (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.administration_sector__capital_expenditure
            ?.state_independent_electoral_commission?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.administration_sector__capital_expenditure
              ?.state_independent_electoral_commission
        )}
        isVisible={filterCategories.includes(
          "administration_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Economic Sector (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Agriculture & Natural Resources (Capital
                  Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure
            ?.ministry_of_agriculture_natural_resources?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_agriculture_natural_resources
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Finance (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure?.ministry_of_finance?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure?.ministry_of_finance
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Commerce/Trade/Business/Industry/Investment
                  (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure
            ?.ministry_of_commerce_trade_business_industry_investment?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_commerce_trade_business_industry_investment
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Labour and Productivity (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure
            ?.ministry_of_labour_and_oriductivity?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_labour_and_oriductivity
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Science and Technology (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure
            ?.ministry_of_science_and_technology?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_science_and_technology
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Transport (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure?.ministry_of_transport?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure?.ministry_of_transport
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Energy (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure?.ministry_of_energy?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure?.ministry_of_energy
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Works (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure?.ministry_of_works?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure?.ministry_of_works
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Culture and Tourism (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure?.ministry_of_culture_tourism
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_culture_tourism
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="State Planning Commission/Ministry of Budget and Economic
                  Planning (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure
            ?.ministry_of_budget_economic_planning?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_budget_economic_planning
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Fiscal Responsibility Commission (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure
            ?.fiscal_responsibility_commission?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.fiscal_responsibility_commission
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Water Resources (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure?.ministry_of_water_resources
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_water_resources
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Housing and Urban Development (Capital
                  Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure
            ?.ministry_of_housing_urban_development?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_housing_urban_development
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        title="Ministry of Land and Survey (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.economic_sector__capital_expenditure?.ministry_of_land_and_survey
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.economic_sector__capital_expenditure
              ?.ministry_of_land_and_survey
        )}
        isVisible={filterCategories.includes(
          "economic_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Law and Justice Sector (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.law_and_justice_sector__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.law_and_justice_sector__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "law_and_justice_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Judiciary (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.law_and_justice_sector__capital_expenditure?.judiciary?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.law_and_justice_sector__capital_expenditure?.judiciary
        )}
        isVisible={filterCategories.includes(
          "law_and_justice_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Justice (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.law_and_justice_sector__capital_expenditure?.ministry_of_justice
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.law_and_justice_sector__capital_expenditure?.ministry_of_justice
        )}
        isVisible={filterCategories.includes(
          "law_and_justice_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Regional Sector (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.regional_sector__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.regional_sector__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "regional_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Oil Producing Communities Development Agency/Commission
                  (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.regional_sector__capital_expenditure
            ?.oil_producing_communities_development_agency_commission?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.regional_sector__capital_expenditure
              ?.oil_producing_communities_development_agency_commission
        )}
        isVisible={filterCategories.includes(
          "regional_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="State Capital Development Agency/Ministry (Capital
                  Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.regional_sector__capital_expenditure
            ?.state_capital_development_agency_ministry?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.regional_sector__capital_expenditure
              ?.state_capital_development_agency_ministry
        )}
        isVisible={filterCategories.includes(
          "regional_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Social Sector (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Youth Development (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure?.ministry_of_youth_development
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure
              ?.ministry_of_youth_development
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Women Affairs (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure?.ministry_of_women_affairs
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure?.ministry_of_women_affairs
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Education (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure?.ministry_of_education?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure?.ministry_of_education
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Health (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure?.ministry_of_health?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure?.ministry_of_health
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Environment (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure?.ministry_of_environment?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure?.ministry_of_environment
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Sport Development (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure?.ministry_of_sports_development
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure
              ?.ministry_of_sports_development
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Humanitarian Affairs (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure
            ?.ministry_of_humanitarian_affairs?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure
              ?.ministry_of_humanitarian_affairs
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Ministry of Local Government (Capital Expenditure)"
        code={
          data[0][name]?.total__capital_expenditure
            ?.social_sector__capital_expenditure?.ministry_of_local_government
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.total__capital_expenditure
              ?.social_sector__capital_expenditure?.ministry_of_local_government
        )}
        isVisible={filterCategories.includes(
          "social_sector__capital_expenditure"
        )}
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
      <td className="sticky-left fw-semibold text-end">{code}</td>
      <td className={["sticky-left", titleClass].join(" ")}>{title}</td>
      {values?.map((item, index) => (
        <td className="text-end" key={index}>
          {numberWithCommas(item?.value)}
        </td>
      ))}
    </tr>
  );
}

function numberWithCommas(x) {
  if (isNaN(x)) return Number(0).toLocaleString();
  return Number(parseFloat(x).toFixed(2)).toLocaleString("en", {
    minimumFractionDigits: 2,
  });
}

export default ExpenditureByAdminCapital;
