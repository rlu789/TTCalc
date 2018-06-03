import * as incomeModel from '../income/incomeModel';
import * as personalModel from '../personal/personalModel';
import * as common from '../common'

var models = {
  income: incomeModel.calcIncomeTotal,
  personal: personalModel
};

var estimateCalcs = {
  Estimate: {
    income: [
      { field: "final", operation: '+' },
    ]
  }
};
var estimateTotals = { "Estimate": 0 };

function calcEstimateTotal() {
  estimateTotals["Estimate"] = 0;
  for (let key in estimateCalcs) {
    for (let section in estimateCalcs[key]) {
      for (let field in estimateCalcs[key][section]) {
        estimateTotals[key] += common.doCalculationEstimate(key, section, field, models[section](), estimateCalcs);
      }
    }
  }
  console.log(estimateTotals);
  return estimateTotals;
}

export { calcEstimateTotal };
