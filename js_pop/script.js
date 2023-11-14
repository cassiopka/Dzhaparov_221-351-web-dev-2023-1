function calculatePower(event) {
  event.preventDefault();

  let n = parseInt(document.getElementById("n").value);

  let result = minDigit(n);

  document.getElementById("result").textContent = result;

  document.getElementById("powerForm").style.display = "none";
  document.getElementById("resultForm").style.display = "block";
}

function pluralizeRecords(n) {
  if (n === 0) {
    return "Ничего не найдено";
  } else if (n % 10 === 1 && n % 100 !== 11) {
    return `В результате выполнения запроса была найдена ${n} запись`;
  } else if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) {
    return `В результате выполнения запроса было найдено ${n} записи`;
  } else {
    return `В результате выполнения запроса было найдено ${n} записей`;
  }
}
