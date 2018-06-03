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
  incomeTotal: [
    { section: "SWA", field: "Gross Income", operation: '+' },
    { section: "Interest", field: "Gross Interest", operation: '+' },
    { section: "SWA", field: "Tax Withheld", operation: '-', if: [{ section1: "SWA", field1: "Tax Withheld", compare: '>', value: 100}] },
  ],
  withheldTotal: [
    { section: "SWA", field: "Tax Withheld", operation: '+' },
  ]
};

var incomeTotals = { incomeTotal: 0, withheldTotal: 0 };

function initIncome() {
  return income;
}

function getIncomeCalcs() {
  return incomeCalcs;
}

function calcIncomeTotal() {
  incomeTotals.incomeTotal = 0, incomeTotals.withheldTotal = 0;
  for (let key in incomeCalcs) {
    for (let index in incomeCalcs[key]) {
      var bool = true;
      // if 'if' key exists, eval it all first to see if calc applies
      if (incomeCalcs[key][index].if) {
        //console.log(incomeCalcs[key][index].if);
        // why is this repeating so many times?
        // holy shit this is all so ugly
        for (let i in incomeCalcs[key][index].if) {
          // build the if statement
          var v1 = income[incomeCalcs[key][index].if[i].section1].fields[incomeCalcs[key][index].if[i].field1];
          var compare = incomeCalcs[key][index].if[i].compare;
          var v2 = incomeCalcs[key][index].if[i].value ? incomeCalcs[key][index].if[i].value : income[incomeCalcs[key][index].if[i].section2].fields[incomeCalcs[key][index].if[i].field2];
          bool = bool && (eval(v1 + compare + v2)) ;
        }
      }

      var value = bool ? income[incomeCalcs[key][index].section].fields[incomeCalcs[key][index].field] : 0;
      switch (incomeCalcs[key][index].operation) {
        case '+':
          incomeTotals[key] += value;
          break;
        case '-':
          incomeTotals[key] -= value;
          break;
      }
    }
  }
  return { income: incomeTotals.incomeTotal, withheld: incomeTotals.withheldTotal, final: incomeTotals.incomeTotal - incomeTotals.withheldTotal };
}

export { initIncome, calcIncomeTotal, getIncomeCalcs };
