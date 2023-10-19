function calculatePower(event) {
  event.preventDefault();

  let a = parseInt(document.getElementById("a").value);
  let b = parseInt(document.getElementById("b").value);

  let result = gcd(a, b);

  document.getElementById("result").textContent = result;

  document.getElementById("powerForm").style.display = "none";
  document.getElementById("resultForm").style.display = "block";
}

function gcd(a, b) {
  if (a < 0 || b < 0) {
    throw new Error("Числа должны быть неотрицательными");
  }

  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}
