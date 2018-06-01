var income = {
  SWA: {
    section: "SWA",
    fields: [
      { name: "Gross Income", value: null},
      { name: "Tax Withheld", value: null},
    ],
    calcs: [
      { function: '+' },
      { function: '-' },
    ]
  },
  Interest: {
    section: "Interest",
    fields: [
      { name: "Gross Interest", value: null},
    ],
    calcs: [
      { function: '+' },
    ]
  },
}

function initIncome() {
  return income;
}

function calcIncomeTotal() {
  var totalIncome = 0, totalWithheld = 0;
  //for (var i = 0; i < income.length; i++) {
  //  for (var j = 0; j < income[i].fields.length; j++) {
  //    // TODO basic error check to see if theres actually a functions array
  //    switch (income[i].calcs[j].function) {
  //      case '+':
  //        totalIncome += income[i].fields[j].value
  //        break;
  //      case '-':
  //        totalWithheld += income[i].fields[j].value
  //        break;
  //    }
  //  }
  //}
  return { income: totalIncome, withheld: totalWithheld, final: totalIncome - totalWithheld };
}

export { initIncome, calcIncomeTotal };
