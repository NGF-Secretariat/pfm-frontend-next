import { ArrowDropDown } from "@mui/icons-material";
import { Box, Checkbox, Collapse, IconButton, Typography } from "@mui/material";
import React from "react";

const CategoryItem = ({ item, values, classes = "", onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Box p={2} py={1} display="flex" gap={3} alignItems="center">
        <Box flex={1} display="flex" alignItems="center">
          <Checkbox
            size="small"
            onChange={(e) => onSelect(e, item)}
            checked={values?.indexOf(item?.value) > -1}
          />
          <Typography className={classes}>{item?.label}</Typography>
        </Box>
        {!item?.children?.length ? null : item?.value ===
          "select_all_categories" ? null : (
          <Box>
            <IconButton size="small" onClick={() => setIsOpen((prev) => !prev)}>
              <ArrowDropDown />
            </IconButton>
          </Box>
        )}
      </Box>
      <Collapse in={isOpen}>
        <Box paddingLeft={3}>
          {item?.children?.map((item, index) => (
            <CategoryItem
              item={item}
              key={index}
              classes={"fs-sm"}
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
