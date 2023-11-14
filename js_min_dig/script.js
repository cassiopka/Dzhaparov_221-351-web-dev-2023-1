function calculatePower(event) {
  event.preventDefault();

  let x = parseInt(document.getElementById("x").value);

  let result = minDigit(x);

  document.getElementById("result").textContent = result;

  document.getElementById("powerForm").style.display = "none";
  document.getElementById("resultForm").style.display = "block";
}

function minDigit(x) {
  if (x < 0) {
    throw new Error("Число должно быть неотрицательным");
  }

  let smallestDigit = 9;

  while (x > 0) {
    let digit = x % 10;
    if (digit < smallestDigit) {
      smallestDigit = digit;
    }
    x = Math.floor(x / 10);
  }

  return smallestDigit;
}
