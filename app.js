const resultContainer = document.querySelector('.result');
const winningPlayer = document.querySelector('.result h1');
const grid = document.querySelector('.grid');
const heading = document.querySelector('.heading');

let playing = true;
let currentPlayer = 'unicorn';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function switchPlayer() {
  currentPlayer = currentPlayer === 'unicorn' ? 'alien' : 'unicorn';
  heading.innerHTML = `${currentPlayer === 'unicorn' ? '🦄' : '👽'} Turn`;
}

function showResult(winner) {
  grid.style.display = 'none';
  resultContainer.style.display = 'flex';
  heading.style.display = 'none';
  if (winner && winner === 'unicorn') {
    winningPlayer.innerHTML = 'Unicorn won! 🦄🎉';
  } else {
    winningPlayer.innerHTML = 'Alien won! 👽🎉';
  }
}

function determineResult() {
  let roundWon = false;
  let winner;
  for (let i = 0; i <= 7; i++) {
    const singleWinCondition = winningConditions[i];
    let cellA = gameState[singleWinCondition[0]];
    let cellB = gameState[singleWinCondition[1]];
    let cellC = gameState[singleWinCondition[2]];
    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      winner = cellA;
      break;
    }
  }
  if (roundWon) {
    showResult(winner);
  }
  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    showResult();
    winningPlayer.innerHTML = 'Game ended in a draw!';
    playing = false;
    return;
  }
  switchPlayer();
}

function cellClicked(e) {
  const clickedCellIndex = parseInt(e.target.getAttribute('data-cell-index'));
  if (gameState[clickedCellIndex] !== '' || !playing) {
    return;
  }
  gameState[clickedCellIndex] = currentPlayer;
  e.target.innerHTML = `${currentPlayer === 'unicorn' ? '🦄' : '👽'}`;
  e.target.style.cursor = 'auto';
  determineResult();
}

function restartGame() {
  playing = true;
  currentPlayer = 'unicorn';
  gameState = ['', '', '', '', '', '', '', '', ''];
  grid.style.display = 'grid';
  resultContainer.style.display = 'none';
  heading.style.display = 'block';
  heading.innerHTML = 'Tic Tac Toe';
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.innerHTML = '';
    cell.style.cursor = 'pointer';
  });
}

document.querySelector('.result button').addEventListener('click', restartGame);
document
  .querySelectorAll('.cell')
  .forEach((cell) => cell.addEventListener('click', cellClicked));
