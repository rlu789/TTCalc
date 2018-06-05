var models = {
  Income: {
    SWA: {
      'Gross Income': { value: null },
      'Tax Withheld': { value: null },
      "TEST": {
        value: null,
        calcs: {
          Income: {
            SWA: [
              { field: "Gross Income", operation: '+' },
              { field: "Tax Withheld", operation: '-', if: [{ model1: "Income", section1: "SWA", field1: "Tax Withheld", compare: '>', model2: "Income", section2: "SWA", field2: "Gross Income" }] },
            ],
            Interest: [
              { section: "Interest", field: "Gross Interest", operation: '+' },
            ]
          }
        },
      }
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
