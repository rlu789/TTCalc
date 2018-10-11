import * as constants from './constants';

var models = constants.models;
var pages = constants.pages;

function modelExists(page, model) {
  if (!pages[page].hasOwnProperty(model)) {
    console.log("No " + model + " model found");
    return false;
  }
  return true;
}

function sectionExists(page, model, section) {
  if (!pages[page][model].hasOwnProperty(section)) {
    console.log("No " + section + " in " + model);
    return false;
  }
  return true;
}

function fieldExists(page, model, section, field) {
  if (!pages[page][model][section].hasOwnProperty(field)) {
    console.log("No " + field + " in " + section);
    return false;
  }
  return true;
}

function evalIf(ifs) {
  if (!ifs || !ifs.length) return true;
  var bool = null;
  for (let i in ifs) {
    var page1 = ifs[i].page1, model1 = ifs[i].model1, section1 = ifs[i].section1, field1 = ifs[i].field1,
      page2 = ifs[i].page2, model2 = ifs[i].model2, section2 = ifs[i].section2, field2 = ifs[i].field2, value = ifs[i].value;

    if (!modelExists(page1, model1) || (value === null && !modelExists(page2, model2))) {
      ifs.splice(i, 1);
      continue;
    }

    if (!sectionExists(page1, model1, section1) || (value === null && !sectionExists(page2, model2, section2))) {
      ifs.splice(i, 1);
      continue;
    }

    //second part of this if statement can break if theres no value + no page / model / section / field datas
    if (!fieldExists(page1, model1, section1, field1) || (value === null && !fieldExists(page2, model2, section2, field2))) {
      ifs.splice(i, 1);
      continue;
    }
    var compareWithPrevious = ifs[i].compareWithPrevious ? ifs[i].compareWithPrevious : "&&";
    var v1 = pages[page1][model1][section1][field1].value;
    if (typeof v1 !== "boolean") v1 = "'" + v1 + "'";
    var compare = ifs[i].compare;
    var v2 = value !== null ? value : pages[page2][model2][section2][field2].value;
    if (typeof v2 !== "boolean") v2 = "'" + v2 + "'";

    // if bool is not initialized, set the value to be the first eval statement with no previous compare
    bool = bool === null ? (eval(v1 + compare + v2)) : (eval(bool + compareWithPrevious + v1 + compare + v2));
  }
  return bool;
}

// not used anymore as a result of calcField function and redoing page calcs
//function doCalculation(key, calcModel, section, field, calc) {
//  return doFieldCalculation(calcModel, section, field, calc[key]);
//}

function doFieldCalculation(page, model, section, field, calc) {
  //check dependencies, if model / section / field has been deleted, then delete the calc as well
  //TODO some part of this must be common
  // YIKES what moron wrote this
  // ... oh wait
  if (!modelExists(page, model)) {
    delete calc[model];
    return 0;
  }
  if (!pages[page][model].hasOwnProperty([section])) {
    console.log("No " + section + " in " + model);
    delete calc[page][model][section];
    if (!Object.keys(calc[page][model]).length) delete calc[page][model];
    return 0;
  };
  if (!pages[page][model][section].hasOwnProperty([calc[page][model][section][field].field])) {
    console.log("No " + [calc[page][model][section][field].field] + " in " + section);
    calc[page][model][section].splice(field, 1);
    if (!calc[page][model][section].length) delete calc[page][model][section];
    if (!Object.keys(calc[page][model]).length) delete calc[page][model];
    return 0;
  };

  // if 'if' key exists, eval it all first to see if calc applies
  var ifStatements = calc[page][model][section][field].if;
  var bool = evalIf(ifStatements);

  var value = bool ? pages[page][model][section][calc[page][model][section][field].field].value : 0;
  var precent = calc[page][model][section][field].percent;
  if (precent) value = value * precent;
  switch (calc[page][model][section][field].operation) {
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
  for (let page in thisField.calcs) {
    for (let model in thisField.calcs[page]) {
      for (let section in thisField.calcs[page][model]) {
        for (let field in thisField.calcs[page][model][section]) {
          value += doFieldCalculation(page, model, section, field, thisField.calcs);
        }
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

function getFieldValue(pageKey, modelKey, sectionKey, fieldKey) {
  return pages[pageKey][modelKey][sectionKey][fieldKey].value;
}

export { doFieldCalculation, evalIf, calcField, getFieldValue };
