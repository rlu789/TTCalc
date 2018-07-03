import * as constants from './constants';

var models = constants.models;

function modelExists(model) {
  if (!models.hasOwnProperty(model)) {
    console.log("No " + model + " model found");
    return false;
  }
  return true;
}

function sectionExists(model, section) {
  if (!models[model].hasOwnProperty(section)) {
    console.log("No " + section + " in " + model);
    return false;
  }
  return true;
}

function fieldExists(model, section, field) {
  if (!models[model][section].hasOwnProperty(field)) {
    console.log("No " + field + " in " + section);
    return false;
  }
  return true;
}

function evalIf(ifs) {
  if (!ifs || !ifs.length) return true;
  var bool = null;
  for (let i in ifs) {
    var model1 = ifs[i].model1, section1 = ifs[i].section1, field1 = ifs[i].field1,
      model2 = ifs[i].model2, section2 = ifs[i].section2, field2 = ifs[i].field2, value = ifs[i].value;

    if (!modelExists(model1) || (value === null && !modelExists(model1))) {
      ifs.splice(i, 1);
      continue;
    }

    if (!sectionExists(model1, section1) || (value === null && !sectionExists(model2, section2))) {
      ifs.splice(i, 1);
      continue;
    }

    //second part of this if statement can break if theres no value + no model / section / field datas
    if (!fieldExists(model1, section1, field1) || (value === null && !fieldExists(model2, section2, field2))) {
      ifs.splice(i, 1);
      continue;
    }
    var compareWithPrevious = ifs[i].compareWithPrevious ? ifs[i].compareWithPrevious : "&&";
    var v1 = models[model1][section1][field1].value;
    var compare = ifs[i].compare;
    var v2 = value !== null ? value : models[model2][section2][field2].value;

    // if bool is not initialized, set the value to be the first eval statement with no previous compare
    bool = bool === null ? (eval(v1 + compare + v2)) : (eval(bool + compareWithPrevious + v1 + compare + v2));
  }
  return bool;
}

// not used anymore as a result of calcField function and redoing page calcs
//function doCalculation(key, calcModel, section, field, calc) {
//  return doFieldCalculation(calcModel, section, field, calc[key]);
//}

function doFieldCalculation(calcModel, section, field, calc) {
  //check dependencies, if model / section / field has been deleted, then delete the calc as well
  //TODO some part of this must be common
  if (!modelExists(calcModel)) {
    delete calc[calcModel];
    return 0;
  }
  if (!models[calcModel].hasOwnProperty([section])) {
    console.log("No " + section + " in " + calcModel);
    delete calc[calcModel][section];
    if (!Object.keys(calc[calcModel]).length) delete calc[calcModel];
    return 0;
  };
  if (!models[calcModel][section].hasOwnProperty([calc[calcModel][section][field].field])) {
    console.log("No " + [calc[calcModel][section][field].field] + " in " + section);
    calc[calcModel][section].splice(field, 1);
    if (!calc[calcModel][section].length) delete calc[calcModel][section];
    if (!Object.keys(calc[calcModel]).length) delete calc[calcModel];
    return 0;
  };

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

// through the calcs object supplied in "thisField" preform the calculations, store the value and return the value to be displayed in UI
function calcField(thisField) {
  var minutes = 1000 * 60,
    hours = minutes * 60,
    days = hours * 24,
    years = days * 365;

  if (!evalIf(thisField.doCalcIf)) {
    thisField.value = 0;
    return false;
  }
  var value = 0;
  for (let model in thisField.calcs) {
    for (let section in thisField.calcs[model]) {
      for (let field in thisField.calcs[model][section]) {
        value += doFieldCalculation(model, section, field, thisField.calcs);
      }
    }
  }
  switch (thisField.format) {
    case ('Days'):
      value = value / days;
      break;
  }
  thisField.value = value;
  return value;
}

export { doFieldCalculation, evalIf, calcField };
