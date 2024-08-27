// Objeto principal de la calculadora que almacena el valor en pantalla, el historial y el estado del botón AC
const calculator = {
  displayValue: "", // Valor actual mostrado en pantalla
  history: [], // Arreglo para almacenar el historial de operaciones
  clearState: false, // Estado para rastrear si el botón AC ha sido presionado una vez
};

// Función para actualizar el historial en la interfaz
function updateHistory() {
  const historyElement = document.querySelector(".calculator-history");
  // Mostrar las últimas dos operaciones del historial, en orden inverso
  const lastTwoCalculations = calculator.history.slice(-2).reverse();
  historyElement.innerHTML = lastTwoCalculations.join("<br>"); // Unir con un salto de línea
}

// Función para manejar la entrada de dígitos
function inputDigit(digit) {
  calculator.displayValue += digit; // Añadir el dígito al valor en pantalla
  calculator.clearState = false; // Resetear el estado de AC al ingresar un dígito
}

// Función para manejar la entrada de decimales
function inputDecimal(dot) {
  calculator.displayValue += dot; // Añadir el punto decimal al valor en pantalla
  calculator.clearState = false; // Resetear el estado de AC al ingresar un decimal
}

// Función para manejar la entrada de operadores
function handleOperator(operator) {
  calculator.displayValue += operator; // Añadir el operador al valor en pantalla
  calculator.clearState = false; // Resetear el estado de AC al ingresar un operador
}

// Función para manejar el retroceso (borrado de un dígito)
function handleBackspace() {
  calculator.displayValue = calculator.displayValue.slice(0, -1); // Eliminar el último carácter
  calculator.clearState = false; // Resetear el estado de AC al usar el backspace
}

// Función para limpiar la calculadora
function resetCalculator() {
  if (calculator.displayValue === "") {
    // Si la pantalla está vacía, limpiar el historial
    calculator.history = [];
    updateHistory(); // Actualizar la interfaz del historial
  } else {
    // Si hay dígitos en pantalla, solo limpiar la pantalla
    calculator.displayValue = "";
  }
  calculator.clearState = false; // Resetear el estado de AC después de la limpieza
}

// Función para calcular el resultado de la operación actual
function calculate() {
  try {
    const result = eval(calculator.displayValue); // Evaluar la expresión en pantalla
    // Agregar la operación y el resultado al historial
    if (calculator.history.length >= 2) {
      calculator.history.pop(); // Eliminar la operación más antigua si hay más de dos
    }
    calculator.history.unshift(`${calculator.displayValue} = ${result}`); // Añadir la nueva operación al inicio del historial
    calculator.displayValue = result; // Mostrar el resultado en pantalla
    updateHistory(); // Actualizar la interfaz del historial
  } catch {
    calculator.displayValue = "Error"; // Mostrar "Error" si la evaluación falla
  }
}

// Función para actualizar el valor mostrado en pantalla
function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue; // Actualizar el valor de la pantalla con el valor actual
}

updateDisplay(); // Inicializar la pantalla con el valor por defecto

// Escuchar eventos de clic en las teclas de la calculadora
const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event; // Obtener el botón que fue clicado
  if (!target.matches("button")) {
    return; // Si el clic no fue en un botón, salir de la función
  }

  if (target.classList.contains("operator")) {
    // Si el botón es un operador
    if (target.value === "backspace") {
      handleBackspace(); // Llamar a la función de retroceso
    } else if (target.value === "=") {
      calculate(); // Calcular el resultado
    } else {
      handleOperator(target.value); // Manejar otros operadores
    }
    updateDisplay(); // Actualizar la pantalla después de manejar el operador
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value); // Manejar la entrada de decimales
    updateDisplay(); // Actualizar la pantalla después de ingresar un decimal
    return;
  }

  if (target.classList.contains("all-clear")) {
    if (!calculator.clearState) {
      resetCalculator(); // Limpiar pantalla o historial según corresponda
      calculator.clearState = true; // Marcar que el botón AC ha sido presionado una vez
    } else {
      calculator.clearState = false; // Resetear el estado para el siguiente uso
      // Limpiar la pantalla y el historial al segundo clic
      calculator.displayValue = "";
      calculator.history = [];
      updateHistory(); // Actualizar el historial para reflejar el cambio
    }
    updateDisplay(); // Actualizar la pantalla después de la limpieza
    return;
  }

  inputDigit(target.value); // Manejar la entrada de dígitos
  updateDisplay(); // Actualizar la pantalla después de ingresar un dígito
});
