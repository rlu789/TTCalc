"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var income = {
    SWA: {
        section: "SWA",
        fields: [
            { name: "Gross Income", value: null },
            { name: "Tax Withheld", value: null },
        ],
    },
    Interest: {
        section: "Interest",
        fields: [
            { name: "Gross Interest", value: null },
        ]
    },
};
var incomeCalcs = [
    { key: "SWA", calcs: [{ function: '+' }, { function: '-' }] },
    { key: "Interest", calcs: [{ function: '+' }] },
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
            // TODO this might be the ugliest think ive ever seen
            switch (incomeCalcs[i].calcs[j].function) {
                case '+':
                    totalIncome += income[incomeCalcs[i].key].fields[j].value;
                    break;
                case '-':
                    totalWithheld += income[incomeCalcs[i].key].fields[j].value;
                    break;
            }
        }
    }
    return { income: totalIncome, withheld: totalWithheld, final: totalIncome - totalWithheld };
}
exports.calcIncomeTotal = calcIncomeTotal;
//# sourceMappingURL=incomeModel.js.map