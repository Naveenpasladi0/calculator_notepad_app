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

const toggle = document.getElementById('themeSwitch');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
});
