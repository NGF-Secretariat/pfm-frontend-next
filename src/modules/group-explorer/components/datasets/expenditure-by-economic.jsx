import React from "react";
import { BUDGET_CATEGORIES } from "../../../../static/budget-categories";

const initialValues = ["exp_by_economic"];
const ExpenditureByEconomic = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES[2].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "exp_by_economic";

  if (!filterCategories?.length) return null;
  if (!filterCategories.includes(name)) return null;
  return (
    <React.Fragment>
      <tr className="sticky-top__sub bg-light">
        <td className="sticky-left"></td>
        <td className="sticky-left fw-bold">Expenditure by Economic</td>
        {data?.map((_, index) => (
          <td className="category" key={index}>
            {""}
          </td>
        ))}
      </tr>
      <AppTableCell
        isVisible
        titleClass="fw-semibold text-underline"
        title="Total Expenditure"
        code={data[0][name]?.total_expenditure?.code}
        values={data.map((item) => item[name]?.total_expenditure)}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title="Personnel Expenditure"
        code={data[0][name]?.personal_expenditure?.code}
        values={data.map((item) => item[name]?.personal_expenditure)}
        isVisible={filterCategories.includes("personal_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Personnel Cost"
        code={data[0][name]?.personal_expenditure?.personal_cost?.code}
        values={data.map(
          (item) => item[name]?.personal_expenditure?.personal_cost
        )}
        isVisible={filterCategories.includes("personal_cost")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Salaries and Wages – General"
        code={data[0][name]?.personal_expenditure?.salaries_wages_general?.code}
        values={data.map(
          (item) => item[name]?.personal_expenditure?.salaries_wages_general
        )}
        isVisible={filterCategories.includes("salaries_wages_general")}
      />
      <AppTableCell
        titleClass=""
        title="Salaries"
        code={
          data[0][name]?.personal_expenditure?.salaries_wages_general?.salaries
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.salaries_wages_general?.salaries
        )}
        isVisible={filterCategories.includes("salaries_wages_general")}
      />
      <AppTableCell
        titleClass=""
        title="Overtime Payments"
        code={
          data[0][name]?.personal_expenditure?.salaries_wages_general
            ?.overtime_payments?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.salaries_wages_general
              ?.overtime_payments
        )}
        isVisible={filterCategories.includes("salaries_wages_general")}
      />
      <AppTableCell
        titleClass=""
        title="Consolidated Revenue Charges"
        code={
          data[0][name]?.personal_expenditure?.salaries_wages_general
            ?.consolidated_revenue_charges?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.salaries_wages_general
              ?.consolidated_revenue_charges
        )}
        isVisible={filterCategories.includes("salaries_wages_general")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Allowances"
        code={data[0][name]?.personal_expenditure?.allowances?.code}
        values={data.map(
          (item) => item[name]?.personal_expenditure?.allowances
        )}
        isVisible={filterCategories.includes("allowances")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Social Contribution"
        code={data[0][name]?.personal_expenditure?.social_contribution?.code}
        values={data.map(
          (item) => item[name]?.personal_expenditure?.social_contribution
        )}
        isVisible={filterCategories.includes("social_contribution")}
      />
      <AppTableCell
        titleClass=""
        title="NHIS Contribution"
        code={
          data[0][name]?.personal_expenditure?.social_contribution
            ?.nhis_contribution?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_contribution
              ?.nhis_contribution
        )}
        isVisible={filterCategories.includes("social_contribution")}
      />
      <AppTableCell
        titleClass=""
        title="Contributory Pension"
        code={
          data[0][name]?.personal_expenditure?.social_contribution
            ?.contribution_pension?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_contribution
              ?.contribution_pension
        )}
        isVisible={filterCategories.includes("social_contribution")}
      />
      <AppTableCell
        titleClass=""
        title="Group Life Insurance"
        code={
          data[0][name]?.personal_expenditure?.social_contribution
            ?.group_life_insurance?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_contribution
              ?.group_life_insurance
        )}
        isVisible={filterCategories.includes("social_contribution")}
      />
      <AppTableCell
        titleClass=""
        title="Employee Compensation Fund"
        code={
          data[0][name]?.personal_expenditure?.social_contribution
            ?.employee_compensation_fund?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_contribution
              ?.employee_compensation_fund
        )}
        isVisible={filterCategories.includes("social_contribution")}
      />
      <AppTableCell
        titleClass=""
        title="Housing Fund Contribution"
        code={
          data[0][name]?.personal_expenditure?.social_contribution
            ?.housing_fund_contribution?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_contribution
              ?.housing_fund_contribution
        )}
        isVisible={filterCategories.includes("social_contribution")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Social Benefit"
        code={data[0][name]?.personal_expenditure?.social_benefit?.code}
        values={data.map(
          (item) => item[name]?.personal_expenditure?.social_benefit
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass=""
        title="Gratuity"
        code={
          data[0][name]?.personal_expenditure?.social_benefit?.gratuity?.code
        }
        values={data.map(
          (item) => item[name]?.personal_expenditure?.social_benefit?.gratuity
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass=""
        title="Pension"
        code={
          data[0][name]?.personal_expenditure?.social_benefit?.pension?.code
        }
        values={data.map(
          (item) => item[name]?.personal_expenditure?.social_benefit?.pension
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass=""
        title="Death Benefit"
        code={
          data[0][name]?.personal_expenditure?.social_benefit?.death_benefit
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_benefit?.death_benefit
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass=""
        title="Grauitity Arrears"
        code={
          data[0][name]?.personal_expenditure?.social_benefit?.gratuity_arrears
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_benefit?.gratuity_arrears
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass=""
        title="Pension Arrears"
        code={
          data[0][name]?.personal_expenditure?.social_benefit?.pension_arrears
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_benefit?.pension_arrears
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass=""
        title="Severance Gratuity for all Political Office Holders"
        code={
          data[0][name]?.personal_expenditure?.social_benefit
            ?.severance_gratuity_for_all_political_office_holders?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_benefit
              ?.severance_gratuity_for_all_political_office_holders
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass=""
        title="Contribution to LG Pension"
        code={
          data[0][name]?.personal_expenditure?.social_benefit
            ?.contribution_to_lg_pension?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_benefit
              ?.contribution_to_lg_pension
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass=""
        title="Payment of Benefits to past Governors/Deputies/Political
                  Office Holders"
        code={
          data[0][name]?.personal_expenditure?.social_benefit
            ?.payment_of_benefit_to_past_governors_deputies_political_office_holders
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.personal_expenditure?.social_benefit
              ?.payment_of_benefit_to_past_governors_deputies_political_office_holders
        )}
        isVisible={filterCategories.includes("social_benefit")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title="Other Recurrent Expenditure"
        code={data[0][name]?.other_recurrent_expenditure?.code}
        values={data.map((item) => item[name]?.other_recurrent_expenditure)}
        isVisible={filterCategories.includes("other_recurrent_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Overhead Costs"
        code={data[0][name]?.other_recurrent_expenditure?.overhead_costs?.code}
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure?.overhead_costs
        )}
        isVisible={filterCategories.includes("overhead_costs")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Transport and Travelling General"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.transport_and_travelling_general?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.transport_and_travelling_general
        )}
        isVisible={filterCategories.includes(
          "transport_and_travelling_general"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Utilities General"
        code={
          data[0][name]?.other_recurrent_expenditure?.utilities_general?.code
        }
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure?.utilities_general
        )}
        isVisible={filterCategories.includes("utilities_general")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Materials and Supplies General"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.materials_and_supplies_general?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.materials_and_supplies_general
        )}
        isVisible={filterCategories.includes("materials_and_supplies_general")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Maintenance Services General"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.maintainance_services_general?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.maintainance_services_general
        )}
        isVisible={filterCategories.includes("maintainance_services_general")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Training – General"
        code={
          data[0][name]?.other_recurrent_expenditure?.training_general?.code
        }
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure?.training_general
        )}
        isVisible={filterCategories.includes("training_general")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Other Services General"
        code={
          data[0][name]?.other_recurrent_expenditure?.other_services_general
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.other_services_general
        )}
        isVisible={filterCategories.includes("other_services_general")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Consulting and Professional Services General"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.consulting_and_professional_services_general?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.consulting_and_professional_services_general
        )}
        isVisible={filterCategories.includes(
          "consulting_and_professional_services_general"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Fuel and Lubricant General"
        code={
          data[0][name]?.other_recurrent_expenditure?.fuel_and_lubricant_general
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.fuel_and_lubricant_general
        )}
        isVisible={filterCategories.includes("fuel_and_lubricant_general")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Financial General"
        code={
          data[0][name]?.other_recurrent_expenditure?.financial_general?.code
        }
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure?.financial_general
        )}
        isVisible={filterCategories.includes("financial_general")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Miscellaneous General"
        code={
          data[0][name]?.other_recurrent_expenditure?.miscellaneous_general
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.miscellaneous_general
        )}
        isVisible={filterCategories.includes("miscellaneous_general")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Loans and Advances"
        code={
          data[0][name]?.other_recurrent_expenditure?.loans_and_advances?.code
        }
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure?.loans_and_advances
        )}
        isVisible={filterCategories.includes("loans_and_advances")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Staff Loans and Allowances"
        code={
          data[0][name]?.other_recurrent_expenditure?.staff_loans_and_allowances
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.staff_loans_and_allowances
        )}
        isVisible={filterCategories.includes("staff_loans_and_allowances")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Grants and Contribution General"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.grants_and_contribution_general?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.grants_and_contribution_general
        )}
        isVisible={filterCategories.includes("grants_and_contribution_general")}
      />
      <AppTableCell
        titleClass=""
        title="Grants to other States/ Federal Government"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.grants_and_contribution_general
            ?.grants_to_other_states_federal_government?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.grants_and_contribution_general
              ?.grants_to_other_states_federal_government
        )}
        isVisible={filterCategories.includes("grants_and_contribution_general")}
      />
      <AppTableCell
        titleClass=""
        title="Grants to Local Governments"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.grants_and_contribution_general?.grants_to_local_governments?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.grants_and_contribution_general?.grants_to_local_governments
        )}
        isVisible={filterCategories.includes("grants_and_contribution_general")}
      />
      <AppTableCell
        titleClass=""
        title="Grants to Government Owned Companies"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.grants_and_contribution_general
            ?.grants_to_government_owned_companies?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.grants_and_contribution_general
              ?.grants_to_government_owned_companies
        )}
        isVisible={filterCategories.includes("grants_and_contribution_general")}
      />
      <AppTableCell
        titleClass=""
        title="Grants to Private Companies"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.grants_and_contribution_general?.grants_to_private_owned_companies
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.grants_and_contribution_general
              ?.grants_to_private_owned_companies
        )}
        isVisible={filterCategories.includes("grants_and_contribution_general")}
      />
      <AppTableCell
        titleClass=""
        title="Grants to Communities/NGOs/FBOs/CBOs"
        code={
          data[0][name]?.other_recurrent_expenditure
            ?.grants_and_contribution_general?.grants_to_communities_ngo_fbo_cbo
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure
              ?.grants_and_contribution_general
              ?.grants_to_communities_ngo_fbo_cbo
        )}
        isVisible={filterCategories.includes("grants_and_contribution_general")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Subsidies General"
        code={
          data[0][name]?.other_recurrent_expenditure?.subsidies_general?.code
        }
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure?.subsidies_general
        )}
        isVisible={filterCategories.includes("subsidies_general")}
      />
      <AppTableCell
        titleClass=""
        title="Subsidy to Government Owned Companies, Boards & Parastatals"
        code={
          data[0][name]?.other_recurrent_expenditure?.subsidies_general
            ?.subsidy_to_government_owned_companies_boards_parastatals?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.subsidies_general
              ?.subsidy_to_government_owned_companies_boards_parastatals
        )}
        isVisible={filterCategories.includes("subsidies_general")}
      />
      <AppTableCell
        titleClass=""
        title="Meal Subsidy to Government Schools"
        code={
          data[0][name]?.other_recurrent_expenditure?.subsidies_general
            ?.meal_subsidy_to_government_schools?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.subsidies_general
              ?.meal_subsidy_to_government_schools
        )}
        isVisible={filterCategories.includes("subsidies_general")}
      />
      <AppTableCell
        titleClass=""
        title="Subsidy to Private Companies"
        code={
          data[0][name]?.other_recurrent_expenditure?.subsidies_general
            ?.subsidy_to_private_companies?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.subsidies_general
              ?.subsidy_to_private_companies
        )}
        isVisible={filterCategories.includes("subsidies_general")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Public Debt Charges"
        code={
          data[0][name]?.other_recurrent_expenditure?.public_debt_charges?.code
        }
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure?.public_debt_charges
        )}
        isVisible={filterCategories.includes("public_debt_charges")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Foreign Debt Interest"
        code={
          data[0][name]?.other_recurrent_expenditure?.foreign_debt_interest
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.foreign_debt_interest
        )}
        isVisible={filterCategories.includes("foreign_debt_interest")}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Interest / Discount - Treasury Bill/Long Term
                  Borrowing"
        code={
          data[0][name]?.other_recurrent_expenditure?.foreign_debt_interest
            ?.foreign_interest_discount_treasury_bill_long_term_borrowing?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.foreign_debt_interest
              ?.foreign_interest_discount_treasury_bill_long_term_borrowing
        )}
        isVisible={filterCategories.includes("foreign_debt_interest")}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Interest / Discount - Short Term Borrowings"
        code={
          data[0][name]?.other_recurrent_expenditure?.foreign_debt_interest
            ?.foreign_interest_discount_short_term_borrowings?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.foreign_debt_interest
              ?.foreign_interest_discount_short_term_borrowings
        )}
        isVisible={filterCategories.includes("foreign_debt_interest")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Domestic Debt Interest"
        code={
          data[0][name]?.other_recurrent_expenditure?.domestic_debt_interest
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.domestic_debt_interest
        )}
        isVisible={filterCategories.includes("domestic_debt_interest")}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Interest / Discount - Treasury Bill/Long Term Borrowing"
        code={
          data[0][name]?.other_recurrent_expenditure?.domestic_debt_interest
            ?.domestic_interest_discount_treasury_bill_long_term_borrowing?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.domestic_debt_interest
              ?.domestic_interest_discount_treasury_bill_long_term_borrowing
        )}
        isVisible={filterCategories.includes("domestic_debt_interest")}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Interest /Discount - Short Term Borrowings"
        code={
          data[0][name]?.other_recurrent_expenditure?.domestic_debt_interest
            ?.domestic_interest_discount_short_term_borrowings?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.domestic_debt_interest
              ?.domestic_interest_discount_short_term_borrowings
        )}
        isVisible={filterCategories.includes("domestic_debt_interest")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Foreign Debt Principal"
        code={
          data[0][name]?.other_recurrent_expenditure?.foreign_debt_principal
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.foreign_debt_principal
        )}
        isVisible={filterCategories.includes("foreign_debt_principal")}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Principal - Treasury Bill/Long Term Borrowing"
        code={
          data[0][name]?.other_recurrent_expenditure?.foreign_debt_principal
            ?.foreign_principal_treasury_bill_long_term_borrowing?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.foreign_debt_principal
              ?.foreign_principal_treasury_bill_long_term_borrowing
        )}
        isVisible={filterCategories.includes("foreign_debt_principal")}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Principal - Short Term Borrowings"
        code={
          data[0][name]?.other_recurrent_expenditure?.foreign_debt_principal
            ?.foreign_principal_short_term_borrowing?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.foreign_debt_principal
              ?.foreign_principal_short_term_borrowing
        )}
        isVisible={filterCategories.includes("foreign_debt_principal")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Domestic Debt Principal"
        code={
          data[0][name]?.other_recurrent_expenditure?.domestic_debt_principal
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.domestic_debt_principal
        )}
        isVisible={filterCategories.includes("domestic_debt_principal")}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Principal - Treasury Bill/Long Term Borrowing"
        code={
          data[0][name]?.other_recurrent_expenditure?.domestic_debt_principal
            ?.domestic_principal_treasury_bill_long_term_borrowing?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.domestic_debt_principal
              ?.domestic_principal_treasury_bill_long_term_borrowing
        )}
        isVisible={filterCategories.includes("domestic_debt_principal")}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Principal - Short Term Borrowings"
        code={
          data[0][name]?.other_recurrent_expenditure?.domestic_debt_principal
            ?.domestic_principal_short_term_borrowing?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.domestic_debt_principal
              ?.domestic_principal_short_term_borrowing
        )}
        isVisible={filterCategories.includes("domestic_debt_principal")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Transfers-Payments"
        code={
          data[0][name]?.other_recurrent_expenditure?.transfers_payments?.code
        }
        values={data.map(
          (item) => item[name]?.other_recurrent_expenditure?.transfers_payments
        )}
        isVisible={filterCategories.includes("transfers_payments")}
      />
      <AppTableCell
        titleClass=""
        title="Transfer to Fund Recurrent Expenditure-Payment"
        code={
          data[0][name]?.other_recurrent_expenditure?.transfers_payments
            ?.transfer_to_fund_recurrent_expenditure_payment?.code
        }
        values={data.map(
          (item) =>
            item[name]?.other_recurrent_expenditure?.transfers_payments
              ?.transfer_to_fund_recurrent_expenditure_payment
        )}
        isVisible={filterCategories.includes("transfers_payments")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title="Capital Expenditure"
        code={data[0][name]?.capital_expenditure?.code}
        values={data.map((item) => item[name]?.capital_expenditure)}
        isVisible={filterCategories.includes("capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Fixed Assets Purchased"
        code={data[0][name]?.capital_expenditure?.fixed_assets_purchased?.code}
        values={data.map(
          (item) => item[name]?.capital_expenditure?.fixed_assets_purchased
        )}
        isVisible={filterCategories.includes("capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Construction/Provision"
        code={data[0][name]?.capital_expenditure?.construction_provision?.code}
        values={data.map(
          (item) => item[name]?.capital_expenditure?.construction_provision
        )}
        isVisible={filterCategories.includes("capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Rehabilitation/Repairs"
        code={data[0][name]?.capital_expenditure?.rehabilitation_repairs?.code}
        values={data.map(
          (item) => item[name]?.capital_expenditure?.rehabilitation_repairs
        )}
        isVisible={filterCategories.includes("capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Preservation of The Environment"
        code={
          data[0][name]?.capital_expenditure?.preservation_of_the_environment
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.capital_expenditure?.preservation_of_the_environment
        )}
        isVisible={filterCategories.includes("capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold fst-italic"
        title="Other Capital Projects"
        code={data[0][name]?.capital_expenditure?.other_capital_projects?.code}
        values={data.map(
          (item) => item[name]?.capital_expenditure?.other_capital_projects
        )}
        isVisible={filterCategories.includes("capital_expenditure")}
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

export default ExpenditureByEconomic;
