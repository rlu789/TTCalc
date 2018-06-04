var models = {
  Income: {
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
  },
};

var fields = [];
for (let section in models) {
  console.log(section);
  for (let fields in models[section]) {
    console.log(fields);
  }
}

export { models };
