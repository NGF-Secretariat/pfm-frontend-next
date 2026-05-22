import React from "react";
import { BUDGET_CATEGORIES__PI } from "../../../../static/budget-categories";

const initialValues = ["revenues_percantage_total_expenditure"];
const RevenuesTotalExpenditure = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES__PI[3].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "revenues_percantage_total_expenditure";
  if (!filterCategories?.length) return null;
  return (
    <React.Fragment>
      <tr>
        <td className="sticky-left text-underline fw-semibold">
          Revenues (% of Total Expenditure)
        </td>
        {data?.map((_, index) => (
          <td className="text-end" key={index} />
        ))}
      </tr>
      <AppTableCell
        titleClass="fw-semibold"
        title="Recurrent Revenue (% of Total Expenditure)"
        values={data.map((item) => item[name]?.recurrent_revenue)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Federation Revenue (% of Total Expenditure)"
        values={data.map((item) => item[name]?.federation_revenue)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Statutory Allocation (% of Total Expenditure)"
        values={data.map((item) => item[name]?.satutory_allocation)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Derivation (% of Total Expenditure)"
        values={data.map((item) => item[name]?.derivation)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Value Added Tax (% of Total Expenditure)"
        values={data.map((item) => item[name]?.vat)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Other Federation Transfers (% of Total Expenditure)"
        values={data.map((item) => item[name]?.other_federation_transfers)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Internally Generated Revenue (% of Total Expenditure)"
        values={data.map((item) => item[name]?.igr)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Tax Revenue (% of Total Expenditure)"
        values={data.map((item) => item[name]?.tax_revenue)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Personal Taxes (% of Total Expenditure)"
        values={data.map((item) => item[name]?.personal_taxes)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Personal Income Tax (PAYE) (% of Total Expenditure)"
        values={data.map((item) => item[name]?.personal_income_tax_paye)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Personnal Income Tax (Direct Assessment Taxes) (% of Total
              Revenue)"
        values={data.map((item) => item[name]?.personal_income_tax_dat)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title=" Penalty For Offences & Interest (% of Total Expenditure) "
        values={data.map((item) => item[name]?.penalty_for_offenses_interest)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Other Personal Tax N.E.C (% of Total Expenditure)"
        values={data.map((item) => item[name]?.other_personal_tax_nec)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Other Taxes (% of Total Expenditure)"
        values={data.map((item) => item[name]?.other_taxes)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Sales Tax (% of Total Expenditure)"
        values={data.map((item) => item[name]?.sales_taxes)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Lottery Tax/Licence (% of Total Expenditure)"
        values={data.map((item) => item[name]?.lottery_tax)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Property Tax (% of Total Expenditure)"
        values={data.map((item) => item[name]?.property_tax)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Capital Gain Taxes (% of Total Expenditure)"
        values={data.map((item) => item[name]?.capital_gain_tax)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Withholding Tax (% of Total Expenditure)"
        values={data.map((item) => item[name]?.withholding_tax)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Other Taxes N.E.C (% of Total Expenditure)"
        values={data.map((item) => item[name]?.other_taxes_nec)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Non-Tax Revenue (% of Total Expenditure)"
        values={data.map((item) => item[name]?.non_tax_revenue)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Licences General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.licances_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Fees – General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.fees_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Fines – General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.fines_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Sales – General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.sales_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Earnings – General (% of Total Expenditure)"
        values={data.map((item) => item[name]?.earnings_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Rent On Government Buildings – General (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.rent_on_government_building_general
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Rent on Land and Others – General (% of Total Expenditure) "
        values={data.map((item) => item[name]?.rent_on_land_others_general)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Repayments (% of Total Expenditure)"
        values={data.map((item) => item[name]?.repayments)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Investment Income (% of Total Expenditure)"
        values={data.map((item) => item[name]?.investment_income)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Interest Earned (% of Total Expenditure)"
        values={data.map((item) => item[name]?.interest_earned)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Reimbursement (% of Total Expenditure)"
        values={data.map((item) => item[name]?.reimbursement)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Miscellaneous Income (% of Total Expenditure)"
        values={data.map((item) => item[name]?.miscellaneous_income)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Aids and Grants (% of Total Expenditure)"
        values={data.map((item) => item[name]?.aids_grants)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Aids (% of Total Expenditure)"
        values={data.map((item) => item[name]?.domestic_aids)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Aids (% of Total Expenditure)"
        values={data.map((item) => item[name]?.foreign_aids)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Grants (% of Total Expenditure)"
        values={data.map((item) => item[name]?.domestic_grants)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Grants (% of Total Expenditure)"
        values={data.map((item) => item[name]?.foreign_grants)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Capital Development Fund (CDF) Receipts (% of Total Expenditure)"
        values={data.map((item) => item[name]?.capital_development_fund)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Other Capital Receipts to CDF (% of Total Expenditure)"
        values={data.map((item) => item[name]?.other_capital_reciepts_cdf)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Sale Of Fixed Assets (% of Total Expenditure)"
        values={data.map((item) => item[name]?.sales_of_fixed_assets)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Loans/ Borrowings From Financial Institutions (% of Total
              Revenue)"
        values={data.map(
          (item) => item[name]?.domestic_loans_from_financial_instituitions
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Loans/ Borrowings From Other Government Entities (% of
              Total Expenditure)"
        values={data.map(
          (item) => item[name]?.domestic_loans_from_other_government_entities
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Loans/ Borrowings From Other Entities/ Organisations (%
              of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.domestic_loans_from_other_entities
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="International Loans/ Borrowings From Financial Institutions (% of
              Total Expenditure)"
        values={data.map(
          (item) => item[name]?.international_loans_from_financial_instituitions
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="International Loans/ Borrowings From Other Government Entities (%
              of Total Expenditure)"
        values={data.map(
          (item) =>
            item[name]?.internaitional_loans_from_other_government_entities
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="International Loans/ Borrowings From Other Entities/ Organisations
              (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.internaitional_loans_from_other_entities
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Foreign Debt Forgiveness (% of Total Expenditure)"
        values={data.map((item) => item[name]?.foreign_debt_forgiveness)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Domestic Debt Forgiveness (% of Total Expenditure)"
        values={data.map((item) => item[name]?.domestic_debt_foregiveness)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Gain On Disposal Of Asset – PPE (% of Total Expenditure)"
        values={data.map((item) => item[name]?.gain_on_disposal_asset_ppe)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Gain On Disposal Of Asset - Investment Property (% of Total
              Revenue)"
        values={data.map(
          (item) => item[name]?.gain_on_disposal_asset_investment_property
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Minority Interest Share Of Surplus (% of Total Expenditure)"
        values={data.map(
          (item) => item[name]?.minority_interest_share_of_surplus
        )}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Extraordinary Items (% of Total Expenditure)"
        values={data.map((item) => item[name]?.extraordinary_items)}
        isVisible={filterCategories.includes(name)}
      />
      <AppTableCell
        titleClass=""
        title="Unspecified Revenue (% of Total Expenditure)"
        values={data.map((item) => item[name]?.unspecified_revenue)}
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

export default RevenuesTotalExpenditure;
