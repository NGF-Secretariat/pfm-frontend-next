import React from "react";
import { BUDGET_CATEGORIES } from "../../../../static/budget-categories";

const initialValues = ["exp_by_programme_recurrent"];
let filterCategories = [];
const ExpenditureByProgrammeRecurrent = ({ data, categories = [] }) => {
  const [options, setOptions] = React.useState(initialValues);
  filterCategories = categories?.filter((item) => options.includes(item));
  filterCategories = [...new Set(filterCategories)];

  React.useEffect(() => {
    const data = getAllCategories(BUDGET_CATEGORIES[7].children);
    setOptions((prev) => [...prev, ...data]);
    //eslint-disable-next-line
  }, []);

  const name = "exp_by_programme_recurrent";
  if (!filterCategories?.length) return null;
  if (!filterCategories.includes(name)) return null;

  return (
    <React.Fragment>
      <tr className="sticky-top__sub bg-light">
        <td className="sticky-left"></td>
        <td className="sticky-left fw-bold">
          Expenditure by Programme (Recurrent)
        </td>
        {data?.map((_, index) => (
          <td className="category" key={index}>
            {""}
          </td>
        ))}
      </tr>
      <AppTableCell
        titleClass="fw-semibold text-underline"
        title="Total Expenditure"
        code={data[0][name]?.total_expenditure?.default?.code}
        values={data.map((item) => item[name]?.total_expenditure)}
        isVisible
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Agriculture"
        code={data[0][name]?.agriculture?.default?.code || "01"}
        values={data.map((item) => item[name]?.agriculture)}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Effective governance of the Agriculture Sector"
        code={
          data[0][name]?.agriculture?.effective_governance_of_the_agric_sector
            ?.default?.code || "0101"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.effective_governance_of_the_agric_sector
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Legal, policy, regulations and standards, guidelines and protocols development and reviews"
        code={
          data[0][name]?.agriculture?.effective_governance_of_the_agric_sector
            ?.legal_policy_regulations_standard_guidelines_and_protocols_development
            ?.default?.code || "010101"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.effective_governance_of_the_agric_sector
              ?.legal_policy_regulations_standard_guidelines_and_protocols_development
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Agriculture sector coordination mechanisms"
        code={
          data[0][name]?.agriculture?.effective_governance_of_the_agric_sector
            ?.agric_sector_coordination_mechanism?.default?.code || "010102"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.effective_governance_of_the_agric_sector
              ?.agric_sector_coordination_mechanism
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Development of the livestock value chain"
        code={
          data[0][name]?.agriculture?.development_of_livestock_value_chain
            ?.default?.code || "0102"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.development_of_livestock_value_chain
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Ruminant (cattle, sheep & goats) production and marketing"
        code={
          data[0][name]?.agriculture?.development_of_livestock_value_chain
            ?.ruminant_production_and_marketing?.default?.code || "010201"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.development_of_livestock_value_chain
              ?.ruminant_production_and_marketing
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Meat processing and marketing"
        code={
          data[0][name]?.agriculture?.development_of_livestock_value_chain
            ?.meat_processing_and_marketing?.default?.code || "010202"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.development_of_livestock_value_chain
              ?.meat_processing_and_marketing
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Poultry, pig, and micro livestock production"
        code={
          data[0][name]?.agriculture?.development_of_livestock_value_chain
            ?.poultry_pig_and_micro_livestock_production?.default?.code ||
          "010203"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.development_of_livestock_value_chain
              ?.poultry_pig_and_micro_livestock_production
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Dairy development "
        code={
          data[0][name]?.agriculture?.development_of_livestock_value_chain
            ?.dairy_development?.default?.code || "010204"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.development_of_livestock_value_chain
              ?.dairy_development
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Animal health and livestock diseases management"
        code={
          data[0][name]?.agriculture?.development_of_livestock_value_chain
            ?.animal_health_and_livestock_diseases_management?.default?.code ||
          "010205"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.development_of_livestock_value_chain
              ?.animal_health_and_livestock_diseases_management
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Livestock feeds development"
        code={
          data[0][name]?.agriculture?.development_of_livestock_value_chain
            ?.livestock_feeds_development?.default?.code || "010206"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.development_of_livestock_value_chain
              ?.livestock_feeds_development
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Enhancement of food production and productivity"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_food_production_and_productivity?.default?.code ||
          "0103"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_food_production_and_productivity
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Crop value chains and food systems promotion (food and cash crops of state’s comparative advantage)"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_food_production_and_productivity
            ?.crop_value_and_food_system_production?.default?.code || "010301"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_food_production_and_productivity
              ?.crop_value_and_food_system_production
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Intensive crop and vegetable production (irrigation, crop diversification etc.)"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_food_production_and_productivity
            ?.intensive_crop_and_vegetable_production?.default?.code || "010302"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_food_production_and_productivity
              ?.intensive_crop_and_vegetable_production
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Farm inputs supply and service delivery system (improved seeds, fertilizer, agro-chemicals etc.)"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_food_production_and_productivity
            ?.farm_inputs_supply_and_service_delivery_system?.default?.code ||
          "010303"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_food_production_and_productivity
              ?.farm_inputs_supply_and_service_delivery_system
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Reduction of post-harvest losses "
        code={
          data[0][name]?.agriculture?.reduction_of_post_harvest_losses?.default
            ?.code || "0104"
        }
        values={data.map(
          (item) => item[name]?.agriculture?.reduction_of_post_harvest_losses
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Modern technology for post-harvest storage and value addition"
        code={
          data[0][name]?.agriculture?.reduction_of_post_harvest_losses
            ?.modern_tech_for_post_harvest_storage_and_value_addition?.default
            ?.code || "010401"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.reduction_of_post_harvest_losses
              ?.modern_tech_for_post_harvest_storage_and_value_addition
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Buffer stocking and commodity warehousing"
        code={
          data[0][name]?.agriculture?.reduction_of_post_harvest_losses
            ?.buffer_stocking_and_commodity_warehousing?.default?.code ||
          "010402"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.reduction_of_post_harvest_losses
              ?.buffer_stocking_and_commodity_warehousing
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Market linkage"
        code={
          data[0][name]?.agriculture?.reduction_of_post_harvest_losses
            ?.market_linkage?.default?.code || "010403"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.reduction_of_post_harvest_losses
              ?.market_linkage
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Agricultural produce and quality control"
        code={
          data[0][name]?.agriculture?.reduction_of_post_harvest_losses
            ?.agric_produce_and_quality_control?.default?.code || "010404"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture?.reduction_of_post_harvest_losses
              ?.agric_produce_and_quality_control
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Enhancement of fisheries resources development (aquaculture, marine, inland, artisanal)"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_fisheries_resources_and_development?.default
            ?.code || "0105"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_fisheries_resources_and_development
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Commercial aquaculture development (fish production, feed mills development, fishing inputs etc.)"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_fisheries_resources_and_development
            ?.commercial_aquaculture_development?.default?.code || "010501"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_fisheries_resources_and_development
              ?.commercial_aquaculture_development
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Commercial coastal and inland fishing"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_fisheries_resources_and_development
            ?.commercial_coastal_and_inland_fishing?.default?.code || "010502"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_fisheries_resources_and_development
              ?.commercial_coastal_and_inland_fishing
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Fish processing and post-harvest management"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_fisheries_resources_and_development
            ?.fish_processing_and_post_harvest_management?.default?.code ||
          "010503"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_fisheries_resources_and_development
              ?.fish_processing_and_post_harvest_management
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Marine industrial fishing"
        code={
          data[0][name]?.agriculture
            ?.enhancement_of_fisheries_resources_and_development
            ?.marine_inductrial_fishing?.default?.code || "010504"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.enhancement_of_fisheries_resources_and_development
              ?.marine_inductrial_fishing
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Promotion of forest resource conservation and preservation of biodiversity"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_forest_resource_conservation_and_preservation_of_biodiversity
            ?.default?.code || "0106"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_forest_resource_conservation_and_preservation_of_biodiversity
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Forest regeneration and conservation"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_forest_resource_conservation_and_preservation_of_biodiversity
            ?.forest_regeneration_and_conservation?.default?.code || "010601"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_forest_resource_conservation_and_preservation_of_biodiversity
              ?.forest_regeneration_and_conservation
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Eco-tourism development"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_forest_resource_conservation_and_preservation_of_biodiversity
            ?.eco_tourism_development?.default?.code || "010602"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_forest_resource_conservation_and_preservation_of_biodiversity
              ?.eco_tourism_development
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Non-farm forestry livelihood economics empowerment promotion (apiculture, sericulture etc.) programme"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_forest_resource_conservation_and_preservation_of_biodiversity
            ?.non_farm_forestry_livelihood_economics_empowerment_promotion
            ?.default?.code || "010603"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_forest_resource_conservation_and_preservation_of_biodiversity
              ?.non_farm_forestry_livelihood_economics_empowerment_promotion
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Promotion of enabling environment for increased agricultural development "
        code={
          data[0][name]?.agriculture
            ?.promotion_of_enabling_environment_for_increased_agric_development
            ?.default?.code || "0107"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_enabling_environment_for_increased_agric_development
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Integrated rural development (agricultural land development, farm mechanization, & rural infrastructures"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_enabling_environment_for_increased_agric_development
            ?.integrated_rural_development?.default?.code || "010701"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_enabling_environment_for_increased_agric_development
              ?.integrated_rural_development
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Youth and women In agriculture empowerment & smallholder agricultural credit strengthening"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_enabling_environment_for_increased_agric_development
            ?.youth_and_women_in_agriculture_empowerment?.default?.code ||
          "010702"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_enabling_environment_for_increased_agric_development
              ?.youth_and_women_in_agriculture_empowerment
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Agricultural data and statistic management and institutionalisation of information and communication technology (ICT)"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_enabling_environment_for_increased_agric_development
            ?.agricultural_data_and_statistic_management?.default?.code ||
          "010703"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_enabling_environment_for_increased_agric_development
              ?.agricultural_data_and_statistic_management
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Adaptive research, unified and all-inclusive extension services delivery"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_enabling_environment_for_increased_agric_development
            ?.adaptive_research_unified_and_all_inclusive_extension_service_delivery
            ?.default?.code || "010704"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_enabling_environment_for_increased_agric_development
              ?.adaptive_research_unified_and_all_inclusive_extension_service_delivery
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Public Private Partnerships (corporate private sector, NGOs, donors & development partners, farmers organizations)"
        code={
          data[0][name]?.agriculture
            ?.promotion_of_enabling_environment_for_increased_agric_development
            ?.public_private_partnership?.default?.code || "010705"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_enabling_environment_for_increased_agric_development
              ?.public_private_partnership
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Capacity building for stakeholders and professional human resources development "
        code={
          data[0][name]?.agriculture
            ?.promotion_of_enabling_environment_for_increased_agric_development
            ?.capacity_building_for_stakeholders_and_professional?.default
            ?.code || "010706"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.promotion_of_enabling_environment_for_increased_agric_development
              ?.capacity_building_for_stakeholders_and_professional
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Agriculture Sector Expenditures Not Elsewhere Classified"
        code={
          data[0][name]?.agriculture
            ?.agric_sector_expenditures_not_elsewhere_classified?.default
            ?.code || "0110"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.agric_sector_expenditures_not_elsewhere_classified
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass=""
        title="Agriculture Programme Not Elsewhere Classified"
        code={
          data[0][name]?.agriculture
            ?.agric_sector_expenditures_not_elsewhere_classified
            ?.agriculture_programme_not_elsewhere_classified?.default?.code ||
          "011001"
        }
        values={data.map(
          (item) =>
            item[name]?.agriculture
              ?.agric_sector_expenditures_not_elsewhere_classified
              ?.agriculture_programme_not_elsewhere_classified
        )}
        isVisible={filterCategories.includes("agriculture")}
      />
      <AppTableCell
        titleClass="fw-semibold text-warning"
        title="Societal Re-orientation"
        code={data[0][name]?.societal_reorientation?.default?.code || "02"}
        values={data.map((item) => item[name]?.societal_reorientation)}
        isVisible={filterCategories.includes("societal_reorientation")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Societal Re-orientation - General"
        code={
          data[0][name]?.societal_reorientation?.societal_reorientation__general
            ?.default?.code || "0210"
        }
        values={data.map(
          (item) =>
            item[name]?.societal_reorientation?.societal_reorientation__general
        )}
        isVisible={filterCategories.includes("societal_reorientation")}
      />
      <AppTableCell
        titleClass=""
        title="Societal Re-orientation - General"
        code={
          data[0][name]?.societal_reorientation?.societal_reorientation__general
            ?.societal_reorientation__general?.default?.code || "021001"
        }
        values={data.map(
          (item) =>
            item[name]?.societal_reorientation?.societal_reorientation__general
              ?.societal_reorientation__general
        )}
        isVisible={filterCategories.includes("societal_reorientation")}
      />
      <AppTableCell
        titleClass="fw-semibold text-warning"
        title="Poverty Alleviation"
        code={data[0][name]?.poverty_alleviation?.default?.code || "03"}
        values={data.map((item) => item[name]?.poverty_alleviation)}
        isVisible={filterCategories.includes("poverty_alleviation")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Poverty Alleviation - General"
        code={
          data[0][name]?.poverty_alleviation?.poverty_alleviation__general
            ?.default?.code || "0310"
        }
        values={data.map(
          (item) =>
            item[name]?.poverty_alleviation?.poverty_alleviation__general
        )}
        isVisible={filterCategories.includes("poverty_alleviation")}
      />
      <AppTableCell
        titleClass=""
        title="Poverty Alleviation - General"
        code={
          data[0][name]?.poverty_alleviation?.poverty_alleviation__general
            ?.poverty_alleviation__general?.default?.code || "031001"
        }
        values={data.map(
          (item) =>
            item[name]?.poverty_alleviation?.poverty_alleviation__general
              ?.poverty_alleviation__general
        )}
        isVisible={filterCategories.includes("poverty_alleviation")}
      />
      <AppTableCell
        titleClass="text-warning text-underline fw-semibold"
        title="Health "
        code={data[0][name]?.health?.default?.code || "04"}
        values={data.map((item) => item[name]?.health)}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Effective governance of the health system"
        code={
          data[0][name]?.health?.effective_governance_of_the_health_system
            ?.default?.code || "0401"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.effective_governance_of_the_health_system
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Legal, policy, regulations and standards, guidelines and protocols development and reviews"
        code={
          data[0][name]?.health?.effective_governance_of_the_health_system
            ?.legal_policy_regulations_and_standard_guidelines_and_protocols
            ?.default?.code || "040101"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.effective_governance_of_the_health_system
              ?.legal_policy_regulations_and_standard_guidelines_and_protocols
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Human and institutional capacity performance management"
        code={
          data[0][name]?.health?.effective_governance_of_the_health_system
            ?.human_and_institutional_capacity_performance_management?.default
            ?.code || "040102"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.effective_governance_of_the_health_system
              ?.human_and_institutional_capacity_performance_management
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Health sector coordination mechanisms"
        code={
          data[0][name]?.health?.effective_governance_of_the_health_system
            ?.health_coordination_mechanism?.default?.code || "040103"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.effective_governance_of_the_health_system
              ?.health_coordination_mechanism
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Integrated supportive supervision"
        code={
          data[0][name]?.health?.effective_governance_of_the_health_system
            ?.integrated_supportive_supervision?.default?.code || "040104"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.effective_governance_of_the_health_system
              ?.integrated_supportive_supervision
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Community engagement and participation in health"
        code={
          data[0][name]?.health?.community_engagement_and_participation?.default
            ?.code || "0402"
        }
        values={data.map(
          (item) => item[name]?.health?.community_engagement_and_participation
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Community interventions"
        code={
          data[0][name]?.health?.community_engagement_and_participation
            ?.community_interventions?.default?.code || "040201"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.community_engagement_and_participation
              ?.community_interventions
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Community structures"
        code={
          data[0][name]?.health?.community_engagement_and_participation
            ?.community_structures?.default?.code || "040202"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.community_engagement_and_participation
              ?.community_structures
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Enhancement of the delivery of Essential Package of Health Services (EPHS) to all citizens"
        code={
          data[0][name]?.health
            ?.enhancement_of_the_delivery_of_essential_package?.default?.code ||
          "0403"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.enhancement_of_the_delivery_of_essential_package
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Reproductive, maternal and neonatal health"
        code={
          data[0][name]?.health
            ?.enhancement_of_the_delivery_of_essential_package
            ?.reproductive_maternal_and_neonatal_health?.default?.code ||
          "040301"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.enhancement_of_the_delivery_of_essential_package
              ?.reproductive_maternal_and_neonatal_health
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Child health "
        code={
          data[0][name]?.health
            ?.enhancement_of_the_delivery_of_essential_package?.child_health
            ?.default?.code || "040302"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.enhancement_of_the_delivery_of_essential_package
              ?.child_health
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Adolescent health"
        code={
          data[0][name]?.health
            ?.enhancement_of_the_delivery_of_essential_package
            ?.adolescent_health?.default?.code || "040303"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.enhancement_of_the_delivery_of_essential_package
              ?.adolescent_health
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Communicable diseases"
        code={
          data[0][name]?.health
            ?.enhancement_of_the_delivery_of_essential_package
            ?.communicable_diseases?.default?.code || "040304"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.enhancement_of_the_delivery_of_essential_package
              ?.communicable_diseases
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Non-communicable diseases"
        code={
          data[0][name]?.health
            ?.enhancement_of_the_delivery_of_essential_package
            ?.non_communicable_diseases?.default?.code || "040305"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.enhancement_of_the_delivery_of_essential_package
              ?.non_communicable_diseases
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Nutrition"
        code={
          data[0][name]?.health
            ?.enhancement_of_the_delivery_of_essential_package?.nutrition
            ?.default?.code || "040306"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.enhancement_of_the_delivery_of_essential_package
              ?.nutrition
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Emergency services"
        code={
          data[0][name]?.health
            ?.enhancement_of_the_delivery_of_essential_package
            ?.emergency_services?.default?.code || "040307"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.enhancement_of_the_delivery_of_essential_package
              ?.emergency_services
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Provision of the right number and right skill mix of competent, motivated, and productive Human Resources for Health (HRH)"
        code={
          data[0][name]?.health?.provision_of_right_number_and_skill_mix
            ?.default?.code || "0404"
        }
        values={data.map(
          (item) => item[name]?.health?.provision_of_right_number_and_skill_mix
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Pre-service training "
        code={
          data[0][name]?.health?.provision_of_right_number_and_skill_mix
            ?.pre_service__training?.default?.code || "040401"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.provision_of_right_number_and_skill_mix
              ?.pre_service__training
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="HRH Performance management"
        code={
          data[0][name]?.health?.provision_of_right_number_and_skill_mix
            ?.hrh_performance_management?.default?.code || "040402"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.provision_of_right_number_and_skill_mix
              ?.hrh_performance_management
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="In service training (continuing education)"
        code={
          data[0][name]?.health?.provision_of_right_number_and_skill_mix
            ?.inservice_training?.default?.code || "040403"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.provision_of_right_number_and_skill_mix
              ?.inservice_training
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Provision of adequate and modern health infrastructure for health services delivery"
        code={
          data[0][name]?.health
            ?.provision_of_adequate_and_modern_health_infrastructure?.default
            ?.code || "0405"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.provision_of_adequate_and_modern_health_infrastructure
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Functional health facilities"
        code={
          data[0][name]?.health
            ?.provision_of_adequate_and_modern_health_infrastructure
            ?.functional_health_facilities?.default?.code || "040501"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.provision_of_adequate_and_modern_health_infrastructure
              ?.functional_health_facilities
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Planned Preventive Maintenance (PPM) "
        code={
          data[0][name]?.health
            ?.provision_of_adequate_and_modern_health_infrastructure
            ?.planned_preventive_maintenance?.default?.code || "040502"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.provision_of_adequate_and_modern_health_infrastructure
              ?.planned_preventive_maintenance
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Facility electrification, water and sanitation"
        code={
          data[0][name]?.health
            ?.provision_of_adequate_and_modern_health_infrastructure
            ?.facility_electrification?.default?.code || "040503"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.provision_of_adequate_and_modern_health_infrastructure
              ?.facility_electrification
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Provision of quality, affordable, available, and safe medicines, vaccines, and other health commodities"
        code={
          data[0][name]?.health
            ?.provision_of_quality_affordable_available_medicine_vaccines
            ?.default?.code || "0406"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.provision_of_quality_affordable_available_medicine_vaccines
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Sustainable drug supply"
        code={
          data[0][name]?.health
            ?.provision_of_quality_affordable_available_medicine_vaccines
            ?.sustainable_drug_supply?.default?.code || "040601"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.provision_of_quality_affordable_available_medicine_vaccines
              ?.sustainable_drug_supply
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Vaccines supply chain"
        code={
          data[0][name]?.health
            ?.provision_of_quality_affordable_available_medicine_vaccines
            ?.vaccines_supply_chain?.default?.code || "040602"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.provision_of_quality_affordable_available_medicine_vaccines
              ?.vaccines_supply_chain
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Evidence generation and utilisation "
        code={
          data[0][name]?.health?.evidence_generation_and_utilization?.default
            ?.code || "0407"
        }
        values={data.map(
          (item) => item[name]?.health?.evidence_generation_and_utilization
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Routine information system"
        code={
          data[0][name]?.health?.evidence_generation_and_utilization
            ?.routine_information_system?.default?.code || "040701"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.evidence_generation_and_utilization
              ?.routine_information_system
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Surveys and facility assessments"
        code={
          data[0][name]?.health?.evidence_generation_and_utilization
            ?.survey_and_facility_assessments?.default?.code || "040702"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.evidence_generation_and_utilization
              ?.survey_and_facility_assessments
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Research and development (Institutional Review Board, Clinical Trials)"
        code={
          data[0][name]?.health?.evidence_generation_and_utilization
            ?.research_and_development?.default?.code || "040703"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.evidence_generation_and_utilization
              ?.research_and_development
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Monitoring and Evaluation (M&E)"
        code={
          data[0][name]?.health?.evidence_generation_and_utilization
            ?.monitoring_and_evaluation?.default?.code || "040704"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.evidence_generation_and_utilization
              ?.monitoring_and_evaluation
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Institution and maintenance of a responsive public health emergency preparedness system"
        code={
          data[0][name]?.health
            ?.institution_and_maintenance_of_resp_health_emergency?.default
            ?.code || "0408"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.institution_and_maintenance_of_resp_health_emergency
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Integrated national disease surveillance "
        code={
          data[0][name]?.health
            ?.institution_and_maintenance_of_resp_health_emergency
            ?.integrated_national_disease_surveillance?.default?.code ||
          "040801"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.institution_and_maintenance_of_resp_health_emergency
              ?.integrated_national_disease_surveillance
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Public health laboratories"
        code={
          data[0][name]?.health
            ?.institution_and_maintenance_of_resp_health_emergency
            ?.public_health_laboratories?.default?.code || "040802"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.institution_and_maintenance_of_resp_health_emergency
              ?.public_health_laboratories
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Emergency Operation Centres (EOC)"
        code={
          data[0][name]?.health
            ?.institution_and_maintenance_of_resp_health_emergency
            ?.emergency_operation_centres?.default?.code || "040803"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.institution_and_maintenance_of_resp_health_emergency
              ?.emergency_operation_centres
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Provision of universal health coverage and financial risk protection for citizens"
        code={
          data[0][name]?.health?.provision_of_universal_health_coverage?.default
            ?.code || "0409"
        }
        values={data.map(
          (item) => item[name]?.health?.provision_of_universal_health_coverage
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Mobilising equity contributions and vulnerable group funds"
        code={
          data[0][name]?.health?.provision_of_universal_health_coverage
            ?.mobilizing_equity_contribution?.default?.code || "040901"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.provision_of_universal_health_coverage
              ?.mobilizing_equity_contribution
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Mobilising employers’ contributions to the State Social Health Insurance Scheme"
        code={
          data[0][name]?.health?.provision_of_universal_health_coverage
            ?.mobilizing_employers_contribution?.default?.code || "040902"
        }
        values={data.map(
          (item) =>
            item[name]?.health?.provision_of_universal_health_coverage
              ?.mobilizing_employers_contribution
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Health Sector Expenditures Not Elsewhere Classified"
        code={
          data[0][name]?.health
            ?.health_sector_expenditures_not_elsewhere_classified?.default
            ?.code || "0410"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.health_sector_expenditures_not_elsewhere_classified
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass=""
        title="Health Not Elsewhere Classified"
        code={
          data[0][name]?.health
            ?.health_sector_expenditures_not_elsewhere_classified
            ?.health_not_elsewhere_classified?.default?.code || "041001"
        }
        values={data.map(
          (item) =>
            item[name]?.health
              ?.health_sector_expenditures_not_elsewhere_classified
              ?.health_not_elsewhere_classified
        )}
        isVisible={filterCategories.includes("health")}
      />
      <AppTableCell
        titleClass="text-underline fw-semibold text-warning"
        title="Education"
        code={data[0][name]?.education?.default?.code || "05"}
        values={data.map((item) => item[name]?.education)}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Effective governance of the education system"
        code={
          data[0][name]?.education?.effective_governance_of_the_education_system
            ?.default?.code || "0501"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.effective_governance_of_the_education_system
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Legal, policy, regulations and standards, guidelines and protocols development and reviews"
        code={
          data[0][name]?.education?.effective_governance_of_the_education_system
            ?.legal_policy_regulations_and_standards?.default?.code || "050101"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.effective_governance_of_the_education_system
              ?.legal_policy_regulations_and_standards
        )}
        isVisible={filterCategories.includes("education")}
      />

      <AppTableCell
        titleClass=""
        title="Human and institutional capacity performance management"
        code={
          data[0][name]?.education?.effective_governance_of_the_education_system
            ?.human_and_institutional_capacity_performance_management?.default
            ?.code || "050102"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.effective_governance_of_the_education_system
              ?.human_and_institutional_capacity_performance_management
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Education sector coordination mechanisms"
        code={
          data[0][name]?.education?.effective_governance_of_the_education_system
            ?.education_sector_coordination_mechanisms?.default?.code ||
          "050103"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.effective_governance_of_the_education_system
              ?.education_sector_coordination_mechanisms
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Integrated supportive supervision"
        code={
          data[0][name]?.education?.effective_governance_of_the_education_system
            ?.integrated_supportive_supervision?.default?.code || "050104"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.effective_governance_of_the_education_system
              ?.integrated_supportive_supervision
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Increase in access, retention, and completion rate at all levels"
        code={
          data[0][name]?.education?.increase_in_access_retention_completion
            ?.default?.code || "0502"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.increase_in_access_retention_completion
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Early Childhood Care, Development and Education (ECCDE)"
        code={
          data[0][name]?.education?.increase_in_access_retention_completion
            ?.early_childhood_care?.default?.code || "050201"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.increase_in_access_retention_completion
              ?.early_childhood_care
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Advocacy and sensitization"
        code={
          data[0][name]?.education?.increase_in_access_retention_completion
            ?.advocacy_and_sensitization?.default?.code || "050202"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.increase_in_access_retention_completion
              ?.advocacy_and_sensitization
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="School feeding"
        code={
          data[0][name]?.education?.increase_in_access_retention_completion
            ?.school_feeding?.default?.code || "050203"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.increase_in_access_retention_completion
              ?.school_feeding
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="School-based health "
        code={
          data[0][name]?.education?.increase_in_access_retention_completion
            ?.school_based_health?.default?.code || "050204"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.increase_in_access_retention_completion
              ?.school_based_health
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Parental and community support"
        code={
          data[0][name]?.education?.increase_in_access_retention_completion
            ?.parental_and_community_support?.default?.code || "050205"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.increase_in_access_retention_completion
              ?.parental_and_community_support
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Tertiary institutions’ new courses accreditation"
        code={
          data[0][name]?.education?.increase_in_access_retention_completion
            ?.tertiary_institutions_new_courses?.default?.code || "050206"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.increase_in_access_retention_completion
              ?.tertiary_institutions_new_courses
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Equity and inclusiveness in the provision of educational services"
        code={
          data[0][name]?.education
            ?.equity_inclusiveness_in_the_provision_of_eductional_services
            ?.default?.code || "0503"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.equity_inclusiveness_in_the_provision_of_eductional_services
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Inclusive Education"
        code={
          data[0][name]?.education
            ?.equity_inclusiveness_in_the_provision_of_eductional_services
            ?.inclusive_education?.default?.code || "050301"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.equity_inclusiveness_in_the_provision_of_eductional_services
              ?.inclusive_education
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Special education"
        code={
          data[0][name]?.education
            ?.equity_inclusiveness_in_the_provision_of_eductional_services
            ?.special_education?.default?.code || "050302"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.equity_inclusiveness_in_the_provision_of_eductional_services
              ?.special_education
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Nomadic and migrants’ education"
        code={
          data[0][name]?.education
            ?.equity_inclusiveness_in_the_provision_of_eductional_services
            ?.npmadic_and_migrants_education?.default?.code || "050303"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.equity_inclusiveness_in_the_provision_of_eductional_services
              ?.npmadic_and_migrants_education
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Second chance education"
        code={
          data[0][name]?.education
            ?.equity_inclusiveness_in_the_provision_of_eductional_services
            ?.second_chance_education?.default?.code || "050304"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.equity_inclusiveness_in_the_provision_of_eductional_services
              ?.second_chance_education
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Girls/Boys child education"
        code={
          data[0][name]?.education
            ?.equity_inclusiveness_in_the_provision_of_eductional_services
            ?.girls_boys_child_education?.default?.code || "050305"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.equity_inclusiveness_in_the_provision_of_eductional_services
              ?.girls_boys_child_education
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Emergency Response"
        code={
          data[0][name]?.education
            ?.equity_inclusiveness_in_the_provision_of_eductional_services
            ?.emergency_response?.default?.code || "050306"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.equity_inclusiveness_in_the_provision_of_eductional_services
              ?.emergency_response
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Improved quality of teaching and learning outcomes"
        code={
          data[0][name]?.education?.improved_quality_of_teaching_and_learning
            ?.default?.code || "0504"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_quality_of_teaching_and_learning
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="All levels of education quality assurance"
        code={
          data[0][name]?.education?.improved_quality_of_teaching_and_learning
            ?.all_levels_of_education_quality_assurance?.default?.code ||
          "050401"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_quality_of_teaching_and_learning
              ?.all_levels_of_education_quality_assurance
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Instructional and learning materials "
        code={
          data[0][name]?.education?.improved_quality_of_teaching_and_learning
            ?.instructional_and_learning_materials?.default?.code || "050402"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_quality_of_teaching_and_learning
              ?.instructional_and_learning_materials
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Teaching and non-teaching staff capacity building"
        code={
          data[0][name]?.education?.improved_quality_of_teaching_and_learning
            ?.teaching_and_non_teaching_staff_capacity_building?.default
            ?.code || "050403"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_quality_of_teaching_and_learning
              ?.teaching_and_non_teaching_staff_capacity_building
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Curriculum review and development"
        code={
          data[0][name]?.education?.improved_quality_of_teaching_and_learning
            ?.curriculum_review_and_development?.default?.code || "050404"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_quality_of_teaching_and_learning
              ?.curriculum_review_and_development
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Teachers’ recruitment and deployment"
        code={
          data[0][name]?.education?.improved_quality_of_teaching_and_learning
            ?.teachers_recruitment_and_deployment?.default?.code || "050405"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_quality_of_teaching_and_learning
              ?.teachers_recruitment_and_deployment
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="School examination and MLA"
        code={
          data[0][name]?.education?.improved_quality_of_teaching_and_learning
            ?.school_examination_and_mla?.default?.code || "050406"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_quality_of_teaching_and_learning
              ?.school_examination_and_mla
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Adequate infrastructure at all levels"
        code={
          data[0][name]?.education?.adequate_infrastructure_at_all_levels
            ?.default?.code || "0505"
        }
        values={data.map(
          (item) => item[name]?.education?.adequate_infrastructure_at_all_levels
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Schools’ infrastructure construction and rehabilitation "
        code={
          data[0][name]?.education?.adequate_infrastructure_at_all_levels
            ?.school_infrastructure_construction_and_rehabilitation?.default
            ?.code || "050501"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.adequate_infrastructure_at_all_levels
              ?.school_infrastructure_construction_and_rehabilitation
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Furnishing"
        code={
          data[0][name]?.education?.adequate_infrastructure_at_all_levels
            ?.furnishing?.default?.code || "050502"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.adequate_infrastructure_at_all_levels
              ?.furnishing
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Libraries and laboratories"
        code={
          data[0][name]?.education?.adequate_infrastructure_at_all_levels
            ?.libraries_and_laboratories?.default?.code || "050503"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.adequate_infrastructure_at_all_levels
              ?.libraries_and_laboratories
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Water, sanitation and hygiene "
        code={
          data[0][name]?.education?.adequate_infrastructure_at_all_levels
            ?.water_sanitation_and_hygiene?.default?.code || "050504"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.adequate_infrastructure_at_all_levels
              ?.water_sanitation_and_hygiene
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="School safety"
        code={
          data[0][name]?.education?.adequate_infrastructure_at_all_levels
            ?.school_safety?.default?.code || "050505"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.adequate_infrastructure_at_all_levels
              ?.school_safety
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Improved education information management system (EIMS)"
        code={
          data[0][name]?.education?.improved_education_info_management_system
            ?.default?.code || "0506"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_education_info_management_system
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="ICT equipment, software and expertise"
        code={
          data[0][name]?.education?.improved_education_info_management_system
            ?.ict_equipment_software_and_expertise?.default?.code || "050601"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_education_info_management_system
              ?.ict_equipment_software_and_expertise
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Research and development"
        code={
          data[0][name]?.education?.improved_education_info_management_system
            ?.research_and_development?.default?.code || "050602"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_education_info_management_system
              ?.research_and_development
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Data and data management"
        code={
          data[0][name]?.education?.improved_education_info_management_system
            ?.data_and_data_management?.default?.code || "050603"
        }
        values={data.map(
          (item) =>
            item[name]?.education?.improved_education_info_management_system
              ?.data_and_data_management
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Education Sector Expenditures Not Elsewhere Classified"
        code={
          data[0][name]?.education
            ?.education_sector_expenditures_not_elsewhere_classified?.default
            ?.code || "0510"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.education_sector_expenditures_not_elsewhere_classified
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass=""
        title="Education Not Elsewhere Classified"
        code={
          data[0][name]?.education
            ?.education_sector_expenditures_not_elsewhere_classified
            ?.education_not_elsewhere_classified?.default?.code || "051001"
        }
        values={data.map(
          (item) =>
            item[name]?.education
              ?.education_sector_expenditures_not_elsewhere_classified
              ?.education_not_elsewhere_classified
        )}
        isVisible={filterCategories.includes("education")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Housing and Urban Development"
        code={
          data[0][name]?.housing_and_urban_development?.default?.code || "06"
        }
        values={data.map((item) => item[name]?.housing_and_urban_development)}
        isVisible={filterCategories.includes("housing_and_urban_development")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Housing and Urban Development - General"
        code={
          data[0][name]?.housing_and_urban_development
            ?.housing_and_urban_development__general?.default?.code || "0610"
        }
        values={data.map(
          (item) =>
            item[name]?.housing_and_urban_development
              ?.housing_and_urban_development__general
        )}
        isVisible={filterCategories.includes("housing_and_urban_development")}
      />
      <AppTableCell
        titleClass=""
        title="Housing and Urban Development - General"
        code={
          data[0][name]?.housing_and_urban_development
            ?.housing_and_urban_development__general
            ?.housing_and_urban_development__general?.default?.code || "061001"
        }
        values={data.map(
          (item) =>
            item[name]?.housing_and_urban_development
              ?.housing_and_urban_development__general
              ?.housing_and_urban_development__general
        )}
        isVisible={filterCategories.includes("housing_and_urban_development")}
      />
      <AppTableCell
        titleClass="fw-semibold text-warning text-underline"
        title="Gender"
        code={data[0][name]?.gender?.default?.code || "07"}
        values={data.map((item) => item[name]?.gender)}
        isVisible={filterCategories.includes("gender")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Gender - General"
        code={data[0][name]?.gender?.gender__general?.default?.code || "0710"}
        values={data.map((item) => item[name]?.gender?.gender__general)}
        isVisible={filterCategories.includes("gender")}
      />
      <AppTableCell
        titleClass=""
        title="Gender - General"
        code={
          data[0][name]?.gender?.gender__general?.gender__general?.default
            ?.code || "071001"
        }
        values={data.map(
          (item) => item[name]?.gender?.gender__general?.gender__general
        )}
        isVisible={filterCategories.includes("gender")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Youth"
        code={data[0][name]?.youth?.default?.code || "08"}
        values={data.map((item) => item[name]?.youth)}
        isVisible={filterCategories.includes("youth")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Youth - General"
        code={data[0][name]?.youth?.youth__general?.default?.code || "0810"}
        values={data.map((item) => item[name]?.youth?.youth__general)}
        isVisible={filterCategories.includes("youth")}
      />
      <AppTableCell
        titleClass=""
        title="Youth - General"
        code={
          data[0][name]?.youth?.youth__general?.youth__general?.default?.code ||
          "081001"
        }
        values={data.map(
          (item) => item[name]?.youth?.youth__general?.youth__general
        )}
        isVisible={filterCategories.includes("youth")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Environmental Improvement"
        code={data[0][name]?.environmental_improvement?.default?.code || "09"}
        values={data.map((item) => item[name]?.environmental_improvement)}
        isVisible={filterCategories.includes("environmental_improvement")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Environmental Improvement - General"
        code={
          data[0][name]?.environmental_improvement
            ?.environmental_improvement__general?.default?.code || "0910"
        }
        values={data.map(
          (item) =>
            item[name]?.environmental_improvement
              ?.environmental_improvement__general
        )}
        isVisible={filterCategories.includes("environmental_improvement")}
      />
      <AppTableCell
        titleClass=""
        title="Environmental Improvement - General"
        code={
          data[0][name]?.environmental_improvement
            ?.environmental_improvement__general
            ?.environmental_improvement__general?.default?.code || "091001"
        }
        values={data.map(
          (item) =>
            item[name]?.environmental_improvement
              ?.environmental_improvement__general
              ?.environmental_improvement__general
        )}
        isVisible={filterCategories.includes("environmental_improvement")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Water Resources and Rural Development"
        code={
          data[0][name]?.water_resources_and_rural_development?.default?.code ||
          "10"
        }
        values={data.map(
          (item) => item[name]?.water_resources_and_rural_development
        )}
        isVisible={filterCategories.includes(
          "water_resources_and_rural_development"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Water Resources and Rural Deve - General"
        code={
          data[0][name]?.water_resources_and_rural_development
            ?.water_resources_and_rural_development__general?.default?.code ||
          "1010"
        }
        values={data.map(
          (item) =>
            item[name]?.water_resources_and_rural_development
              ?.water_resources_and_rural_development__general
        )}
        isVisible={filterCategories.includes(
          "water_resources_and_rural_development"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Water Resources and Rural Deve - General"
        code={
          data[0][name]?.water_resources_and_rural_development
            ?.water_resources_and_rural_development__general
            ?.water_resources_and_rural_development__general?.default?.code ||
          "101001"
        }
        values={data.map(
          (item) =>
            item[name]?.water_resources_and_rural_development
              ?.water_resources_and_rural_development__general
              ?.water_resources_and_rural_development__general
        )}
        isVisible={filterCategories.includes(
          "water_resources_and_rural_development"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Information Communication and Technology"
        code={
          data[0][name]?.information_communication_and_tech?.default?.code ||
          "11"
        }
        values={data.map(
          (item) => item[name]?.information_communication_and_tech
        )}
        isVisible={filterCategories.includes(
          "information_communication_and_tech"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Information Communication and Technology - General"
        code={
          data[0][name]?.information_communication_and_tech
            ?.information_communication_and_tech__general?.default?.code ||
          "1110"
        }
        values={data.map(
          (item) =>
            item[name]?.information_communication_and_tech
              ?.information_communication_and_tech__general
        )}
        isVisible={filterCategories.includes(
          "information_communication_and_tech"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Information Communication and Technology - General"
        code={
          data[0][name]?.information_communication_and_tech
            ?.information_communication_and_tech__general
            ?.information_communication_and_tech__general?.default?.code ||
          "111001"
        }
        values={data.map(
          (item) =>
            item[name]?.information_communication_and_tech
              ?.information_communication_and_tech__general
              ?.information_communication_and_tech__general
        )}
        isVisible={filterCategories.includes(
          "information_communication_and_tech"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Growing the Private Sector"
        code={data[0][name]?.growing_private_sector?.default?.code || "12"}
        values={data.map((item) => item[name]?.growing_private_sector)}
        isVisible={filterCategories.includes("growing_private_sector")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Growing the Private Sector - General"
        code={
          data[0][name]?.growing_private_sector?.growing_private_sector__general
            ?.default?.code || "1210"
        }
        values={data.map(
          (item) =>
            item[name]?.growing_private_sector?.growing_private_sector__general
        )}
        isVisible={filterCategories.includes("growing_private_sector")}
      />
      <AppTableCell
        titleClass=""
        title="Growing the Private Sector - General"
        code={
          data[0][name]?.growing_private_sector?.growing_private_sector__general
            ?.growing_private_sector__general?.default?.code || "121001"
        }
        values={data.map(
          (item) =>
            item[name]?.growing_private_sector?.growing_private_sector__general
              ?.growing_private_sector__general
        )}
        isVisible={filterCategories.includes("growing_private_sector")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Reform of Government and Governance"
        code={
          data[0][name]?.reform_of_government_and_governance?.default?.code ||
          "13"
        }
        values={data.map(
          (item) => item[name]?.reform_of_government_and_governance
        )}
        isVisible={filterCategories.includes(
          "reform_of_government_and_governance"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Reform of Government and Governance - General"
        code={
          data[0][name]?.reform_of_government_and_governance
            ?.reform_of_government_and_governance__general?.default?.code ||
          "1310"
        }
        values={data.map(
          (item) =>
            item[name]?.reform_of_government_and_governance
              ?.reform_of_government_and_governance__general
        )}
        isVisible={filterCategories.includes(
          "reform_of_government_and_governance"
        )}
      />
      <AppTableCell
        titleClass=""
        title="Reform of Government and Governance - General"
        code={
          data[0][name]?.reform_of_government_and_governance
            ?.reform_of_government_and_governance__general
            ?.reform_of_government_and_governance__general?.default?.code ||
          "131001"
        }
        values={data.map(
          (item) =>
            item[name]?.reform_of_government_and_governance
              ?.reform_of_government_and_governance__general
              ?.reform_of_government_and_governance__general
        )}
        isVisible={filterCategories.includes(
          "reform_of_government_and_governance"
        )}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Power"
        code={data[0][name]?.power?.default?.code || "14"}
        values={data.map((item) => item[name]?.power)}
        isVisible={filterCategories.includes("power")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Power - General"
        code={data[0][name]?.power?.power__general?.default?.code || "1410"}
        values={data.map((item) => item[name]?.power?.power__general)}
        isVisible={filterCategories.includes("power")}
      />
      <AppTableCell
        titleClass=""
        title="Power - General"
        code={
          data[0][name]?.power?.power__general?.power__general?.default?.code ||
          "141001"
        }
        values={data.map(
          (item) => item[name]?.power?.power__general?.power__general
        )}
        isVisible={filterCategories.includes("power")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Rail"
        code={data[0][name]?.rail?.default?.code || "15"}
        values={data.map((item) => item[name]?.rail)}
        isVisible={filterCategories.includes("rail")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Rail"
        code={data[0][name]?.rail?.rail__general?.default?.code || "1510"}
        values={data.map((item) => item[name]?.rail?.rail__general)}
        isVisible={filterCategories.includes("rail")}
      />
      <AppTableCell
        titleClass=""
        title="Rail"
        code={
          data[0][name]?.rail?.rail__general?.rail__general?.default?.code ||
          "151001"
        }
        values={data.map(
          (item) => item[name]?.rail?.rail__general?.rail__general
        )}
        isVisible={filterCategories.includes("rail")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Water Ways"
        code={data[0][name]?.water_ways?.default?.code || "16"}
        values={data.map((item) => item[name]?.water_ways)}
        isVisible={filterCategories.includes("water_ways")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Water Ways - General"
        code={
          data[0][name]?.water_ways?.water_ways__general?.default?.code ||
          "1610"
        }
        values={data.map((item) => item[name]?.water_ways?.water_ways__general)}
        isVisible={filterCategories.includes("water_ways")}
      />
      <AppTableCell
        titleClass=""
        title="Water Ways - General"
        code={
          data[0][name]?.water_ways?.water_ways__general?.water_ways__general
            ?.default?.code || "161001"
        }
        values={data.map(
          (item) =>
            item[name]?.water_ways?.water_ways__general?.water_ways__general
        )}
        isVisible={filterCategories.includes("water_ways")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Road"
        code={data[0][name]?.road?.default?.code || "17"}
        values={data.map((item) => item[name]?.road)}
        isVisible={filterCategories.includes("road")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Road - General"
        code={data[0][name]?.road?.road__general?.default?.code || "1710"}
        values={data.map((item) => item[name]?.road?.road__general)}
        isVisible={filterCategories.includes("road")}
      />
      <AppTableCell
        titleClass=""
        title="Road - General"
        code={
          data[0][name]?.road?.road__general?.road__general?.default?.code ||
          "171001"
        }
        values={data.map(
          (item) => item[name]?.road?.road__general?.road__general
        )}
        isVisible={filterCategories.includes("road")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Airways"
        code={data[0][name]?.airways?.default?.code || "18"}
        values={data.map((item) => item[name]?.airways)}
        isVisible={filterCategories.includes("airways")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Airways - General"
        code={data[0][name]?.airways?.airways__general?.default?.code || "1810"}
        values={data.map((item) => item[name]?.airways?.airways__general)}
        isVisible={filterCategories.includes("airways")}
      />
      <AppTableCell
        titleClass=""
        title="Airways - General"
        code={
          data[0][name]?.airways?.airways__general?.airways__general?.default
            ?.code || "181001"
        }
        values={data.map(
          (item) => item[name]?.airways?.airways__general?.airways__general
        )}
        isVisible={filterCategories.includes("airways")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="COVID-19"
        code={data[0][name]?.covid_19?.default?.code || "19"}
        values={data.map((item) => item[name]?.covid_19)}
        isVisible={filterCategories.includes("covid_19")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="COVID-19 - General"
        code={
          data[0][name]?.covid_19?.covid_19__general?.default?.code || "1910"
        }
        values={data.map((item) => item[name]?.covid_19?.covid_19__general)}
        isVisible={filterCategories.includes("covid_19")}
      />
      <AppTableCell
        titleClass=""
        title="COVID-19 - General"
        code={
          data[0][name]?.covid_19?.covid_19__general?.covid_19__general?.default
            ?.code || "191001"
        }
        values={data.map(
          (item) => item[name]?.covid_19?.covid_19__general?.covid_19__general
        )}
        isVisible={filterCategories.includes("covid_19")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="CLIMATE CHANGE"
        code={data[0][name]?.climate_change?.default?.code || "20"}
        values={data.map((item) => item[name]?.climate_change)}
        isVisible={filterCategories.includes("climate_change")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="CLIMATE CHANGE - General"
        code={
          data[0][name]?.climate_change?.climate_change__general?.default
            ?.code || "2010"
        }
        values={data.map(
          (item) => item[name]?.climate_change?.climate_change__general
        )}
        isVisible={filterCategories.includes("climate_change")}
      />
      <AppTableCell
        titleClass=""
        title="CLIMATE CHANGE - General"
        code={
          data[0][name]?.climate_change?.climate_change__general
            ?.climate_change__general?.default?.code || "201001"
        }
        values={data.map(
          (item) =>
            item[name]?.climate_change?.climate_change__general
              ?.climate_change__general
        )}
        isVisible={filterCategories.includes("climate_change")}
      />
      <AppTableCell
        titleClass="fw-semibold text-underline text-warning"
        title="Oil and Gas Infrastructure"
        code={data[0][name]?.oil_and_gas_infrastructure?.default?.code || "21"}
        values={data.map((item) => item[name]?.oil_and_gas_infrastructure)}
        isVisible={filterCategories.includes("oil_and_gas_infrastructure")}
      />
      <AppTableCell
        titleClass="fw-semibold"
        title="Oil and Gas Infrastructure - General"
        code={
          data[0][name]?.oil_and_gas_infrastructure
            ?.oil_and_gas_infrastructure__general?.default?.code || "2110"
        }
        values={data.map(
          (item) =>
            item[name]?.oil_and_gas_infrastructure
              ?.oil_and_gas_infrastructure__general
        )}
        isVisible={filterCategories.includes("oil_and_gas_infrastructure")}
      />
      <AppTableCell
        titleClass=""
        title="Oil and Gas Infrastructure - General"
        code={
          data[0][name]?.oil_and_gas_infrastructure
            ?.oil_and_gas_infrastructure__general
            ?.oil_and_gas_infrastructure__general?.default?.code || "211001"
        }
        values={data.map(
          (item) =>
            item[name]?.oil_and_gas_infrastructure
              ?.oil_and_gas_infrastructure__general
              ?.oil_and_gas_infrastructure__general
        )}
        isVisible={filterCategories.includes("oil_and_gas_infrastructure")}
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

export default ExpenditureByProgrammeRecurrent;
