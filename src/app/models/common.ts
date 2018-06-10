import * as constants from './constants';

var models = constants.models;

function evalIf(ifs) {
  if (!ifs || !ifs.length) return true;
  var bool = null;
  for (let i in ifs) {
    var model1 = ifs[i].model1, section1 = ifs[i].section1, field1 = ifs[i].field1,
      model2 = ifs[i].model2, section2 = ifs[i].section2, field2 = ifs[i].field2, value = ifs[i].value;

    var compareWithPrevious = ifs[i].compareWithPrevious ? ifs[i].compareWithPrevious : "&&";
    var v1 = models[model1][section1][field1].value;
    var compare = ifs[i].compare;
    var v2 = value ? value : models[model2][section2][field2].value;

    // if bool is not initialized, set the value to be the first eval statement with no previous compare
    bool = bool === null ? (eval(v1 + compare + v2)) : (eval(bool + compareWithPrevious + v1 + compare + v2));
  }
  return bool;
}

function doCalculation(key, calcModel, section, field, calc) {
  return doFieldCalculation(calcModel, section, field, calc[key]);
}

function doFieldCalculation(calcModel, section, field, calc) {
  // if 'if' key exists, eval it all first to see if calc applies
  var ifStatements = calc[calcModel][section][field].if;
  var bool = evalIf(ifStatements);

  var value = bool ? models[calcModel][section][calc[calcModel][section][field].field].value : 0;
  var precent = calc[calcModel][section][field].percent;
  if (precent) value = value * precent;
  switch (calc[calcModel][section][field].operation) {
    case '+':
      return +value;
    case '-':
      return -value;
  }

}

function calcTotalsForPage(page) {
  var totals = {};
  for (let total in constants.calcs[page]) {
    totals[total] = 0;
    for (let model in constants.calcs[page][total]) {
      for (let section in constants.calcs[page][total][model]) {
        for (let field in constants.calcs[page][total][model][section]) {
          totals[total] += doCalculation(total, model, section, field, constants.calcs[page]);
        }
      }
    }
  }
  console.log(totals);
  return totals;
}

//REDO THIS TO ACCOUNT FOR CALC MODEL
function doCalculationEstimate(key, section, field, model, calc) {
  //console.log(calc[key][section]);
  var bool = true;
  // if 'if' key exists, eval it all first to see if calc applies
  //if (calc[key][section][field].if) {
  //  for (let i in calc[key][section][field].if) {
  //    var v1 = model[calc[key][section][field].if[i].section1].fields[calc[key][section][field].if[i].field1];
  //    var compare = calc[key][section][field].if[i].compare;
  //    var v2 = calc[key][section][field].if[i].value ? calc[key][section][field].if[i].value : model[calc[key][section][field].if[i].section2].fields[calc[key][section][field].if[i].field2];
  //    bool = bool && (eval(v1 + compare + v2));
  //  }
  //}

  var value = bool ? model[section] : 0;
  switch (calc[key][section][field].operation) {
    case '+':
      return +value;
    case '-':
      return -value;
  }

}

export { doCalculation, doCalculationEstimate, doFieldCalculation, evalIf, calcTotalsForPage };
