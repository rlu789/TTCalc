function doCalculation(key, section, field, model, calc) {
  //console.log(calc[key][section]);
  var bool = true;
  // if 'if' key exists, eval it all first to see if calc applies
  if (calc[key][section][field].if) {
    // why is this repeating so many times?
    // holy shit this is all so ugly
    for (let i in calc[key][section][field].if) {
      var v1 = model[calc[key][section][field].if[i].section1].fields[calc[key][section][field].if[i].field1];
      var compare = calc[key][section][field].if[i].compare;
      var v2 = calc[key][section][field].if[i].value ? calc[key][section][field].if[i].value : model[calc[key][section][field].if[i].section2].fields[calc[key][section][field].if[i].field2];
      bool = bool && (eval(v1 + compare + v2));
    }
  }

  var value = bool ? model[section].fields[calc[key][section][field].field] : 0;
  switch (calc[key][section][field].operation) {
    case '+':
      return +value;
    case '-':
      return -value;
  }
}

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

export { doCalculation, doCalculationEstimate };
