let total = 0;
let buffer = "0";
let prevOperator = null;
const screen = document.querySelector('.screen');


document.querySelector('.calc-buttons').addEventListener('click', function(event) {
  buttonClick(event.target.innerText)
});

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = "0"; //set display to zero
      total = 0; // set total to 0
      break;

    case '=':
      if(prevOperator === null) { //if prevOp is not set then return
        return;
      }
      flushOperation(parseInt(buffer));
      prevOperator = null;
      buffer = "" + total;
      total = 0;
      break;

    case "←": // remove right-most number from the screen using substring
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    default: // otherwise its an operator (+, -, /, *)
      handleMath(symbol);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (total === 0) {
    total = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  prevOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (prevOperator === "+") {
    total += intBuffer;
  } else if (prevOperator === "-") {
    total -= intBuffer;
  } else if (prevOperator === "*") {
    total *= intBuffer;
  } else {
    total /= intBuffer;
  }
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function rerender() {
  screen.innerText = buffer;
}
