import React from "react";
import { BUDGET_CATEGORIES__PI } from "../../../../static/budget-categories";

const initialValues = ["expenditures_percentage_total_expenditure"];
const ExpendituresTotalExpenditure = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES__PI[4].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "expenditures_percentage_total_expenditure";
  if (!filterCategories?.length) return null;
  return (
    <React.Fragment>
      <tr>
        <td className="sticky-left text-underline fw-semibold">
          Expenditures (% of Total Expenditure)
        </td>
        {data?.map((_, index) => (
          <td className="text-end" key={index} />
        ))}
      </tr>
      <AppTableCell
        titleClass="fw-semibold"
        title="Personnel Expenditure (% of Total Expenditure)"
        values={data.map((item) => item[name]?.personal_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Personnel Cost (% of Total Expenditure)"
        values={data.map((item) => item[name]?.personal_cost)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Salaries and Wages – General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.salaries_wages)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Salaries (% of Total Expenditure)"
        values={data.map((item) => item[name]?.salaries)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Overtime Payments (% of Total Expenditure)"
        values={data.map((item) => item[name]?.ovetimes_payments)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Consolidated Revenue Charges (% of Total Expenditure)"
        values={data.map((item) => item[name]?.consolidated_revenue_charges)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Allowances (% of Total Expenditure)"
        values={data.map((item) => item[name]?.allowances)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Social Contribution (% of Total Expenditure)"
        values={data.map((item) => item[name]?.social_contribution)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="NHIS Contribution (% of Total Expenditure)"
        values={data.map((item) => item[name]?.nhis_contribution)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Contributory Pension (% of Total Expenditure)"
        values={data.map((item) => item[name]?.contributory_pension)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Group Life Insurance (% of Total Expenditure)"
        values={data.map((item) => item[name]?.group_life_insurance)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Employee Compensation Fund (% of Total Expenditure)"
        values={data.map((item) => item[name]?.employee_comepensation_fund)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Housing Fund Contribution (% of Total Expenditure)"
        values={data.map((item) => item[name]?.housing_fund_contribution)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Social Benefit (% of Total Expenditure)"
        values={data.map((item) => item[name]?.social_benefit)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Gratuity (% of Total Expenditure)"
        values={data.map((item) => item[name]?.gratuity)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Pension (% of Total Expenditure)"
        values={data.map((item) => item[name]?.pension)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Death Benefit (% of Total Expenditure)"
        values={data.map((item) => item[name]?.death_benefit)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Grauitity Arrears (% of Total Expenditure)"
        values={data.map((item) => item[name]?.gratuity_arrears)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Pension Arrears (% of Total Expenditure)"
        values={data.map((item) => item[name]?.pension_arrears)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Severance Gratuity for all Political Office Holders (% of Total
              Revenue)"
        values={data.map(
          (item) =>
            item[name]?.severance_gratuity_for_all_political_office_holders
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Contribution to LG Pension (% of Total Expenditure)"
        values={data.map((item) => item[name]?.contribution_to_lg_pension)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Payment of Benefits to past Governors/Deputies (% of Total
              Revenue)"
        values={data.map(
          (item) => item[name]?.payment_benefit_to_past_governors_deputies
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Other Recurrent Expenditure (% of Total Expenditure)"
        values={data.map((item) => item[name]?.other_recurrent_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Overhead Costs (% of Total Expenditure)"
        values={data.map((item) => item[name]?.overhead_costs)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Transport and Travelling General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.transport_travelling_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Utilities General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.utilities_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Materials and Supplies General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.materials_supplies_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Maintenance Services General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.maintainance_services_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Training – General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.training_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Other Services General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.other_servies_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Consulting and Professional Services General (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.consulting_professional_services_general
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Fuel and Lubricant General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.fuel_lubricant_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Financial General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.financial_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Miscellaneous General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.miscellaneous_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Loans and Advances (% of Total Expenditure)"
        values={data.map((item) => item[name]?.loans_advances)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Staff Loans and Advances (% of Total Expenditure)"
        values={data.map((item) => item[name]?.staff_loans_advances)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Grants and Contribution General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.grants_contribution_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Grants to other States (% of Total Expenditure)"
        values={data.map((item) => item[name]?.grants_to_other_states)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Grants to Local Governments (% of Total Expenditure)"
        values={data.map((item) => item[name]?.grants_to_lga)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Grants to Government Owned Companies (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.grants_to_government_owned_companies
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Grants to Private Companies (% of Total Expenditure)"
        values={data.map((item) => item[name]?.grants_to_private_companies)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Grants to Communities/NGOs/FBOs/CBOs (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.grants_to_communities_ngos_fbos_cbos
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Subsidies General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.subsidies_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Subsidy to Government Owned Companies (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.subsidy_to_government_owned_companies
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Meal Subsidy to Government Schools (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.meal_subsidy_to_government_owned_schools
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Subsidy to Private Companies (% of Total Expenditure)"
        values={data.map((item) => item[name]?.subsidy_to_private_companies)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Public Debt Charges (% of Total Expenditure)"
        values={data.map((item) => item[name]?.public_debt_charges)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Foreign Debt Interest (% of Total Expenditure)"
        values={data.map((item) => item[name]?.foreign_debt_interest)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Interest / Discount - Treasury Bill/Long Term Borrowing (%
              of Total Expenditure)"
        values={data.map(
          (item) =>
            item[name]
              ?.foreign_interest__discount_treasury_bill__long_term_borrowing
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Interest / Discount - Short Term Borrowings (% of Total
              Revenue)"
        values={data.map(
          (item) => item[name]?.foreign_interest__discount_short_term_borrowing
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Domestic Debt Interest (% of Total Expenditure)"
        values={data.map((item) => item[name]?.domestic_debt_interest)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Interest / Discount - Treasury Bill/Long Term Borrowing
              (% of Total Expenditure)"
        values={data.map(
          (item) =>
            item[name]
              ?.domestic_interest__discount_treasury_bill__long_term_borrowing
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Interest /Discount - Short Term Borrowings"
        values={data.map(
          (item) => item[name]?.domestic_interest__discount_short_term_borrowing
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Foreign Debt Principal (% of Total Expenditure)"
        values={data.map((item) => item[name]?.foreign_debt_principal)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Principal - Treasury Bill/Long Term Borrowing (% of Total
              Revenue)"
        values={data.map(
          (item) =>
            item[name]?.foreign_principal__treasury_bill_long_term_borrowing
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Principal - Short Term Borrowings (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.foreign_principal___short_term_borrowing
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Domestic Debt Principal (% of Total Expenditure)"
        values={data.map((item) => item[name]?.domestic_debt_principal)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Principal - Treasury Bill/Long Term Borrowing (% of Total
              Revenue)"
        values={data.map(
          (item) =>
            item[name]?.domestic_principal__treasury_bill_long_term_borrowing
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Principal - Short Term Borrowings (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.domestic_principal___short_term_borrowing
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Transfers-Payments (% of Total Expenditure)"
        values={data.map((item) => item[name]?.transfers_payment)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Transfer to Fund Recurrent Expenditure-Payment (% of Total
              Revenue)"
        values={data.map(
          (item) => item[name]?.transfer_to_fund_recurrent_expenditure_payment
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Capital Expenditure (% of Total Expenditure)"
        values={data.map((item) => item[name]?.capital_expenditure)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Fixed Assets Purchased (% of Total Expenditure)"
        values={data.map((item) => item[name]?.fixed_assets_purchased)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Construction/Provision (% of Total Expenditure)"
        values={data.map((item) => item[name]?.construction_provision)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Rehabilitation/Repairs (% of Total Expenditure)"
        values={data.map((item) => item[name]?.rehabilitation_repairs)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Preservation Of The Environment (% of Total Expenditure)"
        values={data.map((item) => item[name]?.preservation_of_environment)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Other Capital Projects (% of Total Expenditure)"
        values={data.map((item) => item[name]?.other_capital_projects)}
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

function AppTableCell({ title, values, titleClass, isVisible }) {
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

export default ExpendituresTotalExpenditure;
