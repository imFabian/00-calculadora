const calculator = {
  displayValue: "",
  history: [], // Arreglo para almacenar el historial
  clearState: false, // Estado para rastrear el primer clic en AC
};

function updateHistory() {
  const historyElement = document.querySelector(".calculator-history");
  // Mostrar las últimas dos operaciones del historial, una encima de la otra
  const lastTwoCalculations = calculator.history.slice(-2).reverse();
  historyElement.innerHTML = lastTwoCalculations.join("<br>");
}

function inputDigit(digit) {
  calculator.displayValue += digit;
  calculator.clearState = false; // Resetear el estado cuando se ingresa un dígito
}

function inputDecimal(dot) {
  calculator.displayValue += dot;
  calculator.clearState = false; // Resetear el estado cuando se ingresa un decimal
}

function handleOperator(operator) {
  calculator.displayValue += operator;
  calculator.clearState = false; // Resetear el estado cuando se ingresa un operador
}

function handleBackspace() {
  calculator.displayValue = calculator.displayValue.slice(0, -1);
  calculator.clearState = false; // Resetear el estado cuando se usa backspace
}

function resetCalculator() {
  if (calculator.displayValue === "") {
    // Limpiar el historial si la pantalla está vacía
    calculator.history = [];
    updateHistory(); // Actualizar el historial para reflejar el cambio
  } else {
    // Solo limpiar la pantalla si hay dígitos
    calculator.displayValue = "";
  }
  calculator.clearState = false; // Resetear el estado después de la limpieza
}

function calculate() {
  try {
    const result = eval(calculator.displayValue);
    // Agregar la operación al historial
    if (calculator.history.length >= 2) {
      calculator.history.pop(); // Eliminar la operación más antigua si hay más de 2
    }
    calculator.history.unshift(`${calculator.displayValue} = ${result}`); // Añadir nueva operación al inicio
    calculator.displayValue = result;
    updateHistory(); // Actualizar el historial después del cálculo
  } catch {
    calculator.displayValue = "Error";
  }
}

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    if (target.value === "backspace") {
      handleBackspace(); // Eliminar un dígito
    } else if (target.value === "=") {
      calculate();
    } else {
      handleOperator(target.value);
    }
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    if (!calculator.clearState) {
      resetCalculator(); // Limpiar pantalla o historial según corresponda
      calculator.clearState = true; // Marcar que el AC ha sido presionado una vez
    } else {
      calculator.clearState = false; // Resetear el estado para el siguiente uso
      // Limpiar la pantalla y el historial al segundo clic
      calculator.displayValue = "";
      calculator.history = [];
      updateHistory(); // Actualizar el historial para reflejar el cambio
    }
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
