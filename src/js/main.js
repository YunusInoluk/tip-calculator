const tipBtn = document.querySelectorAll(".btn");
const billInput = document.getElementById("bill");
const customTip = document.getElementById("custom-tip");
const numPeople = document.getElementById("num-people");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const resetBtn = document.getElementById("reset");
const locale = window.navigator.userLanguage || window.navigator.language;

let bill = 0;
let tipPercent = 0.15;
let numOfPeople = 1;

function intNumber(locale, value) {
  const localValue = Intl.NumberFormat(locale).format(value);
  return localValue;
}

function calcTip() {
  bill = billInput.value;
  const tip = (bill * tipPercent) / numOfPeople;
  const totalTip = (bill * (tipPercent + 1)) / numOfPeople;
  tipAmount.innerHTML = intNumber(locale, tip);
  total.innerHTML = intNumber(locale, totalTip);
}

function inputHandler() {
  const intValue = intNumber(locale, this.value);
  this.value = intValue;
  calcTip();
}
function customInputHandler() {
  tipBtn.forEach((e) => {
    e.classList.remove("active");
  });

  tipPercent = parseFloat(customTip.value) / 100;
  calcTip();
}
function numberOfPeople() {
  numOfPeople = parseFloat(numPeople.value);
  calcTip();
}
function btnHandler(event) {
  tipBtn.forEach((e) => {
    event.preventDefault();
    e.classList.remove("active");
    if (event.target.innerHTML == e.innerHTML) {
      e.classList.add("active");
      tipPercent = parseFloat(e.innerHTML) / 100;
    }
  });
  customTip.value = "";
  calcTip();
}
function reset() {
  bill = 0;
  tipPercent = 0.15;
  numOfPeople = 1;
  tipAmount.innerHTML = "$0.00";
  total.innerHTML = "$0.00";
  billInput.value = null;
  numPeople.value = null;
  customTip.value = null;
  tipBtn[2].classList.add("active");
}

billInput.addEventListener("input", inputHandler);
tipBtn.forEach((event) => {
  event.addEventListener("click", btnHandler);
});
customTip.addEventListener("input", customInputHandler);
numPeople.addEventListener("input", numberOfPeople);
resetBtn.addEventListener("click", reset);
