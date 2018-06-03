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
personal.dateDifferenceDays = function () {
  if (personal.fullYearRes) return 365;
  if (!personal.fullYearRes && personal.fullYearResFrom && personal.fullYearResTo) {
    return ((personal.fullYearResTo.getTime() - personal.fullYearResFrom.getTime()) / days);
  }
};

function initPersonal() {
  return personal;
}

export { initPersonal }
