import { ArrowDropDown } from "@mui/icons-material";
import { Box, Checkbox, Collapse, IconButton, Typography } from "@mui/material";
import React from "react";

const CategoryItem = ({ item, values, classes = "", onSelect, depth = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getTypographyStyle = () => {
    if (depth === 0) return "text-sm font-semibold text-gray-900";
    if (depth === 1) return "text-sm font-medium text-gray-700";
    return "text-xs text-gray-500";
  };

  return (
    <React.Fragment>
      <Box
        p={1.5}
        py={0.75}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Box display="flex" alignItems="center" gap={1} sx={{ flex: 1, minWidth: 0 }}>
          <Checkbox
            size="small"
            onChange={(e) => onSelect(e, item)}
            checked={values?.indexOf(item?.value) > -1}
            sx={{ p: 0.5 }}
          />
          <Typography className={getTypographyStyle()}>
            {item?.label}
          </Typography>
        </Box>
        {!item?.children?.length ? null : item?.value ===
          "select_all_categories" ? null : (
          <Box sx={{ flexShrink: 0, ml: 1 }}>
            <IconButton
              size="small"
              onClick={() => setIsOpen((prev) => !prev)}
              sx={{ p: 0.5 }}
            >
              <ArrowDropDown
                sx={{
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s ease-in-out",
                }}
              />
            </IconButton>
          </Box>
        )}
      </Box>
      <Collapse in={isOpen}>
        <Box pl={3.5}>
          {item?.children?.map((childItem, index) => (
            <CategoryItem
              item={childItem}
              key={index}
              depth={depth + 1}
              onSelect={onSelect}
              values={values}
            />
          ))}
        </Box>
      </Collapse>
    </React.Fragment>
  );
};
export default CategoryItem;

