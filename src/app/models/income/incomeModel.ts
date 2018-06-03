import * as common from '../common'

var income = {
  SWA: {
    section: "SWA",
    fields: {
      'Gross Income': null,
      'Tax Withheld': null,
    },
  },
  Interest: {
    section: "Interest",
    fields: {
      'Gross Interest': null
    },
  },
};

var incomeCalcs = {
  "Total Income": {
    SWA: [
      { field: "Gross Income", operation: '+' },
      { field: "Tax Withheld", operation: '-', if: [{ section1: "SWA", field1: "Tax Withheld", compare: '>', value: 100 }] },
    ],
    Interest: [
      { section: "Interest", field: "Gross Interest", operation: '+' },
    ]
  },
  "Tax Withheld": {
    SWA: [
      { field: "Tax Withheld", operation: '+' }
    ]
  }
};

var incomeTotals = { "Total Income": 0, "Tax Withheld": 0 };

function initIncome() {
  return income;
}

function getIncomeCalcs() {
  return incomeCalcs;
}

function calcIncomeTotal() {
  incomeTotals["Total Income"] = 0, incomeTotals["Tax Withheld"] = 0;
  for (let key in incomeCalcs) {
    for (let section in incomeCalcs[key]) {
      for (let field in incomeCalcs[key][section]) {
        incomeTotals[key] += common.doCalculation(key, section, field, income, incomeCalcs);
      }
    }
  }
  return { income: incomeTotals["Total Income"], withheld: incomeTotals["Tax Withheld"], final: incomeTotals["Total Income"] - incomeTotals["Tax Withheld"] };
}

export { initIncome, calcIncomeTotal, getIncomeCalcs };
