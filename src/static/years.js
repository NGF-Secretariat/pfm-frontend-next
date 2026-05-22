function getYears() {
  let years = [];
  let date = 2018;
  let currentYear = new Date().getFullYear();
  for (let i = date; i <= currentYear; i++) {
    years.push({ label: `${i}`, value: `${i}` });
  }
  return years;
}

const YEARS = getYears();

export { YEARS };
