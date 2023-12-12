document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];
  let modal, resultMessage, newGameBtn;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleCellClick(i));
    gameContainer.appendChild(cell);
  }
  
  

  function handleCellClick(index) {
    if (board[index] === '' && !checkWinner()) {
      board[index] = currentPlayer;
      renderBoard();
      if (!checkWinner()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        showResultScreen(`Player ${board[a]} wins!`);
        return true;
      }
    }

    if (!board.includes('')) {
      showResultScreen('It\'s a draw!');
      return true;
    }

    return false;
  }

  function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  }

  function showResultScreen(message) {
    modal = document.createElement('div');
    modal.className = 'modal';

    resultMessage = document.createElement('div');
    resultMessage.className = 'result-message';
    resultMessage.textContent = message;
    modal.appendChild(resultMessage);

    newGameBtn = document.createElement('button');
    newGameBtn.className = 'new-game-btn';
    newGameBtn.textContent = 'New Game';
    newGameBtn.addEventListener('click', startNewGame);
    modal.appendChild(newGameBtn);

    document.body.appendChild(modal);
  }

  function startNewGame() {
    if (modal) {
      document.body.removeChild(modal);
    }
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
  }
  
  // Function for restarting the game
  function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
  }
  
  // Add a click event listener to the restart game button
  const restartGameBtn = document.getElementById('restart-game-btn');
  restartGameBtn.addEventListener('click', restartGame);
});
