var models = {
  Income: {
    "Salary and wages": {
      'Gross Income': { value: null },
      'Tax Withheld': { value: null },
      'Code': { value: null, dropdown: ["", "H"] },
      //"TEST": {
      //  value: null,
      //  calcs: {
      //    Income: {
      //      "Salary and wages": [
      //        { field: "Gross Income", operation: '+' },
      //        { field: "Tax Withheld", operation: '-', if: [{ model1: "Income", section1: "SWA", field1: "Tax Withheld", compare: '>', model2: "Income", section2: "SWA", field2: "Gross Income" }] },
      //      ],
      //      Interest: [
      //        { section: "Interest", field: "Gross Interest", operation: '+' },
      //      ]
      //    }
      //  },
      //}
    },
    Allowances: {
      'Gross Income': { value: null },
      'Tax Withheld': { value: null },
      //'Code': { //do this need to be here?
      //  value: null, dropdown: ["H"]
      //},
    },
    "Employer lump sum payments": {
      'Lump sum A': { value: null },
      'Code': { value: "R", dropdown: ["R", "T"]},
      'Lump sum B': { value: null },
      'Tax Withheld': { value: null },
    },
    "Employer termination payments": {
      'Gross Income': { value: null },
      'Tax Withheld': { value: null },
      'Code': { value: "R", dropdown: ["R", "O", "S", "P", "S", "B", "N", "T", "D"] },
    },
    Interest: {
        'Gross Interest': { value: null },
    },
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

export { models };
