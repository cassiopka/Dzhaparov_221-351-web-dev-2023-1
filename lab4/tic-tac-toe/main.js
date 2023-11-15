// Ожидаем завершения загрузки DOM, затем выполняем функцию.
document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const result = document.getElementById("result");
  const restartBtn = document.getElementById("restartBtn");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Создаем игровое поле
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  // Обрабатываем событие клика по ячейке
  function handleCellClick(event) {
    const index = event.target.dataset.index;

    // Проверяем, что ячейка пуста и игра не завершена
    if (gameBoard[index] === "" && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      event.target.textContent = currentPlayer;

      // Проверяем, есть ли победитель
      if (checkWinner()) {
        result.textContent = `Player ${currentPlayer} wins!`;
      }
      // Проверяем на ничью
      else if (gameBoard.every(cell => cell !== "")) {
        result.textContent = "It's a draw!";
      }
      // Переключаем текущего игрока
      else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  // Проверяем наличие победителя
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Ряды
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Колонны
      [0, 4, 8], [2, 4, 6]             // Диагонали
    ];

    // Проверяем все возможные победные комбинации
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return true;
      }
    }

    return false;
  }

  // Обрабатываем событие клика по кнопке перезапуска
  restartBtn.addEventListener("click", function () {
    // Сбрасываем состояние игры
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    result.textContent = "";

    // Очищаем содержимое ячеек
    document.querySelectorAll(".cell").forEach(cell => {
      cell.textContent = "";
    });
  });
});
