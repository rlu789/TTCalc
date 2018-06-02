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
var incomeCalcs = {
    incomeTotal: [
        { section: "SWA", field: "Gross Income", operation: '+' },
        { section: "Interest", field: "Gross Interest", operation: '+' },
    ],
    withheldTotal: [
        { section: "SWA", field: "Tax Withheld", operation: '+' },
    ]
};
var incomeTotals = { incomeTotal: 0, withheldTotal: 0 };
function initIncome() {
    return income;
}
exports.initIncome = initIncome;
function calcIncomeTotal() {
    incomeTotals.incomeTotal = 0, incomeTotals.withheldTotal = 0;
    for (var key in incomeCalcs) {
        for (var index in incomeCalcs[key]) {
            var value = income[incomeCalcs[key][index].section].fields[incomeCalcs[key][index].field];
            switch (incomeCalcs[key][index].operation) {
                case ('+'):
                    incomeTotals[key] += value;
                    break;
                case ('-'):
                    incomeTotals[key] -= value;
                    break;
            }
        }
    }
    return { income: incomeTotals.incomeTotal, withheld: incomeTotals.withheldTotal, final: incomeTotals.incomeTotal - incomeTotals.withheldTotal };
}
exports.calcIncomeTotal = calcIncomeTotal;
//# sourceMappingURL=incomeModel.js.map