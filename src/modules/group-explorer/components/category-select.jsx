import { ArrowDropDown } from "@mui/icons-material";
import { Box, InputAdornment, Popover, TextField } from "@mui/material";
import React from "react";
import {
  BUDGET_CATEGORIES,
  BUDGET_CATEGORIES__PI,
} from "../../../static/budget-categories";
import CategoryItem from "./category-item";

const CategorySelect = ({ value, onChange, type }) => {
  const [isMenu, setIsMenu] = React.useState(null);

  const renderValues = () => {
    const result = [];
    value.forEach((item) => {
      result.push(item?.split("_").join(" ").toUpperCase());
    });
    return result?.filter((item) => item !== "SELECT ALL CATEGORIES");
  };

  const CATEGORIES = type === "pi" ? BUDGET_CATEGORIES__PI : BUDGET_CATEGORIES;

  return (
    <div>
      <TextField
        fullWidth
        size="small"
        value={renderValues()}
        variant="outlined"
        label="Budget Categories"
        className="custom-select"
        onClick={(e) => setIsMenu(e.currentTarget)}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDown />
              </InputAdornment>
            ),
          }
        }}
        onChange={(e) => console.log(e)}
      />

      <Popover
        open={!!isMenu}
        anchorEl={isMenu}
        onClose={() => setIsMenu(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          style: {
            minWidth: isMenu ? isMenu.clientWidth : undefined,
            maxWidth: 400,
          },
        }}
      >
        <Box>
          <Box p={2} color="GrayText">
            Select Budget Categories
          </Box>
          {CATEGORIES.map((item, index) => (
            <CategoryItem
              key={index}
              item={item}
              itemIndex={index}
              values={value}
              onSelect={handleSelect}
            />
          ))}
        </Box>
      </Popover>
    </div>
  );

  function getAllValues(arr) {
    let result = [];
    arr.forEach((item) => {
      result.push(item.value);
      if (Array.isArray(item.children) && item.children.length > 0) {
        result = [...result, ...getAllValues(item.children)];
      }
    });
    return result;
  }

  function handleSelect(e, item) {
    const checked = e.target.checked;
    const children = getAllValues(item?.children);
    if (checked) {
      onChange((prev) => [...prev, item?.value, ...children]);
    } else {
      const result = value?.filter(
        (f) => ![item?.value, ...children].includes(f)
      );
      onChange(result);
    }
  }
};

export default CategorySelect;
