const display = document.getElementById("calc-display");
const noteArea = document.getElementById("note-area");

// Calculator logic with history
function handleButton(val) {
  if (val === "C") {
    display.value = "";
  } else if (val === "=") {
    try {
      const expression = display.value;
      // Basic check to prevent evaluation of empty string or just operators
      if (expression.trim() === "" || expression.match(/^[\+\-\*\/]+$/)) {
        display.value = ""; // Clear if empty or just operators
        return;
      }
      const result = eval(expression); // ⚠️ Use with caution (still valid for this app's scope)
      display.value = result;
      addToHistory(expression, result);
    } catch {
      display.value = "Error";
    }
  } else {
    // For button clicks, append the value
    display.value += val;
  }
}

// Note clearing
function clearNotes() {
  noteArea.value = "";
}

// History Panel
function addToHistory(expression, result) {
  const historyItem = document.createElement("li");
  historyItem.textContent = `${expression} = ${result}`;
  document.getElementById("calc-history").prepend(historyItem);
}

document.getElementById('clear-history-btn').addEventListener('click', () => {
  document.getElementById('calc-history').innerHTML = '';
});

// Theme toggle
const toggle = document.getElementById('themeSwitch');
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
});

// --- NEW: Input validation for calculator display ---
display.addEventListener('input', (event) => {
  // Allow only numbers, decimals, and basic arithmetic operators
  // The regex matches digits (0-9), period (.), and operators (+, -, *, /)
  // It also includes handling for the "x" (multiplication) symbol that your buttons use.
  const validChars = /^[0-9\.\+\-\*\/x]*$/;
  const currentValue = event.target.value;

  if (!validChars.test(currentValue)) {
    // If invalid characters are found, remove them
    event.target.value = currentValue.replace(/[^0-9\.\+\-\*\/x]/g, '');
  }
});


// Keyboard support for calculator and notepad
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;
  const activeElement = document.activeElement;

  // Scenario 1: Notepad is focused
  if (activeElement === noteArea) {
    // Allow default typing behavior for the notepad
    return;
  }

  // Scenario 2: Calculator display is focused OR no specific input is focused
  // In this case, we handle special calculator keys or pass to calculator logic
  // The input event listener on 'display' handles numeric/operator input directly.

  // Prevent default behavior for specific keys that we'll handle manually
  // or that might interfere with calculator input (e.g., spacebar).
  if (event.code === 'Space') { // Prevent spacebar
    event.preventDefault();
    return;
  }

  // Handle calculator-specific key presses
  if (key === "Enter") {
    handleButton("=");
    event.preventDefault(); // Prevent default Enter key behavior (e.g., new line in text areas if applicable)
  }
  else if (key === "Backspace") {
    // When backspace is pressed, and the calculator display is focused or active
    // We let the browser handle direct backspace for the input field.
    // However, if the display is not focused (e.g. body is focused)
    // we still want the backspace to clear the display.
    if (activeElement !== display) { // If not directly typing in display
       display.value = display.value.slice(0, -1);
       event.preventDefault(); // Prevent browser back navigation
    }
  }
  else if (key.toLowerCase() === "c") {
    handleButton("C");
    event.preventDefault(); // Prevent default 'c' key behavior if any
  }
  // If the calculator display is not focused, but a number/operator key is pressed,
  // append it to the display (mimicking button press)
  else if (activeElement !== display && (/\d/.test(key) || ["+", "-", "*", "/"].includes(key))) {
    handleButton(key);
  }
}
