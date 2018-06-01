"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var incomeCalcs = [
    {
        key: "SWA", calcs: [
            { field: 'Gross Income', operation: '+' },
            { field: 'Tax Withheld', operation: '-' }
        ]
    },
    { key: "Interest", calcs: [{ field: 'Gross Interest', operation: '+' }] },
];
function initIncome() {
    return income;
}
exports.initIncome = initIncome;
function calcIncomeTotal() {
    var totalIncome = 0, totalWithheld = 0;
    for (var i = 0; i < incomeCalcs.length; i++) {
        for (var j = 0; j < incomeCalcs[i].calcs.length; j++) {
            // TODO basic error check to see if theres actually a functions array
            // TODO fuck this is ugly
            switch (incomeCalcs[i].calcs[j].operation) {
                case '+':
                    totalIncome += income[incomeCalcs[i].key].fields[incomeCalcs[i].calcs[j].field];
                    break;
                case '-':
                    totalWithheld += income[incomeCalcs[i].key].fields[incomeCalcs[i].calcs[j].field];
                    break;
            }
        }
    }
    return { income: totalIncome, withheld: totalWithheld, final: totalIncome - totalWithheld };
}
exports.calcIncomeTotal = calcIncomeTotal;
//# sourceMappingURL=incomeModel.js.map