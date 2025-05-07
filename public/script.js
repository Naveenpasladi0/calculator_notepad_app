const display = document.getElementById("calc-display");

function handleButton(val) {
  if (val === "C") {
    display.value = "";
  } else if (val === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += val;
  }
}

function clearNotes() {
  document.getElementById("note-area").value = "";
}
