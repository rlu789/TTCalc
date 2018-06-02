var minutes = 1000 * 60;
var hours = minutes * 60;
var days = hours * 24;
var years = days * 365;

var personal = {
  age: 35,
  fullYearRes: true,
  fullYearResFrom: null,
  fullYearResTo: null,
  dateDifferenceDays: null
}

function initPersonal() {
  personal.dateDifferenceDays = function () {
    if (personal.fullYearRes) return 365;
    var diffDays = 0;
    if (!personal.fullYearRes && personal.fullYearResFrom && personal.fullYearResTo) {
      diffDays = ((personal.fullYearResTo.getTime() - personal.fullYearResFrom.getTime()) / days);
    }
    return diffDays;
  };
  return personal;
}

export { initPersonal }
