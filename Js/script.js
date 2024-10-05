let result = document.getElementById("result");
let buttons = document.querySelectorAll("button");

let currentOperation = "";
let previousOperation = "";
let currentNumber = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.value;

    if (value === "=") {
      calculateResult();
    } else if (value === "C") {
      clearResult();
    } else if (value === "CE") {
      clearEverything();
    } else if (value === "backspace") {
      backspace();
    } else {
      handleInput(value);
    }
  });
});

function handleInput(value) {
  if (["+", "-", "*", "/"].includes(value)) {
    if (currentNumber !== "") {
      previousOperation = currentNumber;
      currentOperation = value;
      currentNumber = "";
    }
  } else if (value === "inc") {
    increment();
  } else if (value === "dec") {
    decrement();
  } else if (value === "%") {
    modulus();
  } else if (value === "**") {
    currentOperation = "^";
    previousOperation = currentNumber;
    currentNumber = "";
  } else {
    currentNumber += value; // Concatenate number inputs
  }
  updateResult();
}

function calculateResult() {
  if (currentNumber !== "" && previousOperation !== "") {
    let total;
    const prev = parseFloat(previousOperation);
    const curr = parseFloat(currentNumber);
    switch (currentOperation) {
      case "+":
        total = prev + curr;
        break;
      case "-":
        total = prev - curr;
        break;
      case "*":
        total = prev * curr;
        break;
      case "/":
        total = prev / curr;
        break;
      case "^":
        total = Math.pow(prev, curr);
        break;
      default:
        return;
    }
    currentNumber = total.toString();
    currentOperation = "";
    previousOperation = "";
  }
  updateResult();
}

function clearResult() {
  currentNumber = "";
  updateResult();
}

function clearEverything() {
  currentNumber = "";
  currentOperation = "";
  previousOperation = "";
  updateResult();
}

function backspace() {
  currentNumber = currentNumber.slice(0, -1);
  updateResult();
}

function increment() {
  if (currentNumber !== "") {
    currentNumber = (parseFloat(currentNumber) + 1).toString();
  }
}

function decrement() {
  if (currentNumber !== "") {
    currentNumber = (parseFloat(currentNumber) - 1).toString();
  }
}

function modulus() {
  if (currentNumber !== "") {
    currentNumber = (parseFloat(currentNumber) / 100).toString(); // Convert to percentage
  }
}

function updateResult() {
  result.innerText = currentNumber || "0";
}
