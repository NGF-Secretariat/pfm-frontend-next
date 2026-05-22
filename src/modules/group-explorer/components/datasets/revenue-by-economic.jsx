import React from "react";
import { BUDGET_CATEGORIES } from "../../../../static/budget-categories";

const initialValues = ["revenue_by_economic"];
const RevenueByEconomic = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);

  let filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES[1].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "revenue_by_economic";

  if (!filterCategories?.length) return null;
  if (!filterCategories.includes(name)) return null;
  return (
    <React.Fragment>
      <React.Fragment>
        <tr className="sticky-top__sub bg-light">
          <td className="sticky-left"></td>
          <td className="sticky-left fw-bold">Revenue by Economic</td>
          {data?.map((_, index) => (
            <td className="category" key={index}>
              {""}
            </td>
          ))}
        </tr>
        <AppTableCell
          isVisible
          titleClass="fw-semibold"
          title="Total Revenue (including Opening Balance)"
          values={data.map(
            (item) => item[name]?.total_revenue_with_opening_balance
          )}
        />
        <AppTableCell
          isVisible
          title="Opening Balance"
          titleClass="fw-semibold"
          values={data.map((item) => item[name]?.opening_balance)}
        />
        <AppTableCell
          title="Total Revenue"
          titleClass="text-underline fw-semibold"
          code={data[0][name]?.total_revenue?.code}
          values={data.map((item) => item[name]?.total_revenue)}
          isVisible={filterCategories.includes("total_revenue")}
        />
        <AppTableCell
          title="Government Share of Federation Revenue (FAAC)"
          titleClass="fw-semibold"
          code={
            data[0][name]?.total_revenue
              ?.government_share_of_federation_revenue_faac?.code
          }
          values={data.map(
            (item) =>
              item[name]?.total_revenue
                ?.government_share_of_federation_revenue_faac
          )}
          isVisible={filterCategories.includes(
            "government_share_of_federation_revenue_faac"
          )}
        />

        <AppTableCell
          title=" State Government Share of Statutory Allocation"
          titleClass="fw-semibold"
          code={
            data[0][name]?.total_revenue
              ?.state_government_share_of_statutory_allocation?.code
          }
          values={data.map(
            (item) =>
              item[name]?.total_revenue
                ?.state_government_share_of_statutory_allocation
          )}
          isVisible={filterCategories.includes(
            "state_government_share_of_statutory_allocation"
          )}
        />
        <AppTableCell
          title="Statutory Allocation"
          titleClass=""
          code={
            data[0][name]?.total_revenue
              ?.state_government_share_of_statutory_allocation
              ?.statutory_allocation?.code
          }
          values={data.map(
            (item) =>
              item[name]?.total_revenue
                ?.state_government_share_of_statutory_allocation
                ?.statutory_allocation
          )}
          isVisible={filterCategories.includes(
            "state_government_share_of_statutory_allocation"
          )}
        />
        <AppTableCell
          title="Oil/Gas Derivation"
          titleClass=""
          code={
            data[0][name]?.total_revenue
              ?.state_government_share_of_statutory_allocation
              ?.oil_gas_derivation?.code
          }
          values={data.map(
            (item) =>
              item[name]?.total_revenue
                ?.state_government_share_of_statutory_allocation
                ?.oil_gas_derivation
          )}
          isVisible={filterCategories.includes(
            "state_government_share_of_statutory_allocation"
          )}
        />
        <AppTableCell
          title="Government Share of Value Added Tax (VAT)"
          titleClass="fw-semibold"
          code={
            data[0][name]?.total_revenue
              ?.government_share_of_value_added_tax_vat?.code
          }
          values={data.map(
            (item) =>
              item[name]?.total_revenue?.government_share_of_value_added_tax_vat
          )}
          isVisible={filterCategories.includes(
            "government_share_of_value_added_tax_vat"
          )}
        />
        <AppTableCell
          title="Government Share of Other Federation Revenues"
          titleClass="fw-semibold"
          code={
            data[0][name]?.total_revenue
              ?.government_share_of_other_federation_revenues?.code
          }
          values={data.map(
            (item) =>
              item[name]?.total_revenue
                ?.government_share_of_other_federation_revenues
          )}
          isVisible={filterCategories.includes(
            "government_share_of_other_federation_revenues"
          )}
        />
        <AppTableCell
          title="Independent Revenue (Internally Generated Revenue)"
          titleClass="fw-semibold text-underline"
          code={data[0][name]?.independent_revenue?.code}
          values={data.map((item) => item[name]?.independent_revenue)}
          isVisible={filterCategories.includes("independent_revenue")}
        />
        <AppTableCell
          title="Tax Revenue"
          titleClass="fw-semibold"
          code={data[0][name]?.independent_revenue?.tax_revenue?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.tax_revenue
          )}
          isVisible={filterCategories.includes("tax_revenue")}
        />
        <AppTableCell
          title="Personal Taxes"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.personal_taxes?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.personal_taxes
          )}
          isVisible={filterCategories.includes("personal_taxes")}
        />
        <AppTableCell
          title="Personal Income Tax (PAYE)"
          titleClass=""
          code={data[0][name]?.independent_revenue?.personal_taxes?.paye?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.personal_taxes?.paye
          )}
          isVisible={filterCategories.includes("personal_taxes")}
        />
        <AppTableCell
          title="Personnal Income Tax (Direct Assessment Taxes)"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.personal_taxes
              ?.personal_income_tax?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.personal_taxes
                ?.personal_income_tax
          )}
          isVisible={filterCategories.includes("personal_taxes")}
        />
        <AppTableCell
          title="Penalty for Offences & Interest"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.personal_taxes
              ?.penalty_for_offenses_and_interests?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.personal_taxes
                ?.penalty_for_offenses_and_interests
          )}
          isVisible={filterCategories.includes("personal_taxes")}
        />
        <AppTableCell
          title="Other Personal Tax N.E.C"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.personal_taxes
              ?.other_personal_tax?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.personal_taxes
                ?.other_personal_tax
          )}
          isVisible={filterCategories.includes("personal_taxes")}
        />
        <AppTableCell
          title="Other Taxes"
          titleClass="fst-italic fw-semibold"
          code={data[0][name]?.independent_revenue?.other_taxes?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.other_taxes
          )}
          isVisible={filterCategories.includes("other_taxes")}
        />
        <AppTableCell
          title="Sales Tax"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.other_taxes?.sales_tax?.code
          }
          values={data.map(
            (item) => item[name]?.independent_revenue?.other_taxes?.sales_tax
          )}
          isVisible={filterCategories.includes("other_taxes")}
        />
        <AppTableCell
          title="Lottery Tax/Licence"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.other_taxes?.loterry_tax_license
              ?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.other_taxes?.loterry_tax_license
          )}
          isVisible={filterCategories.includes("other_taxes")}
        />
        <AppTableCell
          title="Property Tax"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.other_taxes?.property_tax?.code
          }
          values={data.map(
            (item) => item[name]?.independent_revenue?.other_taxes?.property_tax
          )}
          isVisible={filterCategories.includes("other_taxes")}
        />
        <AppTableCell
          title="Capital Gain Taxes"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.other_taxes?.capital_gain_tax
              ?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.other_taxes?.capital_gain_tax
          )}
          isVisible={filterCategories.includes("other_taxes")}
        />
        <AppTableCell
          title="Withholding Taxes"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.other_taxes?.withholding_taxes
              ?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.other_taxes?.withholding_taxes
          )}
          isVisible={filterCategories.includes("other_taxes")}
        />
        <AppTableCell
          title="Other Taxes N.E.C"
          titleClass=""
          code={
            data[0][name]?.independent_revenue?.other_taxes?.other_taxes_nec
              ?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.other_taxes?.other_taxes_nec
          )}
          isVisible={filterCategories.includes("other_taxes")}
        />
        <AppTableCell
          title="Non-Tax Revenue"
          titleClass="fw-semibold"
          code={data[0][name]?.independent_revenue?.non_tax_revenue?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.non_tax_revenue
          )}
          isVisible={filterCategories.includes("non_tax_revenue")}
        />
        <AppTableCell
          title="Licences General"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.licences_general?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.licences_general
          )}
          isVisible={filterCategories.includes("licences_general")}
        />
        <AppTableCell
          title="Fees – General"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.fees_general?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.fees_general
          )}
          isVisible={filterCategories.includes("fees_general")}
        />
        <AppTableCell
          title="Fines – General"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.fines_general?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.fines_general
          )}
          isVisible={filterCategories.includes("fines_general")}
        />
        <AppTableCell
          title="Sales – General"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.sales_general?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.sales_general
          )}
          isVisible={filterCategories.includes("sales_general")}
        />
        <AppTableCell
          title="Earnings – General"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.earnings_general?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.earnings_general
          )}
          isVisible={filterCategories.includes("earnings_general")}
        />
        <AppTableCell
          title="Rent on Government Buildings – General"
          titleClass="fw-semibold fst-italic"
          code={
            data[0][name]?.independent_revenue?.rent_on_gov_buildings_general
              ?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.rent_on_gov_buildings_general
          )}
          isVisible={filterCategories.includes("rent_on_gov_buildings_general")}
        />
        <AppTableCell
          title="Rent on Land and Others – General"
          titleClass="fw-semibold fst-italic"
          code={
            data[0][name]?.independent_revenue?.rent_on_land_and_others_general
              ?.code
          }
          values={data.map(
            (item) =>
              item[name]?.independent_revenue?.rent_on_land_and_others_general
          )}
          isVisible={filterCategories.includes(
            "rent_on_land_and_others_general"
          )}
        />
        <AppTableCell
          title="Repayments"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.repayments?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.repayments
          )}
          isVisible={filterCategories.includes("repayments")}
        />
        <AppTableCell
          title="Investment Income"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.investment_income?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.investment_income
          )}
          isVisible={filterCategories.includes("investment_income")}
        />
        <AppTableCell
          title="Interest Earned"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.interest_earned?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.interest_earned
          )}
          isVisible={filterCategories.includes("interest_earned")}
        />
        <AppTableCell
          title="Reimbursement"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.reimbursement?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.reimbursement
          )}
          isVisible={filterCategories.includes("reimbursement")}
        />
        <AppTableCell
          title="Miscellaneous Income"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.independent_revenue?.miscellaneous_income?.code}
          values={data.map(
            (item) => item[name]?.independent_revenue?.miscellaneous_income
          )}
          isVisible={filterCategories.includes("miscellaneous_income")}
        />
        <AppTableCell
          title="Aids and Grants"
          titleClass="fw-semibold text-underline"
          code={data[0][name]?.aids_grants?.code}
          values={data.map((item) => item[name]?.aids_grants)}
          isVisible={filterCategories.includes("aids_grants")}
        />
        <AppTableCell
          title="Domestic Aids"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.aids_grants?.domestic_aids?.code}
          values={data.map((item) => item[name]?.aids_grants?.domestic_aids)}
          isVisible={filterCategories.includes("domestic_aids")}
        />
        <AppTableCell
          title="Foreign Aids"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.aids_grants?.foreign_aids?.code}
          values={data.map((item) => item[name]?.aids_grants?.foreign_aids)}
          isVisible={filterCategories.includes("foreign_aids")}
        />
        <AppTableCell
          title="Domestic Grants"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.aids_grants?.domestic_grants?.code}
          values={data.map((item) => item[name]?.aids_grants?.domestic_grants)}
          isVisible={filterCategories.includes("domestic_grants")}
        />
        <AppTableCell
          title="Foreign Grants"
          titleClass="fw-semibold fst-italic"
          code={data[0][name]?.aids_grants?.foreign_grants?.code}
          values={data.map((item) => item[name]?.aids_grants?.foreign_grants)}
          isVisible={filterCategories.includes("foreign_grants")}
        />
        <AppTableCell
          title="Capital Development Fund (CDF) Receipts"
          titleClass="fw-semibold text-underline"
          code={data[0][name]?.capital_development_fund_receipts?.code}
          values={data.map(
            (item) => item[name]?.capital_development_fund_receipts
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Other Capital Receipts to CDFs"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.other_capital_receipts_to__CDF?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.other_capital_receipts_to__CDF
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Sale of Fixed Assets"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.sale_of_fixed_assets?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.sale_of_fixed_assets
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Domestic Loans/ Borrowings from Financial Institutions"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.domestic_loans_borrowings_from_financial_institutions?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.domestic_loans_borrowings_from_financial_institutions
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Domestic Loans/ Borrowings from Other Government Entities"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.domestic_loans_borrowings_from_other_government_entities?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.domestic_loans_borrowings_from_other_government_entities
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />

        <AppTableCell
          title="Domestic Loans/ Borrowings from Other Entities/ Organisations"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.international_loans_borrowings_from_financial_institutions?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.domestic_loans_borrowings_from_other_entities_organisations
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />

        <AppTableCell
          title="International Loans/ Borrowings from Financial Institutions"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.international_loans_borrowings_from_financial_institutions?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.international_loans_borrowings_from_financial_institutions
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="International Loans/ Borrowings from Other Government Entities"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.international_loans_borrowings_from_other_government_entities
              ?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.international_loans_borrowings_from_other_government_entities
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="International Loans/ Borrowings from Other Entities/
                  Organisations"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.international_loans_borrowings_from_other_entities_organizations
              ?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.international_loans_borrowings_from_other_entities_organizations
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Foreign Debt Forgiveness"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.foreign_debt_forgiveness?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.foreign_debt_forgiveness
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Domestic Debt Forgiveness"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.domestic_debt_forgiveness?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.domestic_debt_forgiveness
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Gain on Disposal of Asset – PPE"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.gain_on_disposal_of_asset_ppe?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.gain_on_disposal_of_asset_ppe
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Gain on Disposal of Asset - Investment Property"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.gain_on_disposal_of_asset_investment_property?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.gain_on_disposal_of_asset_investment_property
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Minority Interest Share of Surplus"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.minority_interest_share_of_surplus?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts
                ?.minority_interest_share_of_surplus
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Extraordinary Items"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.extraordinary_items?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts?.extraordinary_items
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
        <AppTableCell
          title="Unspecified Revenue"
          code={
            data[0][name]?.capital_development_fund_receipts
              ?.unspecified_revenue?.code
          }
          values={data.map(
            (item) =>
              item[name]?.capital_development_fund_receipts?.unspecified_revenue
          )}
          isVisible={filterCategories.includes(
            "capital_development_fund_receipts"
          )}
        />
      </React.Fragment>
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

export default RevenueByEconomic;
