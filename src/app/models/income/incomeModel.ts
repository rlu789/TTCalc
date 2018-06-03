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
      for (let index in incomeCalcs[key][section]) {
        //console.log(incomeCalcs[key][section]);
        var bool = true;
        // if 'if' key exists, eval it all first to see if calc applies
        if (incomeCalcs[key][section][index].if) {
          // why is this repeating so many times?
          // holy shit this is all so ugly
          for (let i in incomeCalcs[key][section][index].if) {
            var v1 = income[incomeCalcs[key][section][index].if[i].section1].fields[incomeCalcs[key][section][index].if[i].field1];
            var compare = incomeCalcs[key][section][index].if[i].compare;
            var v2 = incomeCalcs[key][section][index].if[i].value ? incomeCalcs[key][section][index].if[i].value : income[incomeCalcs[key][section][index].if[i].section2].fields[incomeCalcs[key][section][index].if[i].field2];
            bool = bool && (eval(v1 + compare + v2));
          }
        }

        var value = bool ? income[section].fields[incomeCalcs[key][section][index].field] : 0;
        switch (incomeCalcs[key][section][index].operation) {
          case '+':
            incomeTotals[key] += value;
            break;
          case '-':
            incomeTotals[key] -= value;
            break;
        }
      }
    }
  }
  return { income: incomeTotals["Total Income"], withheld: incomeTotals["Tax Withheld"], final: incomeTotals["Total Income"] - incomeTotals["Tax Withheld"] };
}

export { initIncome, calcIncomeTotal, getIncomeCalcs };
