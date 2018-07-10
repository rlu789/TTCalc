var calcs = localStorage.settings ? JSON.parse(localStorage.settings).calcs : {
  // page
    // field
  Income: {
    "Total Income": {
      value: null,
      calcs: {
        Income: {
          "Salary and wages": [{ field: "Income", operation: '+' }],
          "Allowances": [{ field: "Income", operation: '+' }],
          "Employer lump sum payments": [{ field: "Computed Total", operation: '+' }],
          "Employer termination payments": [{ field: "Income", operation: '+' }],
          "Government payments": [{ field: "Income", operation: '+' }],
          "Government pensions": [{ field: "Income", operation: '+' }],
          "Annuities and super income stream": [{ field: "Computed Total", operation: '+' }],
          "Super lump sum payments": [{ field: "Computed Total", operation: '+' }],
          "Attributed personal service income": [{ field: "Income", operation: '+' }],
          "Interest": [
            {
              field: "Income", operation: '+',
              if: [{ model1: "Personal", section1: "Personal", field1: "Full Year Resident", compare: '==', value: true }]
            }
          ],
          "Dividends": [
            {
              field: "Computed Total", operation: '+',
              if: [{ model1: "Personal", section1: "Personal", field1: "Full Year Resident", compare: '==', value: true }]
            }
          ],
          "Employee share scheme": [{ field: "Computed Total", operation: '+' }],
        }
      }
    },
    "Tax Withheld": {
      value: null,
      calcs: {
        Income: {
          "Salary and wages": [{ field: "Tax withheld", operation: '+' }],
          "Allowances": [{ field: "Tax withheld", operation: '+' }],
          "Employer lump sum payments": [{ field: "Tax withheld", operation: '+' }],
          "Employer termination payments": [{ field: "Tax withheld", operation: '+' }],
          "Government payments": [{ field: "Tax withheld", operation: '+' }],
          "Government pensions": [{ field: "Tax withheld", operation: '+' }],
          "Annuities and super income stream": [{ field: "Tax withheld", operation: '+' }],
          "Super lump sum payments": [{ field: "Tax withheld", operation: '+' }],
          "Dividends": [
            {
              field: "Franking credit", operation: '+',
              if: [{ model1: "Personal", section1: "Personal", field1: "Full Year Resident", compare: '==', value: true }]
            }
          ],
          "Employee share scheme": [{ field: "Tax withheld", operation: '+' }],
        }
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
      'Code': { value: "R", dropdown: ["R", "T"], initialValue: "R" },
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
    "Government pensions": {
      'Income': { value: null },
      'Tax withheld': { value: null }
    },
    "Annuities and super income stream": {
      'Taxed element': { value: null },
      'Untaxed element': { value: null },
      'Tax withheld': { value: null },
      'Lump sum - Taxed element': { value: null },
      'Lump sum - Untaxed element': { value: null },
      'Offset amount': { value: null },
      'Death or disability': { value: "No", dropdown: ["No", "Death over 60", "Death under 60", "Disability"], initialValue: "No" },
      "Computed Total": {
        value: null,
        calcs: {
          Income: {
            "Annuities and super income stream": [
              { field: "Taxed element", operation: '+' },
              { field: "Untaxed element", operation: '+' },
              { field: "Lump sum - Taxed element", operation: '+' },
              { field: "Lump sum - Untaxed element", operation: '+' },
            ]
          }
        }
      }
    },
    "Super lump sum payments": {
      'Taxed element': { value: null },
      'Untaxed element': { value: null },
      'Tax withheld': { value: null },
      'Death': { value: null, dropdown: ["Y", "", "N"] },
      'Computed Total': {
        value: null,
        calcs: {
          Income: {
            "Super lump sum payments": [
              { field: "Taxed element", operation: '+' },
              { field: "Untaxed element", operation: '+' }
            ]
          }
        }
      }
    },
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
              { field: "Unfranked amount", operation: '+' },
              { field: "Franked amount", operation: '+' },
              { field: "Franking credit", operation: '+' },
            ]
          }
        },
      }
    },
    "Employee share scheme": {
      "Discount from taxed upfront - eligible for reduction": { value: null },
      "Tax withheld": { value: null },
      "Discount from taxed upfront - not eligible for reduction": { value: null },
      "Discount from deferral scheme": { value: null },
      "Interest acquired pre 2009": { value: null },
      "Foreign source discounts": { value: null },
      "(TODO) Tax assessable discount amount": {
        value: null,
        calcs: {}
      },
      "Computed Total": {
        value: null,
        calcs: {
          Income: {
            "Employee share scheme": [
              { field: "Discount from taxed upfront - eligible for reduction", operation: '+' },
              { field: "Discount from taxed upfront - not eligible for reduction", operation: '+' },
              { field: "Discount from deferral scheme", operation: '+' },
              { field: "Interest acquired pre 2009", operation: '+' },
              { field: "Foreign source discounts", operation: '+' },
              { field: "(TODO) Tax assessable discount amount", operation: '-' },
            ]
          }
        }
      }
    },

  },
  "Suppelementry Section": {
    "Partnerships and trust Primary production": {
      'Distribution from partnerships': { value: null },
      'Share of net income from trusts': { value: null },
      'Landcare operations and deductions - water facility': { value: null },
      'Deductions for distribution from p/ship and share of net income from trust': { value: null },
    },
  },

  "Business Payment Summaries": {
    "Summary 1": {
      "Payment type": { value: null, dropdown: ["No ANB quoted", "Other specified payment", "Voluntary agreement", "Labour hire", "Foreign resident withholding"] },
      "Gross payment": { value: null },
      "Tax withheld": { value: null },
      "Reportable super contributions": { value: null },
      "Income type": { value: null, dropdown: ["Business income", "PSI income"] },
      "Primary or non-primary": { value: null, dropdown: ["Primary", "Non-primary"] },
    },
  },
  "BCalcs": {},

  Variables: {
    Statics: {
      "A Static": { value: 4000, initialValue: 4000 },
    }
  },

  "Page Calcs": {
    Income: calcs["Income"]
  }
};

var p = {};
if (localStorage.settings) {
  for (let pageKey in JSON.parse(localStorage.settings).pages) {
    p[pageKey] = {}
    for (let model in JSON.parse(localStorage.settings).pages[pageKey]) {
      p[pageKey][model] = models[model]
    }
    if (models["Page Calcs"][pageKey]) p[pageKey]["Page Calcs"] = models["Page Calcs"][pageKey];
  }
} 

var pages = Object.keys(p).length === 0 && p.constructor === Object ? {
  Income: { Income: models.Income, "Suppelementry Section": models["Suppelementry Section"], "Page Calcs": models["Page Calcs"]["Income"] },
  "Business Income / Loss": {
    "Business Payment Summaries": models["Business Payment Summaries"], BCalcs: models["BCalcs"]
  },
  Personal: { Personal: models.Personal },
  Constants: { Variables: models.Variables}
} : p;


var editMode = true;
function toggleEdit() {
  editMode = !editMode;
}

export { pages, models, calcs, editMode, toggleEdit };
