// Game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// DOM elements
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');

// Initialize the game
function initGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleCellClick);
    });
    updateStatus(`${currentPlayer}'s turn`);
}

// Handle cell click
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    
    // If cell is already filled or game is not active, ignore the click
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Update game state
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    
    // Check for win or draw
    if (checkWin()) {
        updateStatus(`${currentPlayer} Wins!`);
        gameActive = false;
        return;
    }
    
    if (checkDraw()) {
        updateStatus("It's a draw!");
        gameActive = false;
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`${currentPlayer}'s turn`);
}

// Check for win
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

// Check for draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Update status message
function updateStatus(message) {
    statusDisplay.textContent = message;
}

// Reset game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    initGame();
}

// Event listeners
resetButton.addEventListener('click', resetGame);

// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', initGame);