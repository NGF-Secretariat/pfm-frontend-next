import React, { useMemo, useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  BUDGET_CATEGORIES,
  BUDGET_CATEGORIES__PI,
} from "../../../static/budget-categories";

const CategorySelect = ({ value = [], onChange, type }) => {
  const CATEGORIES = type === "pi" ? BUDGET_CATEGORIES__PI : BUDGET_CATEGORIES;
  const [collapsed, setCollapsed] = useState({});

  const flatCategories = useMemo(() => {
    const flatten = (arr, depth = 0) => {
      let res = [];
      arr.forEach((item) => {
        const hasChildren = item.children && item.children.length > 0;
        res.push({ ...item, depth, hasChildren });
        if (hasChildren) {
          res = [...res, ...flatten(item.children, depth + 1)];
        }
      });
      return res;
    };
    return flatten(CATEGORIES);
  }, [CATEGORIES]);

  const visibleCategories = useMemo(() => {
    const flattenVisible = (arr, depth = 0, isHidden = false) => {
      let res = [];
      arr.forEach((item) => {
        const hasChildren = item.children && item.children.length > 0;
        if (!isHidden) {
          res.push({ ...item, depth, hasChildren });
        }
        if (hasChildren) {
          const childrenHidden = isHidden || collapsed[item.value];
          res = [...res, ...flattenVisible(item.children, depth + 1, childrenHidden)];
        }
      });
      return res;
    };
    return flattenVisible(CATEGORIES);
  }, [CATEGORIES, collapsed]);

  const allValues = useMemo(() => flatCategories.map((c) => c.value), [flatCategories]);

  const handleSelectAll = (e) => {
    e.stopPropagation();
    if (e.target.checked) {
      onChange(allValues);
    } else {
      onChange([]);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value?.filter((item) => !!item);
    onChange(val);
  };

  const toggleCollapse = (e, val) => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed((prev) => ({ ...prev, [val]: !prev[val] }));
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="category_select">Budget Categories</InputLabel>
      <Select
        size="small"
        fullWidth
        multiple
        label="Budget Categories"
        labelId="category_select"
        variant="outlined"
        value={value}
        onChange={handleChange}
        renderValue={(selected) => {
          const labels = selected.map((val) => {
            const found = flatCategories.find((c) => c.value === val);
            return found ? found.label : val.split("_").join(" ");
          });
          return labels.join(", ");
        }}
      >
        <MenuItem value="" disabled>
          Budget Categories
        </MenuItem>
        <MenuItem value="">
          <Checkbox
            size="small"
            onChange={handleSelectAll}
            checked={value.length === allValues.length && allValues.length > 0}
            indeterminate={value.length > 0 && value.length !== allValues.length}
          />
          Select All
        </MenuItem>
        {visibleCategories.map((item, index) => (
          <MenuItem
            value={item.value}
            key={`${item.value}-${index}`}
            style={{ 
              paddingLeft: `${item.depth * 20 + 16}px`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <Checkbox
                size="small"
                checked={value.indexOf(item.value) > -1}
              />
              <span className={item.depth === 0 ? "font-bold text-gray-800 whitespace-normal" : "text-gray-600 whitespace-normal"}>
                {item.label}
              </span>
            </div>
            {item.hasChildren && (
              <span 
                onClick={(e) => toggleCollapse(e, item.value)}
                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
                style={{ 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center",
                  padding: "4px",
                  borderRadius: "50%",
                  marginLeft: "8px"
                }}
                className="hover:bg-gray-100"
              >
                {collapsed[item.value] ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
              </span>
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
