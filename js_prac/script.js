function calculatePower(event) {
  event.preventDefault();

  let base = parseInt(document.getElementById("base").value);
  let exponent = parseInt(document.getElementById("exponent").value);

  let result = pow(base, exponent);

  document.getElementById("result").textContent = result;

  document.getElementById("powerForm").style.display = "none";
  document.getElementById("resultForm").style.display = "block";
}

function pow(x, n) {
  if (n < 0) {
    throw new Error("Значение n должно быть положительным");
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}