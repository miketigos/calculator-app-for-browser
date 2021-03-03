// define glabal variables for display, total, prevOperator
let total = 0;
let displayedNum = "0";
let prevOperator = null;
const screen = document.querySelector('.screen');

// do stuff with the value of the button clicked: display, manipulate, etc
document.querySelector('.calc-buttons').addEventListener('click', function(event) {
  buttonClicked(event.target.innerText);
});

function buttonClicked(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  // rerender after each button click to update display
  rerender();
}

function handleNumber(value) {
  if (displayedNum === "0") {
    displayedNum = value;
  } else {
    displayedNum += value;
  }
}

// this will handle all non numeric buttons
function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      total = 0;
      displayedNum = "0";
      prevOperator = null;
      break;
    case "←":
      if (displayedNum.length === 1) {
        displayedNum = "0";
      } else {
        displayedNum = displayedNum.substring(0, displayedNum.length - 1);
      }
      break;
    case '=':
      if (prevOperator === null) {
        return;
      }
      flush(parseInt(displayedNum));
      prevOperator = null;
      displayedNum = "" + total;
      total = 0;
      break;
    default:
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  const bufferedValue = parseInt(displayedNum);
  if (total === 0) {
    total = bufferedValue;
  } else {
    flush(bufferedValue);
  }
  displayedNum = "0";
  prevOperator = symbol;
}

function flush(value) {
  switch (prevOperator) {
    case "+":
      total += value;
      break;
    case "-":
       total -= value;
       break;
    case "*":
      total *= value;
      break;
    case "/":
      total /= value;
      break;
  }
}

function rerender() {
  screen.innerText = displayedNum;
}
