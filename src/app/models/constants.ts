var calcs = localStorage.settings ? JSON.parse(localStorage.settings).calcs : {
  Income: {
    "Total Income": {
      Income: {
        "Salary and wages": [
          { field: "Income", operation: '+' },
          {
            field: "Tax withheld", operation: '-',
            if: [{ model1: "Income", section1: "Allowances", field1: "Tax withheld", compare: '>', value: 100 } ]
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

var models = localStorage.settings ? JSON.parse(localStorage.settings).models : {
  // model
    // section
      // field
  Personal: {
    Personal: {
      Age: { value: 35, initialValue: 35 },
      "Full Year Resident": { value: true, checkbox: true, initialValue: true },
      From: { value: null, date: true },
      To: { value: null, date: true },
      Difference: {
        value: null, //readonly: true, if calculated field then its defs readonly
        doCalcIf: [{ model1: "Personal", section1: "Personal", field1: "Full Year Resident", compare: '==', value: false }],
        format: 'Days',
        calcs: {
          Personal: {
            Personal: [
              { field: "From", operation: '-' },
              { field: "To", operation: '+' },
            ]
          }
        },
      }
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
      'Code': { value: "R", dropdown: ["R", "T"], initialValue: "R"},
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
      'Code': { value: "R", dropdown: ["R", "O", "S", "P", "B", "N", "T", "D"], initialValue: "R" },
    },
    "Government payments": {
      'Income': { value: null },
      'Tax withheld': { value: null },
      'Code': { value: "Offset", dropdown: ["Offset", "Not Offset"], initialValue: "Offset" },
    },
    "Annuities and super income stream": {
      'Taxed element': { value: null },
      'Untaxed element': { value: null },
      'Tax withheld': { value: null },
      'Lump sum - Taxed element': { value: null },
      'Lump sum - Untaxed element': { value: null },
      'Offset amount': { value: null },
      'Death or disability': { value: "No", dropdown: ["No", "Death over 60", "Death under 60", "Disability"], initialValue: "No" },
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
  },
  Variables: {
    Statics: {
      "A Static": { value: 4000, initialValue: 4000 },
    }
  }
};

var p = {};
if (localStorage.settings) {
  for (let pageKey in JSON.parse(localStorage.settings).pages) {
    p[pageKey] = {}
    for (let model in JSON.parse(localStorage.settings).pages[pageKey]) {
      p[pageKey][model] = models[model]
    }
  }
} 

var pages = Object.keys(p).length === 0 && p.constructor === Object ? {
  Income: { Income: models.Income, "Suppelementry Section": models["Suppelementry Section"] },
  Personal: { Personal: models.Personal },
  Constants: { Variables: models.Variables}
} : p;


var editMode = true;
function toggleEdit() {
  editMode = !editMode;
}

export { pages, models, calcs, editMode, toggleEdit };
