document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const result = document.getElementById("result");
  const restartBtn = document.getElementById("restartBtn");
  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Create the game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }

  // Handle cell click event
  function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === "" && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      if (checkWinner()) {
        result.textContent = `Player ${currentPlayer} wins!`;
      } else if (gameBoard.every(cell => cell !== "")) {
        result.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  // Check for a winner
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return true;
      }
    }

    return false;
  }

  // Handle restart button click event
  restartBtn.addEventListener("click", function () {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    result.textContent = "";
    document.querySelectorAll(".cell").forEach(cell => {
      cell.textContent = "";
    });
  });
});
