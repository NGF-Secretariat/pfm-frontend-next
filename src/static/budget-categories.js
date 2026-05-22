const ALL_CATEGORIES = [
  {
    label: "Revenue by economic",
    value: "revenue_by_economic",
    children: [
      {
        label: "Total Revenue",
        value: "total_revenue",
        children: [
          {
            label: "Government Share of Federation Revenue (FAAC)",
            value: "government_share_of_federation_revenue_faac",
            children: [],
          },
          {
            label: "State Government Share of Statutory Allocation",
            value: "state_government_share_of_statutory_allocation",
            children: [],
          },
          {
            label: "Government Share of Value Added Tax (VAT)",
            value: "government_share_of_value_added_tax_vat",
            children: [],
          },
          {
            label: "Government Share of Other Federation Revenues",
            value: "government_share_of_other_federation_revenues",
            children: [],
          },
        ],
      },
      {
        label: "Independent Revenue (Internally Generated Revenue)",
        value: "independent_revenue",
        children: [
          {
            label: "Tax Revenue",
            value: "tax_revenue",
            children: [
              {
                label: "Personal Taxes",
                value: "personal_taxes",
                children: [],
              },
              {
                label: "Other Taxes",
                value: "other_taxes",
                children: [],
              },
            ],
          },
          {
            label: "Non-Tax Revenue",
            value: "non_tax_revenue",
            children: [
              {
                label: "Licences – General",
                value: "licences_general",
                children: [],
              },
              {
                label: "Fees – General",
                value: "fees_general",
                children: [],
              },
              {
                label: "Fines – General",
                value: "fines_general",
                children: [],
              },
              {
                label: "Sales – General",
                value: "sales_general",
                children: [],
              },
              {
                label: "Earnings – General",
                value: "earnings_general",
                children: [],
              },
              {
                label: "Rent on Government Buildings – General",
                value: "rent_on_gov_buildings_general",
                children: [],
              },
              {
                label: "Rent on Land and Others – General",
                value: "rent_on_land_and_others_general",
                children: [],
              },
              {
                label: "Repayments",
                value: "repayments",
                children: [],
              },
              {
                label: "Investment Income",
                value: "investment_income",
                children: [],
              },
              {
                label: "Interest Earned",
                value: "interest_earned",
                children: [],
              },
              {
                label: "Reimbursement",
                value: "reimbursement",
                children: [],
              },
              {
                label: "Miscellaneous Income",
                value: "miscellaneous_income",
                children: [],
              },
            ],
          },
        ],
      },
      {
        label: "Aids and Grants",
        value: "aids_grants",
        children: [
          {
            label: "Domestic Aids",
            value: "domestic_aids",
            children: [],
          },
          {
            label: "Foreign Aids",
            value: "foreign_aids",
            children: [],
          },
          {
            label: "Domestic Grants",
            value: "domestic_grants",
            children: [],
          },
          {
            label: "Foreign Grants",
            value: "foreign_grants",
            children: [],
          },
        ],
      },
      {
        label: "Capital Development Fund (CDF) Receipts",
        value: "capital_development_fund_receipts",
        children: [],
      },
    ],
  },
  {
    label: "Expenditure by economic",
    value: "exp_by_economic",
    children: [
      {
        label: "Personnel Expenditure",
        value: "personal_expenditure",
        children: [
          {
            label: "Personnel Cost",
            value: "personal_cost",
            children: [
              {
                label: "Salaries and Wages – General",
                value: "salaries_wages_general",
                children: [],
              },
              {
                label: "Allowances",
                value: "allowances",
                children: [],
              },
              {
                label: "Social Contribution",
                value: "social_contribution",
                children: [],
              },
              {
                label: "Social Benefit",
                value: "social_benefit",
                children: [],
              },
            ],
          },
        ],
      },
      {
        label: "Other Recurrent Expenditure",
        value: "other_recurrent_expenditure",
        children: [
          {
            label: "Overhead Costs",
            value: "overhead_costs",
            children: [
              {
                label: "Transport and Travelling General",
                value: "transport_and_travelling_general",
                children: [],
              },
              {
                label: "Utilities General",
                value: "utilities_general",
                children: [],
              },
              {
                label: "Materials and Supplies General",
                value: "materials_and_supplies_general",
                children: [],
              },
              {
                label: "Maintenance Services General",
                value: "maintainance_services_general",
                children: [],
              },
              {
                label: "Training – General",
                value: "training_general",
                children: [],
              },
              {
                label: "Other Services General",
                value: "other_services_general",
                children: [],
              },
              {
                label: "Consulting and Professional Services General",
                value: "consulting_and_professional_services_general",
                children: [],
              },
              {
                label: "Fuel and Lubricant General",
                value: "fuel_and_lubricant_general",
                children: [],
              },
              {
                label: "Financial General",
                value: "financial_general",
                children: [],
              },
              {
                label: "Miscellaneous General",
                value: "miscellaneous_general",
                children: [],
              },
            ],
          },
          {
            label: "Loans and Advances",
            value: "loans_and_advances",
            children: [
              {
                label: "Staff Loans and Allowances",
                value: "staff_loans_and_allowances",
                children: [],
              },
            ],
          },
          {
            label: "Grants and Contribution General",
            value: "grants_and_contribution_general",
            children: [],
          },
          {
            label: "Subsidies General",
            value: "subsidies_general",
            children: [],
          },

          {
            label: "Public Debt Charges",
            value: "public_debt_charges",
            children: [
              {
                label: "Foreign Debt Interest",
                value: "foreign_debt_interest",
                children: [],
              },
              {
                label: "Domestic Debt Interest",
                value: "domestic_debt_interest",
                children: [],
              },
              {
                label: "Foreign Debt Principal",
                value: "foreign_debt_principal",
                children: [],
              },
              {
                label: "Domestic Debt Principal",
                value: "domestic_debt_principal",
                children: [],
              },
              {
                label: "Transfers-Payments",
                value: "transfers_payments",
                children: [],
              },
            ],
          },
        ],
      },
      {
        label: "Capital Expenditure",
        value: "capital_expenditure",
        children: [],
      },
    ],
  },
  {
    label: "Expenditure by Administrative (Recurrent)",
    value: "exp_by_admin_recurrent",
    children: [
      {
        label: "Administration Sector (Recurrent Expenditure)",
        value: "administration_sector__recurrent_expenditure",
        children: [],
      },
      {
        label: "Economic Sector (Recurrent Expenditure)",
        value: "economic_sector__recurrent_expenditure",
        children: [],
      },
      {
        label: "Law and Justice Sector (Recurrent Expenditure)",
        value: "law_and_justice_sector__recurrent_expenditure",
        children: [],
      },
      {
        label: "Regional Sector (Recurrent Expenditure)",
        value: "regional_sector__recurrent_expenditure",
        children: [],
      },
      {
        label: "Social Sector (Recurrent Expenditure)",
        value: "social_sector__recurrent_expenditure",
        children: [],
      },
    ],
  },
  {
    label: "Expenditure by Administrative (Capital)",
    value: "exp_by_admin_capital",
    children: [
      {
        label: "Administration Sector (Capital Expenditure)",
        value: "administration_sector__capital_expenditure",
        children: [],
      },
      {
        label: "Economic Sector (Capital Expenditure)",
        value: "economic_sector__capital_expenditure",
        children: [],
      },
      {
        label: "Law and Justice Sector (Capital Expenditure)",
        value: "law_and_justice_sector__capital_expenditure",
        children: [],
      },
      {
        label: "Regional Sector (Capital Expenditure)",
        value: "regional_sector__capital_expenditure",
        children: [],
      },
      {
        label: "Social Sector (Capital Expenditure)",
        value: "social_sector__capital_expenditure",
        children: [],
      },
    ],
  },
  {
    label: "Expenditure by Functions (Recurrent)",
    value: "exp_by_func_recurrent",
    children: [
      {
        label: "Total Recurrent Expenditure",
        value: "total_recurrent_expenditure",
        children: [],
      },
      {
        label: "General Public Service (Recurrent Expenditure)",
        value: "general_public_service",
        children: [
          {
            label: `Executive & Legislative Organ, Financial Affairs and External Affairs (Recurrent Expenditure)`,
            value: "executive_legislative_organ_financial_external",
            children: [],
          },
          {
            label: "Foreign and Economic Aid (Recurrent Expenditure)",
            value: "foreign_economic_aid__recurrent_expenditure",
            children: [],
          },
          {
            label: "General Services (Recurrent Expenditure)",
            value: "general_services__recurrent_expenditure",
            children: [],
          },
          {
            label: "Basic Research (Recurrent Expenditure)",
            value: "basic_research__recurrent_expenditure",
            children: [],
          },
          {
            label: "R&D General Public Services (Recurrent Expenditure)",
            value: "rd_general_public_services__recurrent_expenditure",
            children: [],
          },
          {
            label: "General Public Services N.E.C (Recurrent Expenditure)",
            value: "general_public_servuces_nec__recurrent_expenditure",
            children: [],
          },
          {
            label: "Public Debt Transactions (Recurrent Expenditure)",
            value: "public_debt_transactions__recurrent_expenditure",
            children: [],
          },
          {
            label: `Transfer of a General Character between Different Levels of Government (Recurrent Expenditure)`,
            value: "transfer_general_character_between_dif_levels_of_gov",
            children: [],
          },
        ],
      },
      {
        label: "Public Order and Safety (Recurrent Expenditure)",
        value: "public_order_safety",
        children: [
          {
            label: "Police Services (Recurrent Expenditure)",
            value: "police_services__recurrent_expenditure",
            children: [],
          },
          {
            label: "Fire Protection Services (Recurrent Expenditure)",
            value: "fire_protection_services__recurrent_expenditure",
            children: [],
          },
          {
            label: "Justice & Law Courts (Recurrent Expenditure)",
            value: "justice_law_courts__recurrent_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Economic Affairs (Recurrent Expenditure)",
        value: "economic_affairs",
        children: [
          {
            label: `General Economic, Commercial and Labour Affairs (Recurrent Expenditure)`,
            value: "general_economic_commercial_labour_affairs",
            children: [],
          },
          {
            label: `Agriculture, Forestry, Fishing and Hunting (Recurrent Expenditure)`,
            value: `agriculture_forestry_fishing_hunting__recurrent_expenditure`,
            children: [],
          },
          {
            label: "Fuel and Energy (Recurrent Expenditure)",
            value: "fuel_energy__recurrent_expenditure",
            children: [],
          },
          {
            label: `Mining, Manufacturing and Construction (Recurrent Expenditure)`,
            value: `mining_manufacturing_construction__recurrent_expenditure`,
            children: [],
          },
          {
            label: "Transport (Recurrent Expenditure)",
            value: "transport__recurrent_expenditure",
            children: [],
          },
          {
            label: "Communication (Recurrent Expenditure)",
            value: "communication__recurrent_expenditure",
            children: [],
          },
          {
            label: "Other Industries (Recurrent Expenditure)",
            value: "other_inductries__recurrent_expenditure",
            children: [],
          },
          {
            label: "R&D Economic Affairs (Recurrent Expenditure)",
            value: "ed_economic_affairs__recurrent_expenditure",
            children: [],
          },
          {
            label: "Economic Affairs N. E. C (Recurrent Expenditure)",
            value: "economic_affairs_nec__recurrent_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Environmental Protection (Recurrent Expenditure)",
        value: "evironmental_protection",
        children: [
          {
            label: "Waste Management (Recurrent Expenditure)",
            value: "waste_management__recurrent_expenditure",
            children: [],
          },
          {
            label: "Waste Water Management (Recurrent Expenditure)",
            value: "waste_water_management__recurrent_expenditure",
            children: [],
          },
          {
            label: "Pollution Abatement (Recurrent Expenditure)",
            value: "pollution_abatement__recurrent_expenditure",
            children: [],
          },
          {
            label: `Protection of Biodiversity and Landscape (Recurrent Expenditure)`,
            value: `protection_biodiversity_landscape__recurrent_expenditure`,
            children: [],
          },
          {
            label: "R&D Environmental Protection (Recurrent Expenditure)",
            value: "rd_environmental_protection__recurrent_expenditure",
            children: [],
          },
          {
            label: `Environmental Protection N.E.C. (Recurrent Expenditure)`,
            value: "environmental_protection_nec__recurrent_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Housing and Community Amenities (Recurrent Expenditure)",
        value: "housing_community_amenities",
        children: [
          {
            label: "Housing Development (Recurrent Expenditure)",
            value: "housing_development__recurrent_expenditure",
            children: [],
          },
          {
            label: "Community Development (Recurrent Expenditure)",
            value: "community_development__recurrent_expenditure",
            children: [],
          },
          {
            label: "Water Supply (Recurrent Expenditure)",
            value: "water_supply__recurrent_expenditure",
            children: [],
          },
          {
            label: "Street Lighting (Recurrent Expenditure)",
            value: "street_light__recurrent_expenditure",
            children: [],
          },
          {
            label: `R&D Housing and Community Amenities (Recurrent Expenditure)`,
            value: "rd_housing_community_amenities__recurrent_expenditure",
            children: [],
          },
          {
            label: `Housing and Community Amenities N. E. C (Recurrent Expenditure)`,
            value: `housing_community_amenities_nec__recurrent_expenditure`,
            children: [],
          },
        ],
      },
      {
        label: "Health (Recurrent Expenditure)",
        value: "health",
        children: [
          {
            label: `Medical Products, Appliances and Equipment (Recurrent Expenditure)`,
            value: `medical_products_appliances_equiptment__recurrent_expenditure`,
            children: [],
          },
          {
            label: "Outpatient Services (Recurrent Expenditure)",
            value: "outpatient_services__recurrent_expenditure",
            children: [],
          },
          {
            label: "Hospital Services (Recurrent Expenditure)",
            value: "hospital_services__recurrent_expenditure",
            children: [],
          },
          {
            label: "Public Health Services (Recurrent Expenditure)",
            value: "public_health_services__recurrent_expenditure",
            children: [],
          },
          {
            label: "R&D Health (Recurrent Expenditure)",
            value: "rd_health__recurrent_expenditure",
            children: [],
          },
          {
            label: "Health N. E. C (Recurrent Expenditure)",
            value: "health_nec__recurrent_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Recreation, Culture and Religion (Recurrent Expenditure)",
        value: "recreation_culture_religon",
        children: [
          {
            label: `Recreational and Sporting Services (Recurrent Expenditure)`,
            value: `recreational_sporting_services__recurrent_expenditure`,
            children: [],
          },
          {
            label: "Cultural Services (Recurrent Expenditure)",
            value: "cultural_services__recurrent_expenditure",
            children: [],
          },
          {
            label: `Broadcasting and Publishing Services (Recurrent Expenditure)`,
            value: `broadcasting_publishing_services__recurrent_expenditure`,
            children: [],
          },
          {
            label: `Religious and Other Community Services (Recurrent Expenditure)`,
            value: `religous_other_community_services__recurrent_expenditure`,
            children: [],
          },
          {
            label: `R&D Recreation, Culture and Religion (Recurrent Expenditure)`,
            value: "rd_recreation_culture_religon__recurrent_expenditure",
            children: [],
          },
          {
            label: `Recreation, Culture and Religion N. E. C (Recurrent Expenditure)`,
            value: "recreation_culture_religon_nec__recurrent_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Education (Recurrent Expenditure)",
        value: "education",
        children: [
          {
            label: `Pre-Primary and Primary Education (Recurrent Expenditure)`,
            value: `preprimary_primary_education__recurrent_expenditure`,
            children: [],
          },
          {
            label: "Secondary Education (Recurrent Expenditure)",
            value: `secondary_education__recurrent_expenditure`,
            children: [],
          },
          {
            label: `Post-Secondary and Non Tertiary Education (Recurrent Expenditure)`,
            value: `postsecondary_nontetiary_education__recurrent_expenditure`,
            children: [],
          },
          {
            label: "Tertiary Education (Recurrent Expenditure)",
            value: "tetiary_education__recurrent_expenditure",
            children: [],
          },
          {
            label: `Education Not Definable by Level (Recurrent Expenditure)`,
            value: `education_nondefinable_by_level__recurrent_expenditure`,
            children: [],
          },
          {
            label: `Subsidiary Services to Education (Recurrent Expenditure)`,
            value: `subsidiary_services_to_education__recurrent_expenditure`,
            children: [],
          },
          {
            label: "R&D Education (Recurrent Expenditure)",
            value: "rd_education__recurrent_expenditure",
            children: [],
          },
          {
            label: "Education N. E. C (Recurrent Expenditure)",
            value: "education_nec__recurrent_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Social Protection (Recurrent Expenditure)",
        value: "social_protection",
        children: [
          {
            label: "Sickness and Disability (Recurrent Expenditure)",
            value: "sickness_disability__recurrent_expenditure",
            children: [],
          },
          {
            label: "Old Age (Recurrent Expenditure)",
            value: "old_age__recurrent_expenditure",
            children: [],
          },
          {
            label: "Survivors (Recurrent Expenditure)",
            value: "survivors__recurrent_expenditure",
            children: [],
          },
          {
            label: "Family and Children (Recurrent Expenditure)",
            value: "family_and_children__recurrent_expenditure",
            children: [],
          },
          {
            label: "Unemployment (Recurrent Expenditure)",
            value: "unemployment__recurrent_expenditure",
            children: [],
          },
          {
            label: "Housing (Recurrent Expenditure)",
            value: "housing__recurrent_expenditure",
            children: [],
          },
          {
            label: "Social Exclusion N. E. C (Recurrent Expenditure)",
            value: "social_exclusion_nec__recurrent_expenditure",
            children: [],
          },
          {
            label: "R&D Social Protection (Recurrent Expenditure)",
            value: "rd_social_protection__recurrent_expenditure",
            children: [],
          },
          {
            label: "Social Protection N. E. C (Recurrent Expenditure)",
            value: "social_protection_nec__recurrent_expenditure",
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: "Expenditure by Functions (Capital)",
    value: "exp_by_func_capital",
    children: [
      {
        label: "Total Capital Expenditure",
        value: "total_capital_expenditure",
        children: [],
      },
      {
        label: "General Public Service (Capital Expenditure)",
        value: "general_public_service",
        children: [
          {
            label: `Executive & Legislative Organ, Financial Affairs and External Affairs (Capital Expenditure)`,
            value: "executive_legislative_organ_financial_external",
            children: [],
          },
          {
            label: "Foreign and Economic Aid (Capital Expenditure)",
            value: "foreign_economic_aid__capital_expenditure",
            children: [],
          },
          {
            label: "General Services (Capital Expenditure)",
            value: "general_services__capital_expenditure",
            children: [],
          },
          {
            label: "Basic Research (Capital Expenditure)",
            value: "basic_research__capital_expenditure",
            children: [],
          },
          {
            label: "R&D General Public Services (Capital Expenditure)",
            value: "rd_general_public_services__capital_expenditure",
            children: [],
          },
          {
            label: "General Public Services N.E.C (Capital Expenditure)",
            value: "general_public_servuces_nec__capital_expenditure",
            children: [],
          },
          {
            label: "Public Debt Transactions (Capital Expenditure)",
            value: "public_debt_transactions__capital_expenditure",
            children: [],
          },
          {
            label: `Transfer of a General Character between Different Levels of Government (Capital Expenditure)`,
            value: "transfer_general_character_between_dif_levels_of_gov",
            children: [],
          },
        ],
      },
      {
        label: "Public Order and Safety (Capital Expenditure)",
        value: "public_order_safety",
        children: [
          {
            label: "Police Services (Capital Expenditure)",
            value: "police_services__capital_expenditure",
            children: [],
          },
          {
            label: "Fire Protection Services (Capital Expenditure)",
            value: "fire_protection_services__capital_expenditure",
            children: [],
          },
          {
            label: "Justice & Law Courts (Capital Expenditure)",
            value: "justice_law_courts__capital_expenditure",
            children: [],
          },
        ],
      },

      {
        label: "Economic Affairs (Capital Expenditure)",
        value: "economic_affairs",
        children: [
          {
            label: `General Economic, Commercial and Labour Affairs (Capital Expenditure)`,
            value: "general_economic_commercial_labour_affairs",
            children: [],
          },
          {
            label: `Agriculture, Forestry, Fishing and Hunting (Capital Expenditure)`,
            value: `agriculture_forestry_fishing_hunting__capital_expenditure`,
            children: [],
          },
          {
            label: "Fuel and Energy (Capital Expenditure)",
            value: "fuel_energy__capital_expenditure",
            children: [],
          },
          {
            label: `Mining, Manufacturing and Construction (Capital Expenditure)`,
            value: `mining_manufacturing_construction__capital_expenditure`,
            children: [],
          },
          {
            label: "Transport (Capital Expenditure)",
            value: "transport__capital_expenditure",
            children: [],
          },
          {
            label: "Communication (Capital Expenditure)",
            value: "communication__capital_expenditure",
            children: [],
          },
          {
            label: "Other Industries (Capital Expenditure)",
            value: "other_inductries__capital_expenditure",
            children: [],
          },
          {
            label: "R&D Economic Affairs (Capital Expenditure)",
            value: "ed_economic_affairs__capital_expenditure",
            children: [],
          },
          {
            label: "Economic Affairs N. E. C (Capital Expenditure)",
            value: "economic_affairs_nec__capital_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Environmental Protection (Capital Expenditure)",
        value: "evironmental_protection",
        children: [
          {
            label: "Waste Management (Capital Expenditure)",
            value: "waste_management__capital_expenditure",
            children: [],
          },
          {
            label: "Waste Water Management (Capital Expenditure)",
            value: "waste_water_management__capital_expenditure",
            children: [],
          },
          {
            label: "Pollution Abatement (Capital Expenditure)",
            value: "pollution_abatement__capital_expenditure",
            children: [],
          },
          {
            label: `Protection of Biodiversity and Landscape (Capital Expenditure)`,
            value: `protection_biodiversity_landscape__capital_expenditure`,
            children: [],
          },
          {
            label: "R&D Environmental Protection (Capital Expenditure)",
            value: "rd_environmental_protection__capital_expenditure",
            children: [],
          },
          {
            label: `Environmental Protection N.E.C. (Capital Expenditure)`,
            value: "environmental_protection_nec__capital_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Housing and Community Amenities (Capital Expenditure)",
        value: "housing_community_amenities",
        children: [
          {
            label: "Housing Development (Capital Expenditure)",
            value: "housing_development__capital_expenditure",
            children: [],
          },
          {
            label: "Community Development (Capital Expenditure)",
            value: "community_development__capital_expenditure",
            children: [],
          },
          {
            label: "Water Supply (Capital Expenditure)",
            value: "water_supply__capital_expenditure",
            children: [],
          },
          {
            label: "Street Lighting (Capital Expenditure)",
            value: "street_light__capital_expenditure",
            children: [],
          },
          {
            label: `R&D Housing and Community Amenities (Capital Expenditure)`,
            value: "rd_housing_community_amenities__capital_expenditure",
            children: [],
          },
          {
            label: `Housing and Community Amenities N. E. C (Capital Expenditure)`,
            value: `housing_community_amenities_nec__capital_expenditure`,
            children: [],
          },
        ],
      },
      {
        label: "Health (Capital Expenditure)",
        value: "health",
        children: [
          {
            label: `Medical Products, Appliances and Equipment (Capital Expenditure)`,
            value: `medical_products_appliances_equiptment__capital_expenditure`,
            children: [],
          },
          {
            label: "Outpatient Services (Capital Expenditure)",
            value: "outpatient_services__capital_expenditure",
            children: [],
          },
          {
            label: "Hospital Services (Capital Expenditure)",
            value: "hospital_services__capital_expenditure",
            children: [],
          },
          {
            label: "Public Health Services (Capital Expenditure)",
            value: "public_health_services__capital_expenditure",
            children: [],
          },
          {
            label: "R&D Health (Capital Expenditure)",
            value: "rd_health__capital_expenditure",
            children: [],
          },
          {
            label: "Health N. E. C (Capital Expenditure)",
            value: "health_nec__capital_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Recreation, Culture and Religion (Capital Expenditure)",
        value: "recreation_culture_religon",
        children: [
          {
            label: `Recreational and Sporting Services (Capital Expenditure)`,
            value: `recreational_sporting_services__capital_expenditure`,
            children: [],
          },
          {
            label: "Cultural Services (Capital Expenditure)",
            value: "cultural_services__capital_expenditure",
            children: [],
          },
          {
            label: `Broadcasting and Publishing Services (Capital Expenditure)`,
            value: `broadcasting_publishing_services__capital_expenditure`,
            children: [],
          },
          {
            label: `Religious and Other Community Services (Capital Expenditure)`,
            value: `religous_other_community_services__capital_expenditure`,
            children: [],
          },
          {
            label: `R&D Recreation, Culture and Religion (Capital Expenditure)`,
            value: "rd_recreation_culture_religon__capital_expenditure",
            children: [],
          },
          {
            label: `Recreation, Culture and Religion N. E. C (Capital Expenditure)`,
            value: "recreation_culture_religon_nec__capital_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Education (Capital Expenditure)",
        value: "education",
        children: [
          {
            label: `Pre-Primary and Primary Education (Capital Expenditure)`,
            value: `preprimary_primary_education__capital_expenditure`,
            children: [],
          },
          {
            label: "Secondary Education (Capital Expenditure)",
            value: `secondary_education__capital_expenditure`,
            children: [],
          },
          {
            label: `Post-Secondary and Non Tertiary Education (Capital Expenditure)`,
            value: `postsecondary_nontetiary_education__capital_expenditure`,
            children: [],
          },
          {
            label: "Tertiary Education (Capital Expenditure)",
            value: "tetiary_education__capital_expenditure",
            children: [],
          },
          {
            label: `Education Not Definable by Level (Capital Expenditure)`,
            value: `education_nondefinable_by_level__capital_expenditure`,
            children: [],
          },
          {
            label: `Subsidiary Services to Education (Capital Expenditure)`,
            value: `subsidiary_services_to_education__capital_expenditure`,
            children: [],
          },
          {
            label: "R&D Education (Capital Expenditure)",
            value: "rd_education__capital_expenditure",
            children: [],
          },
          {
            label: "Education N. E. C (Capital Expenditure)",
            value: "education_nec__capital_expenditure",
            children: [],
          },
        ],
      },
      {
        label: "Social Protection (Capital Expenditure)",
        value: "social_protection",
        children: [
          {
            label: "Sickness and Disability (Capital Expenditure)",
            value: "sickness_disability__capital_expenditure",
            children: [],
          },
          {
            label: "Old Age (Capital Expenditure)",
            value: "old_age__capital_expenditure",
            children: [],
          },
          {
            label: "Survivors (Capital Expenditure)",
            value: "survivors__capital_expenditure",
            children: [],
          },
          {
            label: "Family and Children (Capital Expenditure)",
            value: "family_and_children__capital_expenditure",
            children: [],
          },
          {
            label: "Unemployment (Capital Expenditure)",
            value: "unemployment__capital_expenditure",
            children: [],
          },
          {
            label: "Housing (Capital Expenditure)",
            value: "housing__capital_expenditure",
            children: [],
          },
          {
            label: "Social Exclusion N. E. C (Capital Expenditure)",
            value: "social_exclusion_nec__capital_expenditure",
            children: [],
          },
          {
            label: "R&D Social Protection (Capital Expenditure)",
            value: "rd_social_protection__capital_expenditure",
            children: [],
          },
          {
            label: "Social Protection N. E. C (Capital Expenditure)",
            value: "social_protection_nec__capital_expenditure",
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: "Expenditure by Programme (Recurrent)",
    value: "exp_by_programme_recurrent",
    children: [
      {
        label: "Agriculture",
        value: "agriculture",
        children: [],
      },
      {
        label: "Societal Re-orientation",
        value: "societal_reorientation",
        children: [],
      },
      {
        label: "Poverty Alleviation",
        value: "poverty_alleviation",
        children: [],
      },
      {
        label: "Health",
        value: "health",
        children: [],
      },
      {
        label: "Education",
        value: "education",
        children: [],
      },
      {
        label: "Housing and Urban Development",
        value: "housing_and_urban_development",
        children: [],
      },
      {
        label: "Gender",
        value: "gender",
        children: [],
      },
      {
        label: "Youth",
        value: "youth",
        children: [],
      },
      {
        label: "Environmental Improvement",
        value: "environmental_improvement",
        children: [],
      },
      {
        label: "Water Resources and Rural Development",
        value: "water_resources_and_rural_development",
        children: [],
      },
      {
        label: "Information Communication and Technology",
        value: "information_communication_and_tech",
        children: [],
      },
      {
        label: "Growing the Private Sector",
        value: "growing_private_sector",
        children: [],
      },
      {
        label: "Reform of Government and Governance",
        value: "reform_of_government_and_governance",
        children: [],
      },
      {
        label: "Power",
        value: "power",
        children: [],
      },
      {
        label: "Rail",
        value: "rail",
        children: [],
      },
      {
        label: "Water Ways",
        value: "water_ways",
        children: [],
      },
      {
        label: "Road",
        value: "road",
        children: [],
      },
      {
        label: "Airways",
        value: "airways",
        children: [],
      },
      {
        label: "COVID-19",
        value: "covid_19",
        children: [],
      },
      {
        label: "CLIMATE CHANGE",
        value: "climate_change",
        children: [],
      },
      {
        label: "Oil and Gas Infrastructure",
        value: "oil_and_gas_infrastructure",
        children: [],
      },
    ],
  },
  {
    label: "Expenditure by Programme (Capital)",
    value: "exp_by_programme_capital",
    children: [
      {
        label: "Agriculture",
        value: "agriculture",
        children: [],
      },
      {
        label: "Societal Re-orientation",
        value: "societal_reorientation",
        children: [],
      },
      {
        label: "Poverty Alleviation",
        value: "poverty_alleviation",
        children: [],
      },
      {
        label: "Health",
        value: "health",
        children: [],
      },
      {
        label: "Education",
        value: "education",
        children: [],
      },
      {
        label: "Housing and Urban Development",
        value: "housing_and_urban_development",
        children: [],
      },
      {
        label: "Gender",
        value: "gender",
        children: [],
      },
      {
        label: "Youth",
        value: "youth",
        children: [],
      },
      {
        label: "Environmental Improvement",
        value: "environmental_improvement",
        children: [],
      },
      {
        label: "Water Resources and Rural Development",
        value: "water_resources_and_rural_development",
        children: [],
      },
      {
        label: "Information Communication and Technology",
        value: "information_communication_and_tech",
        children: [],
      },
      {
        label: "Growing the Private Sector",
        value: "growing_private_sector",
        children: [],
      },
      {
        label: "Reform of Government and Governance",
        value: "reform_of_government_and_governance",
        children: [],
      },
      {
        label: "Power",
        value: "power",
        children: [],
      },
      {
        label: "Rail",
        value: "rail",
        children: [],
      },
      {
        label: "Water Ways",
        value: "water_ways",
        children: [],
      },
      {
        label: "Road",
        value: "road",
        children: [],
      },
      {
        label: "Airways",
        value: "airways",
        children: [],
      },
      {
        label: "COVID-19",
        value: "covid_19",
        children: [],
      },
      {
        label: "CLIMATE CHANGE",
        value: "climate_change",
        children: [],
      },
      {
        label: "Oil and Gas Infrastructure",
        value: "oil_and_gas_infrastructure",
        children: [],
      },
    ],
  },
];

const BUDGET_CATEGORIES = [
  {
    label: "Select All",
    value: "select_all_categories",
    children: [...ALL_CATEGORIES],
  },
  ...ALL_CATEGORIES,
];

const ALL_CATEGORIES__PI = [
  {
    value: "indicators",
    label: "Indicators",
    children: [],
  },
  {
    value: "revenues_percantage_total_revenue",
    label: "Revenues(% of Total Revenue)",
    children: [],
  },
  {
    value: "revenues_percantage_total_expenditure",
    label: "Revenues (% of Total Expenditure)",
    children: [],
  },
  {
    value: "expenditures_percentage_total_revenue",
    label: "Expenditures(% of Total Revenue)",
    children: [],
  },
  {
    value: "expenditures_percentage_total_expenditure",
    label: "Expenditures(% of Total Expenditure)",
    children: [],
  },
  { value: "expenditure", label: "Expenditure", children: [] },
  { value: "expenditureMDA", label: "Expenditure by MDA", children: [] },
  {
    value: "expenditure_mda_percentage_total_expenditure",
    label: "Expenditure by MDA(% of Total Expenditure)",
    children: [],
  },
  {
    value: "expenditure_MDA_percentage_total_revenue",
    label: "Expenditure by MDA(% of Total Revenue)",
    children: [],
  },
  {
    value: "expenditure_by_sector",
    label: "Expenditure by Sector",
    children: [],
  },
  {
    value: "expenditure_by_sector_percentage_total_expenditure",
    label: "Expenditure by Sector(% of Total Expenditure)",
    children: [],
  },
  {
    value: "expenditure_by_sector_percentage_total_revenue",
    label: "Expenditure by Sector(% of Total Revenue)",
    children: [],
  },
  {
    value: "expenditure_by_function",
    label: "Expenditure by Function",
    children: [],
  },
  {
    value: "expenditure_by_function_percentage_total_expenditure",
    label: "Expenditure by Function(% of Total Expenditure)",
    children: [],
  },
  {
    value: "expenditure_by_function_percentage_total_revenue",
    label: "Expenditure by Function (% of Total Revenue)",
    children: [],
  },
  {
    value: "expenditure_by_programme",
    label: "Expenditure by Programme",
    children: [],
  },
  {
    value: "expenditure_by_programme_percentage_total_expenditure",
    label: "Expenditure by Programme (% of Total Expenditure)",
    children: [],
  },
  {
    value: "expenditure_by_programme_percentage_total_revenue",
    label: "Expenditure by Programme (% of Total Revenue)",
    children: [],
  },
];
const BUDGET_CATEGORIES__PI = [
  {
    label: "Select All",
    value: "select_all_categories",
    children: [...ALL_CATEGORIES__PI],
  },
  ...ALL_CATEGORIES__PI,
];

export { BUDGET_CATEGORIES, BUDGET_CATEGORIES__PI };
