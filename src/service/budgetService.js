import { toast } from "react-toastify";
import httpService from "./httpService";
import * as XLSX from "xlsx/xlsx.mjs";

class BudgetService {
  get(query) {
    let states = "";
    const params = {};
    if (query?.year) params.year = query.year;
    if (query?.type) params.type = query.type;
    if (query?.state) params.state = query.state;
    if (query.states) states = this.formatStatesQuery(query?.states);
    if (query.type === "pi") {
      return httpService.get(`/budget/fetch-pi?${states}`, { params });
    }
    return httpService.get(`/budget/fetch?${states}`, { params });
  }

  formatStatesQuery(states) {
    let result = states
      .split(",")
      .map((el) => {
        return `state=${el?.split(" ").join("_")?.toUpperCase()}`;
      })
      .join("&");
    return result;
  }

  formatData(data, type) {
    let states = [];
    try {
      if (type === "pi" && !data?.data?.result[0]?.indicators[0]?.year) {
        toast.error("No results found");
        throw new Error("No results found");
      } else if (
        ["original", "actual", "revised"].includes(type) &&
        !data?.data?.result[0][0]?.revenue_by_economuc?.year
      ) {
        toast.error("No results found");
        throw new Error("No results found");
      }
      const budgets =
        type === "pi"
          ? data?.data?.result?.map((item) => {
              const keys = Object.keys(item);
              const data = {};
              for (let key of keys) {
                const isExist = Array.isArray(item[key])
                  ? item[key][0]
                  : item[key];
                if (isExist) data[key] = isExist;
              }
              return data;
            })
          : data?.data?.result
              ?.map((item) => {
                if (item?.length) return item[0];
                return null;
              })
              .filter((item) => !!item)
              .map((item) => {
                const data = {
                  revenue_by_economic: item?.revenue_by_economuc,
                };
                const keys = Object.keys(item);
                for (let key of keys) {
                  const isExist = Array.isArray(item[key])
                    ? item[key][0]
                    : item[key];
                  if (isExist) data[key] = isExist;
                }
                delete data["revenue_by_economuc"];
                return data;
              });

      if (type === "pi") {
        states = budgets?.map((item) => {
          return this.capitalizeWords(item?.indicators?.state);
        });
      } else {
        states = budgets?.map((item) => {
          return this.capitalizeWords(item?.revenue_by_economic?.state);
        });
      }
      return { data: budgets, states };
    } catch (error) {
      console.error("BUDGET_DATA_FORMATTER: ", error);
      return null;
    }
  }

  formatStateBudgetData(data, type, selectedYears = "") {
    try {
      let budgets = [];
      if (type === "pi") {
        const fillData = new Array(selectedYears.split(",")?.length)
          .fill(data?.data?.result[0])
          ?.map((item) => item);

        budgets = selectedYears
          .split(",")
          ?.map((year, index) => {
            const item = fillData[index];
            const keys = Object.keys(item);
            const data = {};
            for (let key of keys) {
              const isExist = this.findItem(item[key], "year", year);
              if (isExist) data[key] = isExist;
            }

            return data;
          })
          ?.filter((item) => !!item?.indicators)
          .sort((a, b) => {
            const name = "indicators";
            return a[name]?.year > b[name]?.year ? 1 : -1;
          });
      } else {
        budgets = data?.data?.result
          ?.map((item) => {
            const year = item?.revenue_by_economuc?.year;
            const data = { revenue_by_economic: item?.revenue_by_economuc };
            const keys = Object.keys(item);

            for (let key of keys) {
              const isExist = this.findItem(item[key], "year", year);
              if (isExist) data[key] = isExist;
            }
            delete data["revenue_by_economuc"];
            return data;
          })
          ?.filter((item) => {
            return selectedYears
              .split(",")
              .includes(item?.exp_by_economic?.year);
          })
          .sort((a, b) => {
            const name = "revenue_by_economic";
            return a[name]?.year > b[name]?.year ? 1 : -1;
          });
      }
      let years = [];
      if (type === "pi") {
        years = budgets?.map((item) => {
          return item?.indicators?.year;
        });
      } else {
        years = budgets?.map((item) => {
          return item?.revenue_by_economic?.year;
        });
      }
      return { data: budgets, years };
    } catch (error) {
      console.error("BUDGET_DATA_FORMATTER: ", error);
      return null;
    }
  }

  findItem(data, keyword, searchTerm) {
    if (!Array.isArray(data)) return null;
    return data?.find((item) => item[keyword] === searchTerm);
  }

  capitalizeWords(str) {
    if (!str) return "";
    let words = str.toLowerCase().split(" ");
    words = words.join(" ").split("_");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  formatAmount(amount) {
    let number = isNaN(amount) ? 0 : amount;
    return Number(parseFloat(number).toFixed(2)).toLocaleString("en", {
      minimumFractionDigits: 2,
    });
  }

  printElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      const originalContents = document.body.innerHTML;
      const printableContent = element.innerHTML;
      document.body.innerHTML = printableContent;
      window.print();
      document.body.innerHTML = originalContents;
    } else {
      console.error("Element with id " + elementId + " not found.");
    }
  }
  download(id = "", format) {
    const table = document.getElementById(id);
    const result = this.tableToJson(table);
    if (format === "csv") {
      this.jsonToCSVAndDownload(result);
    } else this.jsonToExcelAndDownload(result);
  }

  tableToJson(table) {
    let data = [];

    let headers = [];
    for (let th of table.querySelectorAll("thead th")) {
      headers.push(th.textContent.trim());
    }
    table.querySelectorAll("tbody tr").forEach((row) => {
      let rowData = {};
      row.querySelectorAll("td").forEach((cell, index) => {
        rowData[headers[index]] = cell.textContent.trim();
      });
      data.push(rowData);
    });

    return data;
  }

  jsonToCSVAndDownload(jsonData) {
    let csv = "";
    if (jsonData.length > 0) {
      const keys = Object.keys(jsonData[0]);
      csv += keys.join(",") + "\n";
      jsonData.forEach((item) => {
        const values = keys.map((key) => {
          let value = item[key];
          if (typeof value === "string") {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csv += values.join(",") + "\n";
      });
    }
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.generateRandomId()}.csv`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  jsonToExcelAndDownload(jsonData) {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.generateRandomId()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  generateRandomId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const idLength = 16;
    let id = "";
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  }
}

export default new BudgetService();
