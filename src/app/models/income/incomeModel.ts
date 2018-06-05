import * as common from '../common';
import * as constants from '../constants';

var incomeCalcs = {
  "Total Income": {
    Income: {
      "Salary and wages": [
        { field: "Gross Income", operation: '+' },
        { field: "Tax Withheld", operation: '-', if: [{ model1: "Income", section1: "Salary and wages", field1: "Tax Withheld", compare: '>', value: 100 }] },
      ],
      Interest: [
        { section: "Interest", field: "Gross Interest", operation: '+' },
      ]
    }
  },
  "Tax Withheld": {
    Income: {
      "Salary and wages": [
        { field: "Tax Withheld", operation: '+' }
      ]
    }
  }
};

var incomeTotals = { "Total Income": 0, "Tax Withheld": 0 };

function initIncome() {
  return { Income: constants.models.Income, "Suppelementry Section": constants.models["Suppelementry Section"] };
}

function getIncomeCalcs() { // account for saved data in local storage
  console.log(JSON.parse(localStorage.getItem('incomeCalcs')));
  incomeCalcs = localStorage.getItem('incomeCalcs') ? JSON.parse(localStorage.getItem('incomeCalcs')) : incomeCalcs;
  return incomeCalcs;
}

function saveIncomeCalcs() {
  return incomeCalcs;
}

function calcIncomeTotal() {
  incomeTotals["Total Income"] = 0, incomeTotals["Tax Withheld"] = 0;
  for (let total in incomeCalcs) {
    for (let model in incomeCalcs[total]) {
      for (let section in incomeCalcs[total][model]) {
        for (let field in incomeCalcs[total][model][section]) {
          incomeTotals[total] += common.doCalculation(total, model, section, field, constants.models, incomeCalcs);
        }
      }
    }
  }
  return { income: incomeTotals["Total Income"], withheld: incomeTotals["Tax Withheld"], final: incomeTotals["Total Income"] - incomeTotals["Tax Withheld"] };
}

export { initIncome, calcIncomeTotal, getIncomeCalcs, saveIncomeCalcs };
