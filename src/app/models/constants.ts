var models = {
  Income: {
    SWA: {
      section: "SWA",
      fields: {
        'Gross Income': { value: null },
        'Tax Withheld': { value: null },
        "TEST": {
          value: null,
          calcs: {
            Income: {
              SWA: [
                { field: "Gross Income", operation: '+' },
                { field: "Tax Withheld", operation: '-', if: [{ model1: "Income", section1: "SWA", field1: "Tax Withheld", compare: '>', value: 100 }] },
              ],
              Interest: [
                { section: "Interest", field: "Gross Interest", operation: '+' },
              ]
            }
          },
        }
      },
    },
    Interest: {
      section: "Interest",
      fields: {
        'Gross Interest': { value: null },
      },
    },
  },
};

export { models };