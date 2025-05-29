const display = document.getElementById("calc-display");

// Calculator logic with history
function handleButton(val) {
  if (val === "C") {
    display.value = "";
  } else if (val === "=") {
    try {
      const expression = display.value;
      const result = eval(expression); // ⚠️ Use with caution
      display.value = result;
      addToHistory(expression, result); // ✅ Add to history
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += val;
  }
}

// Note clearing
function clearNotes() {
  document.getElementById("note-area").value = "";
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

// Keyboard support for calculator
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;
  const activeElement = document.activeElement; // Get the currently focused element

  // IMPORTANT: Only process key presses for the calculator
  // if an input field or textarea is NOT currently focused.
  // This prevents calculator input when typing in the notepad or other inputs.
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
    return; // Exit the function if an input or textarea is focused
  }

  // Allow numbers
  if (/\d/.test(key)) {
    handleButton(key);
  }
  // Operators
  else if (["+", "-", "*", "/"].includes(key)) {
    handleButton(key);
  }
  // Enter -> Equals
  else if (key === "Enter") {
    handleButton("=");
    event.preventDefault(); // Prevent default Enter key behavior (e.g., submitting forms if any)
  }
  // Backspace -> Remove last character
  else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
  // C or c -> Clear display
  else if (key.toLowerCase() === "c") {
    handleButton("C");
  }
}
