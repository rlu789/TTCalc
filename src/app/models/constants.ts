var minutes = 1000 * 60,
  hours = minutes * 60,
  days = hours * 24,
  years = days * 365;

var calcs = {
  Income: {
    "Total Income": {
      Income: {
        "Salary and wages": [
          { field: "Income", operation: '+' },
          {
            field: "Tax withheld", operation: '-',
            //if: [{ model1: "Income", section1: "Salary and wages", field1: "Tax withheld", compare: '>', value: 100 } ]
          },
        ],
        Interest: [
          { section: "Interest", field: "Income", operation: '+' },
        ]
      }
    },
    "Tax Withheld": {
      Income: {
        "Salary and wages": [
          { field: "Tax withheld", operation: '+' }
        ]
      }
    }
  },
}

var models = {
  Personal: {
    Personal: {
      age: { value: 35 },
      "Full Year Resident": { value: true },
      fullYearResFrom: { value: null },
      fullYearResTo: { value: null },
      dateDifferenceDays: { value: null },
    }
  },
  Income: {
    "Salary and wages": {
      'Income': { value: null },
      'Tax withheld': { value: null },
      'Code': { value: null, dropdown: ["", "H"] },
    },
    Allowances: {
      'Income': { value: null },
      'Tax withheld': { value: null },
      //'Code': { //do this need to be here?
      //  value: null, dropdown: ["H"]
      //},
    },
    "Employer lump sum payments": {
      'Lump sum A': { value: null },
      'Code': { value: "R", dropdown: ["R", "T"]},
      'Lump sum B': { value: null },
      'Tax withheld': { value: null },
      'Computed Total': {
        value: null,
        //doCalcIf: [{ model1: "Income", section1: "Salary and wages", field1: "Tax withheld", compare: '>', value: 100 }],
        calcs: {
          Income: {
            "Employer lump sum payments": [
              { field: "Lump sum A", operation: '+' },
              { field: "Lump sum B", operation: '+', percent: '0.05' },
            ]
          }
        },
      }
    },
    "Employer termination payments": {
      'Income': { value: null },
      'Tax withheld': { value: null },
      'Code': { value: "R", dropdown: ["R", "O", "S", "P", "S", "B", "N", "T", "D"] },
    },
    "Government payments": {
      'Income': { value: null },
      'Tax withheld': { value: null },
      'Code': { value: "Offset", dropdown: ["Offset", "Not Offset"] },
    },
    "Annuities and super income stream": {
      'Taxed element': { value: null },
      'Untaxed element': { value: null },
      'Tax withheld': { value: null },
      'Lump sum - Taxed element': { value: null },
      'Lump sum - Untaxed element': { value: null },
      'Offset amount': { value: null },
      'Death or disability': { value: "No", dropdown: ["No", "Death over 60", "Death under 60", "Disability"] },
    },
    //"Super lump sum payments": {},
    "Attributed personal service income": {
      'Income': { value: null },
      'Tax withheld': { value: null },
    },
    Interest: {
        'Income': { value: null },
    },
    Dividends: {
      'Unfranked amount': { value: null },
      'Franked amount': { value: null },
      'Franking credit': { value: null },
      'Computed Total': {
        value: null,
        doCalcIf: [{ model1: "Personal", section1: "Personal", field1: "Full Year Resident", compare: '==', value: true }],
        calcs: {
          Income: {
            "Dividends": [
              { field: "Unfranked amount", operation: '+'},
              { field: "Franked amount", operation: '+' },
              { field: "Franking credit", operation: '+' },
            ]
          }
        },
      }
    }

  },
  "Suppelementry Section": {
    "Partnerships and trust Primary production": {
      'Distribution from partnerships': { value: null },
      'Share of net income from trusts': { value: null },
      'Landcare operations and deductions - water facility': { value: null },
      'Deductions for distribution from p/ship and share of net income from trust': { value: null },
    },
  }
};

// >:(
models.Personal.Personal.dateDifferenceDays.value = function () {
  if (models.Personal.Personal["Full Year Resident"].value) return 365;
  if (!models.Personal.Personal["Full Year Resident"].value && models.Personal.Personal.fullYearResFrom.value && models.Personal.Personal.fullYearResTo.value) {
    return (models.Personal.Personal.fullYearResTo.value.getTime() - models.Personal.Personal.fullYearResFrom.value.getTime()) / days;
  }
};

var pages = {
  Income: { Income: models.Income, "Suppelementry Section": models["Suppelementry Section"] },
  "Managed Funds": {},
}

var editMode = false;

export { pages, models, calcs, editMode };
