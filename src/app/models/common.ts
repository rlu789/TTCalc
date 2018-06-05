function doCalculation(key, calcModel, section, field, models, calc) {
  return doFieldCalculation(calcModel, section, field, models, calc[key]);
}

function doFieldCalculation(calcModel, section, field, models, calc) {
  // if 'if' key exists, eval it all first to see if calc applies
  var ifStatement = calc[calcModel][section][field].if;

  var bool = true;
  if (ifStatement) {
    for (let i in calc[calcModel][section][field].if) {
      var section1 = calc[calcModel][section][field].if[i].section1, field1 = calc[calcModel][section][field].if[i].field1,
        section2 = calc[calcModel][section][field].if[i].section2, field2 = calc[calcModel][section][field].if[i].field2, value = calc[calcModel][section][field].if[i].value

      var v1 = models[calcModel][section1][field1].value;
      var compare = calc[calcModel][section][field].if[i].compare;
      var v2 = value ? value : models[calcModel][section2][field2].value;
      bool = bool && (eval(v1 + compare + v2));
    }
  }

  var value = bool ? models[calcModel][section][calc[calcModel][section][field].field].value : 0;
  switch (calc[calcModel][section][field].operation) {
    case '+':
      return +value;
    case '-':
      return -value;
  }

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

export { doCalculation, doCalculationEstimate, doFieldCalculation };
