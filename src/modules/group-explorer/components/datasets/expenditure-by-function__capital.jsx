import React from "react";
import { BUDGET_CATEGORIES } from "../../../../static/budget-categories";

const initialValues = ["exp_by_func_capital"];
let filterCategories = [];
const ExpenditureByFunctionCapital = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);
  filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES[6].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "exp_by_func_capital";

  if (!filterCategories?.length) return null;
  if (!filterCategories.includes(name)) return null;
  return (
    <React.Fragment>
      <tr className="sticky-top__sub bg-light">
        <td className="sticky-left"></td>
        <td className="sticky-left fw-bold">
          Expenditure by Functions (Capital)
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
        code={data[0][name]?.total_capital_expenditure?.code}
        values={data.map((item) => item[name]?.total_capital_expenditure)}
        isVisible={filterCategories.includes("total_capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="General Public Service (Capital Expenditure)"
        code={data[0][name]?.general_public_service?.code}
        values={data.map((item) => item[name]?.general_public_service)}
        isVisible={filterCategories.includes("general_public_service")}
      />

      <AppTableCell
        titleClass="fw-semibold"
        title="Executive & Legislative Organ, Financial Affairs and External
                  Affairs (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.executive_legislative_organ_financial_external?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.executive_legislative_organ_financial_external
        )}
        isVisible={filterCategories.includes(
          "executive_legislative_organ_financial_external"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Executive Organ and Legislative Organs (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.executive_legislative_organ_financial_external
            ?.executive_organ_and_legislative_organs?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.executive_legislative_organ_financial_external
              ?.executive_organ_and_legislative_organs
        )}
        isVisible={filterCategories.includes(
          "executive_legislative_organ_financial_external"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Financial and Fiscal Affairs (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.executive_legislative_organ_financial_external
            ?.financial_fiscal_affairs?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.executive_legislative_organ_financial_external
              ?.financial_fiscal_affairs
        )}
        isVisible={filterCategories.includes(
          "executive_legislative_organ_financial_external"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Foreign and Economic Aid (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.foreign_economic_aid__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.foreign_economic_aid__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "foreign_economic_aid__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Economic Aid to Developing Countries and Countries in
                  Transition (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.foreign_economic_aid__capital_expenditure
            ?.economic_aid_to_developing_countries_and_countries_in_transition
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.foreign_economic_aid__capital_expenditure
              ?.economic_aid_to_developing_countries_and_countries_in_transition
        )}
        isVisible={filterCategories.includes(
          "foreign_economic_aid__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Economic Aid routed through International Organisations
                  (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.foreign_economic_aid__capital_expenditure
            ?.economic_aid_routed_through_international_organisations?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.foreign_economic_aid__capital_expenditure
              ?.economic_aid_routed_through_international_organisations
        )}
        isVisible={filterCategories.includes(
          "foreign_economic_aid__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="General Services (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.general_services__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.general_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "general_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="General Personnel Services (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.general_services__capital_expenditure?.general_personnel_services
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.general_services__capital_expenditure
              ?.general_personnel_services
        )}
        isVisible={filterCategories.includes(
          "general_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Overall Planning and Statistical Services (Capital
                  Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.general_services__capital_expenditure
            ?.overall_planning_and_statistical_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.general_services__capital_expenditure
              ?.overall_planning_and_statistical_services
        )}
        isVisible={filterCategories.includes(
          "general_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Other General Services (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.general_services__capital_expenditure?.other_general_services
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.general_services__capital_expenditure?.other_general_services
        )}
        isVisible={filterCategories.includes(
          "general_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Basic Research (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.basic_research__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.basic_research__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "basic_research__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Basic Research"
        code={
          data[0][name]?.general_public_service
            ?.basic_research__capital_expenditure?.basic_research?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.basic_research__capital_expenditure?.basic_research
        )}
        isVisible={filterCategories.includes(
          "basic_research__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="R&D General Public Services (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.rd_general_public_services__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.rd_general_public_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "rd_general_public_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="R&D General Public Services"
        code={
          data[0][name]?.general_public_service
            ?.rd_general_public_services__capital_expenditure
            ?.rd_general_public_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.rd_general_public_services__capital_expenditure
              ?.rd_general_public_services
        )}
        isVisible={filterCategories.includes(
          "rd_general_public_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="General Public Services N.E.C (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.general_public_servuces_nec__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.general_public_servuces_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "general_public_servuces_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="General Public Services N.E.C (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.general_public_servuces_nec__capital_expenditure
            ?.general_public_servuces_nec?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.general_public_servuces_nec__capital_expenditure
              ?.general_public_servuces_nec
        )}
        isVisible={filterCategories.includes(
          "general_public_servuces_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Public Debt Transactions (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.public_debt_transactions__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.public_debt_transactions__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "public_debt_transactions__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Public Debt Transactions (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.public_debt_transactions__capital_expenditure
            ?.public_debt_transactions?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.public_debt_transactions__capital_expenditure
              ?.public_debt_transactions
        )}
        isVisible={filterCategories.includes(
          "public_debt_transactions__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Transfer of a General Character between Different Levels of Government (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.transfer_general_character_between_dif_levels_of_gov?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.transfer_general_character_between_dif_levels_of_gov
        )}
        isVisible={filterCategories.includes(
          "transfer_general_character_between_dif_levels_of_gov"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Transfer of a General Character between Different Levels of Government (Capital Expenditure)"
        code={
          data[0][name]?.general_public_service
            ?.transfer_general_character_between_dif_levels_of_gov
            ?.transfer_general_character_between_dif_levels_of_gov?.code
        }
        values={data.map(
          (item) =>
            item[name]?.general_public_service
              ?.transfer_general_character_between_dif_levels_of_gov
              ?.transfer_general_character_between_dif_levels_of_gov
        )}
        isVisible={filterCategories.includes(
          "transfer_general_character_between_dif_levels_of_gov"
        )}
      />
      {/* General Public service Ends */}
      {/* Public Order afety starts */}
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title="Public Order and Safety (Capital Expenditure)"
        code={data[0][name]?.public_order_safety?.code}
        values={data.map((item) => item[name]?.public_order_safety)}
        isVisible={filterCategories.includes("public_order_safety")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Police Services (Capital Expenditure)"
        code={
          data[0][name]?.public_order_safety
            ?.police_services__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.public_order_safety
              ?.police_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "police_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="d"
        title="State Expenditure to Support Police Services (Capital
                  Expenditure)"
        code={
          data[0][name]?.public_order_safety
            ?.police_services__capital_expenditure
            ?.state_expenditure_to_support_police_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.public_order_safety
              ?.police_services__capital_expenditure
              ?.state_expenditure_to_support_police_services
        )}
        isVisible={filterCategories.includes(
          "police_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Fire Protection Services (Capital Expenditure)"
        code={
          data[0][name]?.public_order_safety
            ?.fire_protection_services__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.public_order_safety
              ?.fire_protection_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "fire_protection_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Fire Protection Services (Capital Expenditure)"
        code={
          data[0][name]?.public_order_safety
            ?.fire_protection_services__capital_expenditure
            ?.fire_protection_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.public_order_safety
              ?.fire_protection_services__capital_expenditure
              ?.fire_protection_services
        )}
        isVisible={filterCategories.includes(
          "fire_protection_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Justice & Law Courts (Capital Expenditure)"
        code={
          data[0][name]?.public_order_safety
            ?.justice_law_courts__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.public_order_safety
              ?.justice_law_courts__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "justice_law_courts__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Justice & Law Courts (Capital Expenditure)"
        code={
          data[0][name]?.public_order_safety
            ?.justice_law_courts__capital_expenditure?.justice_law_courts?.code
        }
        values={data.map(
          (item) =>
            item[name]?.public_order_safety
              ?.justice_law_courts__capital_expenditure?.justice_law_courts
        )}
        isVisible={filterCategories.includes(
          "justice_law_courts__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title="Economic Affairs (Capital Expenditure)"
        code={data[0][name]?.economic_affairs?.code}
        values={data.map((item) => item[name]?.economic_affairs)}
        isVisible={filterCategories.includes("economic_affairs")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="General Economic, Commercial and Labour Affairs (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs
            ?.general_economic_commercial_labour_affairs?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.general_economic_commercial_labour_affairs
        )}
        isVisible={filterCategories.includes(
          "general_economic_commercial_labour_affairs"
        )}
      />
      <AppTableCell
        titleClass=""
        title="General Economic and Commercial Affairs (Capital
                  Expenditure)"
        code={
          data[0][name]?.economic_affairs
            ?.general_economic_commercial_labour_affairs
            ?.general_economic_commercial_affairs?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.general_economic_commercial_labour_affairs
              ?.general_economic_commercial_affairs
        )}
        isVisible={filterCategories.includes(
          "general_economic_commercial_labour_affairs"
        )}
      />
      <AppTableCell
        titleClass=""
        title="General Labour Affairs (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs
            ?.general_economic_commercial_labour_affairs
            ?.general_economic_labour_affairs?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.general_economic_commercial_labour_affairs
              ?.general_economic_labour_affairs
        )}
        isVisible={filterCategories.includes(
          "general_economic_commercial_labour_affairs"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Agriculture, Forestry, Fishing and Hunting (Capital
                  Expenditure)"
        code={
          data[0][name]?.economic_affairs
            ?.agriculture_forestry_fishing_hunting__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.agriculture_forestry_fishing_hunting__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "agriculture_forestry_fishing_hunting__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Agriculture (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs
            ?.agriculture_forestry_fishing_hunting__capital_expenditure
            ?.agriculture?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.agriculture_forestry_fishing_hunting__capital_expenditure
              ?.agriculture
        )}
        isVisible={filterCategories.includes(
          "agriculture_forestry_fishing_hunting__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Forestry (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs
            ?.agriculture_forestry_fishing_hunting__capital_expenditure
            ?.forestry?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.agriculture_forestry_fishing_hunting__capital_expenditure
              ?.forestry
        )}
        isVisible={filterCategories.includes(
          "agriculture_forestry_fishing_hunting__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Fishing and Hunting (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs
            ?.agriculture_forestry_fishing_hunting__capital_expenditure
            ?.fishing_and_hunting?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.agriculture_forestry_fishing_hunting__capital_expenditure
              ?.fishing_and_hunting
        )}
        isVisible={filterCategories.includes(
          "agriculture_forestry_fishing_hunting__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Fuel and Energy (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs?.fuel_energy__capital_expenditure.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.fuel_energy__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "fuel_energy__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Coal and Solid Mineral Fuel (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs?.fuel_energy__capital_expenditure
            ?.coal_solid_mineral_fuel.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.fuel_energy__capital_expenditure
              ?.coal_solid_mineral_fuel
        )}
        isVisible={filterCategories.includes(
          "fuel_energy__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Electricity (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs?.fuel_energy__capital_expenditure
            ?.electricity.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.fuel_energy__capital_expenditure
              ?.electricity
        )}
        isVisible={filterCategories.includes(
          "fuel_energy__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Non Electricity Energy (Capital Expenditure)"
        code={
          data[0][name]?.economic_affairs?.fuel_energy__capital_expenditure
            ?.non_electric_energy.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.fuel_energy__capital_expenditure
              ?.non_electric_energy
        )}
        isVisible={filterCategories.includes(
          "fuel_energy__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Mining, Manufacturing and Construction (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.mining_manufacturing_construction__capital_expenditure.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.mining_manufacturing_construction__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "mining_manufacturing_construction__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`State Support to Mining Resources other than mineral fuels (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.mining_manufacturing_construction__capital_expenditure
            ?.state_support_to_mining_resources_other_than_mineral_fuels.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.mining_manufacturing_construction__capital_expenditure
              ?.state_support_to_mining_resources_other_than_mineral_fuels
        )}
        isVisible={filterCategories.includes(
          "mining_manufacturing_construction__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Manufacturing (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.mining_manufacturing_construction__capital_expenditure
            ?.manufacturing.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.mining_manufacturing_construction__capital_expenditure
              ?.manufacturing
        )}
        isVisible={filterCategories.includes(
          "mining_manufacturing_construction__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Construction (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.mining_manufacturing_construction__capital_expenditure
            ?.construction.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.mining_manufacturing_construction__capital_expenditure
              ?.construction
        )}
        isVisible={filterCategories.includes(
          "mining_manufacturing_construction__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Transport (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.transport__capital_expenditure.code
        }
        values={data.map(
          (item) => item[name]?.economic_affairs?.transport__capital_expenditure
        )}
        isVisible={filterCategories.includes("transport__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`Road Transport (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.transport__capital_expenditure?.road
            .code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.transport__capital_expenditure?.road
        )}
        isVisible={filterCategories.includes("transport__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`Water Transport (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.transport__capital_expenditure?.water
            .code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.transport__capital_expenditure?.water
        )}
        isVisible={filterCategories.includes("transport__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`Railway Transport (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.transport__capital_expenditure
            ?.railway.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.transport__capital_expenditure
              ?.railway
        )}
        isVisible={filterCategories.includes("transport__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`Air Transport (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.transport__capital_expenditure?.air
            .code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.transport__capital_expenditure?.air
        )}
        isVisible={filterCategories.includes("transport__capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Communication (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.communication__capital_expenditure
            .code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.communication__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "communication__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Communication (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.communication__capital_expenditure
            ?.communication.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.communication__capital_expenditure
              ?.communication
        )}
        isVisible={filterCategories.includes(
          "communication__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Other Industries (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.other_inductries__capital_expenditure
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.other_inductries__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "other_inductries__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Distributive Trade, Storage and Warehousing (Capital
                  Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.other_inductries__capital_expenditure
            ?.distributive_trade_storage_and_warehousing?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.other_inductries__capital_expenditure
              ?.distributive_trade_storage_and_warehousing
        )}
        isVisible={filterCategories.includes(
          "other_inductries__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Hotel and Restaurants (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.other_inductries__capital_expenditure
            ?.hotel_and_restaurants?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.other_inductries__capital_expenditure
              ?.hotel_and_restaurants
        )}
        isVisible={filterCategories.includes(
          "other_inductries__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Tourism (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.other_inductries__capital_expenditure
            ?.tourism?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.other_inductries__capital_expenditure
              ?.tourism
        )}
        isVisible={filterCategories.includes(
          "other_inductries__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Multipurpose Development Projects (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs?.other_inductries__capital_expenditure
            ?.multipurpose_development_projects?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs?.other_inductries__capital_expenditure
              ?.multipurpose_development_projects
        )}
        isVisible={filterCategories.includes(
          "other_inductries__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`R&D Economic Affairs (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.ed_economic_affairs__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.ed_economic_affairs__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "ed_economic_affairs__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D General Economic, Commercial and Labour Affairs (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.ed_economic_affairs__capital_expenditure
            ?.rd_general_economic_commercial_labour_affairs?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.ed_economic_affairs__capital_expenditure
              ?.rd_general_economic_commercial_labour_affairs
        )}
        isVisible={filterCategories.includes(
          "ed_economic_affairs__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Agriculture, Forestry, Fishing and Hunting (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.ed_economic_affairs__capital_expenditure
            ?.rd_agriculture_forestry_fishing_hunting?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.ed_economic_affairs__capital_expenditure
              ?.rd_agriculture_forestry_fishing_hunting
        )}
        isVisible={filterCategories.includes(
          "ed_economic_affairs__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Fuel and Energy (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.ed_economic_affairs__capital_expenditure?.rd_fuel_energy?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.ed_economic_affairs__capital_expenditure?.rd_fuel_energy
        )}
        isVisible={filterCategories.includes(
          "ed_economic_affairs__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Mining, Manufacturing and Construction (Capital
                  Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.ed_economic_affairs__capital_expenditure
            ?.rd_mining_manufacturing_construction?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.ed_economic_affairs__capital_expenditure
              ?.rd_mining_manufacturing_construction
        )}
        isVisible={filterCategories.includes(
          "ed_economic_affairs__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Transport (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.ed_economic_affairs__capital_expenditure?.rd_transport?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.ed_economic_affairs__capital_expenditure?.rd_transport
        )}
        isVisible={filterCategories.includes(
          "ed_economic_affairs__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Communication (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.ed_economic_affairs__capital_expenditure?.rd_communication?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.ed_economic_affairs__capital_expenditure?.rd_communication
        )}
        isVisible={filterCategories.includes(
          "ed_economic_affairs__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Other Industries (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.ed_economic_affairs__capital_expenditure?.rd_other_industries
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.ed_economic_affairs__capital_expenditure?.rd_other_industries
        )}
        isVisible={filterCategories.includes(
          "ed_economic_affairs__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Economic Affairs N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.economic_affairs_nec__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.economic_affairs_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "economic_affairs_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Economic Affairs N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.economic_affairs
            ?.economic_affairs_nec__capital_expenditure?.economic_affairs_nec
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.economic_affairs
              ?.economic_affairs_nec__capital_expenditure?.economic_affairs_nec
        )}
        isVisible={filterCategories.includes(
          "economic_affairs_nec__capital_expenditure"
        )}
      />
      {/* Economic affairs ends */}
      {/* Environmental protection starts */}
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title={`Environmental Protection (Capital Expenditure)`}
        code={data[0][name]?.evironmental_protection?.code}
        values={data.map((item) => item[name]?.evironmental_protection)}
        isVisible={filterCategories.includes("evironmental_protection")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Waste Management (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.waste_management__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.waste_management__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "waste_management__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Waste Management (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.waste_management__capital_expenditure?.waste_management?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.waste_management__capital_expenditure?.waste_management
        )}
        isVisible={filterCategories.includes(
          "waste_management__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Waste Water Management (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.waste_water_management__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.waste_water_management__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "waste_water_management__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Waste Water Management (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.waste_water_management__capital_expenditure
            ?.waste_water_management?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.waste_water_management__capital_expenditure
              ?.waste_water_management
        )}
        isVisible={filterCategories.includes(
          "waste_water_management__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Pollution Abatement (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.pollution_abatement__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.pollution_abatement__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "pollution_abatement__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Pollution Abatement (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.pollution_abatement__capital_expenditure?.pollution_abatement
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.pollution_abatement__capital_expenditure?.pollution_abatement
        )}
        isVisible={filterCategories.includes(
          "pollution_abatement__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Protection of Biodiversity and Landscape (Capital
                  Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.protection_biodiversity_landscape__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.protection_biodiversity_landscape__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "protection_biodiversity_landscape__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Protection of Biodiversity and Landscape (Capital
                  Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.protection_biodiversity_landscape__capital_expenditure
            ?.protection_biodiversity_landscape?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.protection_biodiversity_landscape__capital_expenditure
              ?.protection_biodiversity_landscape
        )}
        isVisible={filterCategories.includes(
          "protection_biodiversity_landscape__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`R&D Environmental Protection (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.rd_environmental_protection__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.rd_environmental_protection__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "rd_environmental_protection__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Environmental Protection (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.rd_environmental_protection__capital_expenditure
            ?.rd_environmental_protection?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.rd_environmental_protection__capital_expenditure
              ?.rd_environmental_protection
        )}
        isVisible={filterCategories.includes(
          "rd_environmental_protection__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Environmental Protection N.E.C. (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.environmental_protection_nec__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.environmental_protection_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "environmental_protection_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Environmental Protection N.E.C. (Capital Expenditure)`}
        code={
          data[0][name]?.evironmental_protection
            ?.environmental_protection_nec__capital_expenditure
            ?.environmental_protection_nec?.code
        }
        values={data.map(
          (item) =>
            item[name]?.evironmental_protection
              ?.environmental_protection_nec__capital_expenditure
              ?.environmental_protection_nec
        )}
        isVisible={filterCategories.includes(
          "environmental_protection_nec__capital_expenditure"
        )}
      />
      {/* Environmental protection ends */}
      {/* Housing community starts */}
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title={`Housing and Community Amenities (Capital Expenditure)`}
        code={data[0][name]?.housing_community_amenities?.code}
        values={data.map((item) => item[name]?.housing_community_amenities)}
        isVisible={filterCategories.includes("housing_community_amenities")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Housing Development (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.housing_development__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.housing_development__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "housing_development__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Housing Development (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.housing_development__capital_expenditure?.housing_development
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.housing_development__capital_expenditure?.housing_development
        )}
        isVisible={filterCategories.includes(
          "housing_development__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Community Development (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.community_development__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.community_development__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "community_development__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Community Development (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.community_development__capital_expenditure?.community_development
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.community_development__capital_expenditure
              ?.community_development
        )}
        isVisible={filterCategories.includes(
          "community_development__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Water Supply (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.water_supply__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.water_supply__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "water_supply__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Water Supply (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.water_supply__capital_expenditure?.water_supply?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.water_supply__capital_expenditure?.water_supply
        )}
        isVisible={filterCategories.includes(
          "water_supply__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Street Lighting (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.street_light__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.street_light__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "street_light__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Street Lighting (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.street_light__capital_expenditure?.street_light?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.street_light__capital_expenditure?.street_light
        )}
        isVisible={filterCategories.includes(
          "street_light__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`R&D Housing and Community Amenities (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.rd_housing_community_amenities__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.rd_housing_community_amenities__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "rd_housing_community_amenities__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Housing and Community Amenities (Capital Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.rd_housing_community_amenities__capital_expenditure
            ?.rd_housing_community_amenities?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.rd_housing_community_amenities__capital_expenditure
              ?.rd_housing_community_amenities
        )}
        isVisible={filterCategories.includes(
          "rd_housing_community_amenities__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Housing and Community Amenities N. E. C (Capital
                  Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.housing_community_amenities_nec__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.housing_community_amenities_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "housing_community_amenities_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Housing and Community Amenities N. E. C (Capital
                  Expenditure)`}
        code={
          data[0][name]?.housing_community_amenities
            ?.housing_community_amenities_nec__capital_expenditure
            ?.housing_community_amenities_nec?.code
        }
        values={data.map(
          (item) =>
            item[name]?.housing_community_amenities
              ?.housing_community_amenities_nec__capital_expenditure
              ?.housing_community_amenities_nec
        )}
        isVisible={filterCategories.includes(
          "housing_community_amenities_nec__capital_expenditure"
        )}
      />
      {/* Housing community ends */}
      {/* Health starts */}
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title={`Health (Capital Expenditure)`}
        code={data[0][name]?.health?.code}
        values={data.map((item) => item[name]?.health)}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Medical Products, Appliances and Equipment (Capital
                  Expenditure)`}
        code={
          data[0][name]?.health
            ?.medical_products_appliances_equiptment__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.medical_products_appliances_equiptment__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "medical_products_appliances_equiptment__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Pharmaceutical Products (Capital
                  Expenditure)`}
        code={
          data[0][name]?.health
            ?.medical_products_appliances_equiptment__capital_expenditure
            ?.pharmaceutical_products?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.medical_products_appliances_equiptment__capital_expenditure
              ?.pharmaceutical_products
        )}
        isVisible={filterCategories.includes(
          "medical_products_appliances_equiptment__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Other Medical Products (Capital Expenditure)`}
        code={
          data[0][name]?.health
            ?.medical_products_appliances_equiptment__capital_expenditure
            ?.other_medical_products?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.medical_products_appliances_equiptment__capital_expenditure
              ?.other_medical_products
        )}
        isVisible={filterCategories.includes(
          "medical_products_appliances_equiptment__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Therapeutic Appliances and Equipment (Capital Expenditure)`}
        code={
          data[0][name]?.health
            ?.medical_products_appliances_equiptment__capital_expenditure
            ?.therapeutic_appliances_and_equipment?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.medical_products_appliances_equiptment__capital_expenditure
              ?.therapeutic_appliances_and_equipment
        )}
        isVisible={filterCategories.includes(
          "medical_products_appliances_equiptment__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Outpatient Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.outpatient_services__capital_expenditure?.code
        }
        values={data.map(
          (item) => item[name]?.health?.outpatient_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "outpatient_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`General Medical Services`}
        code={
          data[0][name]?.health?.outpatient_services__capital_expenditure
            ?.general_medical_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.outpatient_services__capital_expenditure
              ?.general_medical_services
        )}
        isVisible={filterCategories.includes(
          "outpatient_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Specialized Medical Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.outpatient_services__capital_expenditure
            ?.specialized_medical_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.outpatient_services__capital_expenditure
              ?.specialized_medical_services
        )}
        isVisible={filterCategories.includes(
          "outpatient_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Dental Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.outpatient_services__capital_expenditure
            ?.dental_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.outpatient_services__capital_expenditure
              ?.dental_services
        )}
        isVisible={filterCategories.includes(
          "outpatient_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Paramedical Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.outpatient_services__capital_expenditure
            ?.paramedical_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.outpatient_services__capital_expenditure
              ?.paramedical_services
        )}
        isVisible={filterCategories.includes(
          "outpatient_services__capital_expenditure"
        )}
      />

      <AppTableCell
        titleClass="fw-semibold"
        title={`Hospital Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.hospital_services__capital_expenditure?.code
        }
        values={data.map(
          (item) => item[name]?.health?.hospital_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "hospital_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`General Hospital Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.hospital_services__capital_expenditure
            ?.general_hospital_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.hospital_services__capital_expenditure
              ?.general_hospital_services
        )}
        isVisible={filterCategories.includes(
          "hospital_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Specialized Hospital Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.hospital_services__capital_expenditure
            ?.specialized_hospital_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.hospital_services__capital_expenditure
              ?.specialized_hospital_services
        )}
        isVisible={filterCategories.includes(
          "hospital_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Medical and Maternity Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.hospital_services__capital_expenditure
            ?.medical_and_maternity_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.hospital_services__capital_expenditure
              ?.medical_and_maternity_services
        )}
        isVisible={filterCategories.includes(
          "hospital_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Nursing and Convalescent Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.hospital_services__capital_expenditure
            ?.nursing_and_convalescent_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.hospital_services__capital_expenditure
              ?.nursing_and_convalescent_services
        )}
        isVisible={filterCategories.includes(
          "hospital_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Public Health Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.public_health_services__capital_expenditure
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.public_health_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "public_health_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Public Health Services (Capital Expenditure)`}
        code={
          data[0][name]?.health?.public_health_services__capital_expenditure
            ?.public_health_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.public_health_services__capital_expenditure
              ?.public_health_services
        )}
        isVisible={filterCategories.includes(
          "public_health_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`R&D Health (Capital Expenditure)`}
        code={data[0][name]?.health?.rd_health__capital_expenditure?.code}
        values={data.map(
          (item) => item[name]?.health?.rd_health__capital_expenditure
        )}
        isVisible={filterCategories.includes("rd_health__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Health (Capital Expenditure)`}
        code={
          data[0][name]?.health?.rd_health__capital_expenditure?.rd_health?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.rd_health__capital_expenditure?.rd_health
        )}
        isVisible={filterCategories.includes("rd_health__capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Health N. E. C (Capital Expenditure)`}
        code={data[0][name]?.health?.health_nec__capital_expenditure?.code}
        values={data.map(
          (item) => item[name]?.health?.health_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes("health_nec__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`Health N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.health?.health_nec__capital_expenditure?.health_nec
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.health?.health_nec__capital_expenditure?.health_nec
        )}
        isVisible={filterCategories.includes("health_nec__capital_expenditure")}
      />
      {/* Healty ends */}
      {/* Recreation starts */}
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title={`Recreation, Culture and Religion (Capital Expenditure)`}
        code={data[0][name]?.recreation_culture_religon?.code}
        values={data.map((item) => item[name]?.recreation_culture_religon)}
        isVisible={filterCategories.includes("recreation_culture_religon")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Recreational and Sporting Services (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.recreational_sporting_services__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.recreational_sporting_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "recreational_sporting_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Recreational and Sporting Services (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.recreational_sporting_services__capital_expenditure
            ?.recreational_sporting_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.recreational_sporting_services__capital_expenditure
              ?.recreational_sporting_services
        )}
        isVisible={filterCategories.includes(
          "recreational_sporting_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Cultural Services (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.cultural_services__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.cultural_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "cultural_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Cultural Services (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.cultural_services__capital_expenditure?.cultural_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.cultural_services__capital_expenditure?.cultural_services
        )}
        isVisible={filterCategories.includes(
          "cultural_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Broadcasting and Publishing Services (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.broadcasting_publishing_services__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.broadcasting_publishing_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "broadcasting_publishing_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Broadcasting and Publishing Services (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.broadcasting_publishing_services__capital_expenditure
            ?.broadcasting_publishing_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.broadcasting_publishing_services__capital_expenditure
              ?.broadcasting_publishing_services
        )}
        isVisible={filterCategories.includes(
          "broadcasting_publishing_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Religious and Other Community Services (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.religous_other_community_services__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.religous_other_community_services__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "religous_other_community_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Religious and Other Community Services (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.religous_other_community_services__capital_expenditure
            ?.religous_other_community_services?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.religous_other_community_services__capital_expenditure
              ?.religous_other_community_services
        )}
        isVisible={filterCategories.includes(
          "religous_other_community_services__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`R&D Recreation, Culture and Religion (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.rd_recreation_culture_religon__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.rd_recreation_culture_religon__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "rd_recreation_culture_religon__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Recreation, Culture and Religion (Capital Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.rd_recreation_culture_religon__capital_expenditure
            ?.rd_recreation_culture_religon?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.rd_recreation_culture_religon__capital_expenditure
              ?.rd_recreation_culture_religon
        )}
        isVisible={filterCategories.includes(
          "rd_recreation_culture_religon__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Recreation, Culture and Religion N. E. C (Capital
                  Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.recreation_culture_religon_nec__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.recreation_culture_religon_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "recreation_culture_religon_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Recreation, Culture and Religion N. E. C (Capital
                  Expenditure)`}
        code={
          data[0][name]?.recreation_culture_religon
            ?.recreation_culture_religon_nec__capital_expenditure
            ?.recreation_culture_religon_nec?.code
        }
        values={data.map(
          (item) =>
            item[name]?.recreation_culture_religon
              ?.recreation_culture_religon_nec__capital_expenditure
              ?.recreation_culture_religon_nec
        )}
        isVisible={filterCategories.includes(
          "recreation_culture_religon_nec__capital_expenditure"
        )}
      />
      {/* Recreation ends */}
      {/* Education starts */}
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title={`Education (Capital Expenditure)`}
        code={data[0][name]?.education?.code}
        values={data.map((item) => item[name]?.education)}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Pre-Primary and Primary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education
            ?.preprimary_primary_education__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.preprimary_primary_education__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "preprimary_primary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Pre-Primary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education
            ?.preprimary_primary_education__capital_expenditure
            ?.pre_primary_education?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.preprimary_primary_education__capital_expenditure
              ?.pre_primary_education
        )}
        isVisible={filterCategories.includes(
          "preprimary_primary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Primary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education
            ?.preprimary_primary_education__capital_expenditure
            ?.primary_education?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.preprimary_primary_education__capital_expenditure
              ?.primary_education
        )}
        isVisible={filterCategories.includes(
          "preprimary_primary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Secondary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education?.secondary_education__capital_expenditure
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education?.secondary_education__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "secondary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Junior Secondary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education?.secondary_education__capital_expenditure
            ?.junior_secondary?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education?.secondary_education__capital_expenditure
              ?.junior_secondary
        )}
        isVisible={filterCategories.includes(
          "secondary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Senior Secondary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education?.secondary_education__capital_expenditure
            ?.senior_secondary?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education?.secondary_education__capital_expenditure
              ?.senior_secondary
        )}
        isVisible={filterCategories.includes(
          "secondary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Post-Secondary and Non Tertiary Education (Capital
                  Expenditure)`}
        code={
          data[0][name]?.education
            ?.postsecondary_nontetiary_education__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.postsecondary_nontetiary_education__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "postsecondary_nontetiary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Post-Secondary and Non Tertiary Education (Capital
                  Expenditure)`}
        code={
          data[0][name]?.education
            ?.postsecondary_nontetiary_education__capital_expenditure
            ?.postsecondary_nontetiary_education?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.postsecondary_nontetiary_education__capital_expenditure
              ?.postsecondary_nontetiary_education
        )}
        isVisible={filterCategories.includes(
          "postsecondary_nontetiary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Tertiary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education?.tetiary_education__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education?.tetiary_education__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "tetiary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`First Stage of Tertiary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education?.tetiary_education__capital_expenditure
            ?.first_stage_of_tertiary_education?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education?.tetiary_education__capital_expenditure
              ?.first_stage_of_tertiary_education
        )}
        isVisible={filterCategories.includes(
          "tetiary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Second Stage of Tertiary Education (Capital Expenditure)`}
        code={
          data[0][name]?.education?.tetiary_education__capital_expenditure
            ?.second_stage_of_tertiary_education?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education?.tetiary_education__capital_expenditure
              ?.second_stage_of_tertiary_education
        )}
        isVisible={filterCategories.includes(
          "tetiary_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Education Not Definable by Level (Capital Expenditure)`}
        code={
          data[0][name]?.education
            ?.education_nondefinable_by_level__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.education_nondefinable_by_level__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "education_nondefinable_by_level__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Education Not Definable by Level (Capital Expenditure)`}
        code={
          data[0][name]?.education
            ?.education_nondefinable_by_level__capital_expenditure
            ?.education_nondefinable_by_level?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.education_nondefinable_by_level__capital_expenditure
              ?.education_nondefinable_by_level
        )}
        isVisible={filterCategories.includes(
          "education_nondefinable_by_level__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Subsidiary Services to Education (Capital Expenditure)`}
        code={
          data[0][name]?.education
            ?.subsidiary_services_to_education__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.subsidiary_services_to_education__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "subsidiary_services_to_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Subsidiary Services to Education (Capital Expenditure)`}
        code={
          data[0][name]?.education
            ?.subsidiary_services_to_education__capital_expenditure
            ?.subsidiary_services_to_education?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.subsidiary_services_to_education__capital_expenditure
              ?.subsidiary_services_to_education
        )}
        isVisible={filterCategories.includes(
          "subsidiary_services_to_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`R&D Education (Capital Expenditure)`}
        code={data[0][name]?.education?.rd_education__capital_expenditure?.code}
        values={data.map(
          (item) => item[name]?.education?.rd_education__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "rd_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Education (Capital Expenditure)`}
        code={
          data[0][name]?.education?.rd_education__capital_expenditure
            ?.rd_education?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education?.rd_education__capital_expenditure
              ?.rd_education
        )}
        isVisible={filterCategories.includes(
          "rd_education__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Education N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.education?.education_nec__capital_expenditure?.code
        }
        values={data.map(
          (item) => item[name]?.education?.education_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "education_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Education N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.education?.education_nec__capital_expenditure
            ?.education_nec?.code
        }
        values={data.map(
          (item) =>
            item[name]?.education?.education_nec__capital_expenditure
              ?.education_nec
        )}
        isVisible={filterCategories.includes(
          "education_nec__capital_expenditure"
        )}
      />
      {/* Education Ends */}
      {/* Social protection starts */}
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title={`Social Protection (Capital Expenditure)`}
        code={data[0][name]?.social_protection?.code}
        values={data.map((item) => item[name]?.social_protection)}
        isVisible={filterCategories.includes("social_protection")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Sickness and Disability (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.sickness_disability__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.sickness_disability__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "sickness_disability__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Sickness (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.sickness_disability__capital_expenditure?.sickness?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.sickness_disability__capital_expenditure?.sickness
        )}
        isVisible={filterCategories.includes(
          "sickness_disability__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Disability (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.sickness_disability__capital_expenditure?.disability?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.sickness_disability__capital_expenditure?.disability
        )}
        isVisible={filterCategories.includes(
          "sickness_disability__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Old Age (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection?.old_age__capital_expenditure?.code
        }
        values={data.map(
          (item) => item[name]?.social_protection?.old_age__capital_expenditure
        )}
        isVisible={filterCategories.includes("old_age__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`Old Age (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection?.old_age__capital_expenditure
            ?.old_age?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection?.old_age__capital_expenditure?.old_age
        )}
        isVisible={filterCategories.includes("old_age__capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Survivors (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection?.survivors__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection?.survivors__capital_expenditure
        )}
        isVisible={filterCategories.includes("survivors__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`Survivors (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection?.survivors__capital_expenditure
            ?.survivors?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection?.survivors__capital_expenditure
              ?.survivors
        )}
        isVisible={filterCategories.includes("survivors__capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Family and Children (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.family_and_children__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.family_and_children__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "family_and_children__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Family and Children (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.family_and_children__capital_expenditure?.family_and_children
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.family_and_children__capital_expenditure?.family_and_children
        )}
        isVisible={filterCategories.includes(
          "family_and_children__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Unemployment (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection?.unemployment__capital_expenditure
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection?.unemployment__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "unemployment__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Unemployment (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection?.unemployment__capital_expenditure
            ?.unemployment?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection?.unemployment__capital_expenditure
              ?.unemployment
        )}
        isVisible={filterCategories.includes(
          "unemployment__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Housing (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection?.housing__capital_expenditure?.code
        }
        values={data.map(
          (item) => item[name]?.social_protection?.housing__capital_expenditure
        )}
        isVisible={filterCategories.includes("housing__capital_expenditure")}
      />
      <AppTableCell
        titleClass=""
        title={`Housing (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection?.housing__capital_expenditure
            ?.housing?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection?.housing__capital_expenditure?.housing
        )}
        isVisible={filterCategories.includes("housing__capital_expenditure")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Social Exclusion N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.social_exclusion_nec__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.social_exclusion_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "social_exclusion_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Social Exclusion N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.social_exclusion_nec__capital_expenditure?.social_exclusion_nec
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.social_exclusion_nec__capital_expenditure?.social_exclusion_nec
        )}
        isVisible={filterCategories.includes(
          "social_exclusion_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`R&D Social Protection (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.rd_social_protection__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.rd_social_protection__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "rd_social_protection__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`R&D Social Protection (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.rd_social_protection__capital_expenditure?.rd_social_protection
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.rd_social_protection__capital_expenditure?.rd_social_protection
        )}
        isVisible={filterCategories.includes(
          "rd_social_protection__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title={`Social Protection N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.social_protection_nec__capital_expenditure?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.social_protection_nec__capital_expenditure
        )}
        isVisible={filterCategories.includes(
          "social_protection_nec__capital_expenditure"
        )}
      />
      <AppTableCell
        titleClass=""
        title={`Social Protection N. E. C (Capital Expenditure)`}
        code={
          data[0][name]?.social_protection
            ?.social_protection_nec__capital_expenditure?.social_protection_nec
            ?.code
        }
        values={data.map(
          (item) =>
            item[name]?.social_protection
              ?.social_protection_nec__capital_expenditure
              ?.social_protection_nec
        )}
        isVisible={filterCategories.includes(
          "social_protection_nec__capital_expenditure"
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

export default ExpenditureByFunctionCapital;
