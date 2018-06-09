import * as common from '../common';
import * as constants from '../constants';

function initIncome() {
  return { Income: constants.models.Income, "Suppelementry Section": constants.models["Suppelementry Section"] };
}

var incomeCalcs = constants.calcs.incomeCalcs;

function getIncomeCalcs() { // account for saved data in local storage
  console.log(JSON.parse(localStorage.getItem('incomeCalcs')));
  incomeCalcs = localStorage.getItem('incomeCalcs') ? JSON.parse(localStorage.getItem('incomeCalcs')) : incomeCalcs;
  return incomeCalcs;
}

//TODO REDO
//function saveIncomeCalcs() {
//  return incomeCalcs;
//}

function calcIncomeTotal() {
  var incomeTotals = { "Total Income": 0, "Tax Withheld": 0 };
  for (let total in incomeCalcs) {
    for (let model in incomeCalcs[total]) {
      for (let section in incomeCalcs[total][model]) {
        for (let field in incomeCalcs[total][model][section]) {
          incomeTotals[total] += common.doCalculation(total, model, section, field, incomeCalcs);
        }
      }
    }
  }
  return { income: incomeTotals["Total Income"], withheld: incomeTotals["Tax Withheld"], final: incomeTotals["Total Income"] - incomeTotals["Tax Withheld"] };
}

export { initIncome, calcIncomeTotal, getIncomeCalcs };
