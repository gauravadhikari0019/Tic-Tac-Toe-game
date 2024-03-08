document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    const nameBtn = document.getElementById('nameBtn');
    const nameModal = document.getElementById('nameModal');
    const saveNamesBtn = document.getElementById('saveNames');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    let currentPlayer = 'X';
    let player1Name = 'Player 1';
    let player2Name = 'Player 2';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let player1Wins = 0;
    let player2Wins = 0;

    function renderBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.textContent = gameBoard[i];
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
    }

    function handleCellClick(index) {
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWin() || checkDraw()) {
                gameActive = false;
                if (checkWin()) {
                    status.textContent = `Player ${currentPlayer} (${getCurrentPlayerName()}) wins!`;
                    updateScore();
                } else {
                    status.textContent = 'It\'s a draw!';
                }
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winPatterns.some(pattern => pattern.every(index => gameBoard[index] === currentPlayer));
    }

    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        renderBoard();
    }

    function openNameModal() {
        nameModal.style.display = 'block';
    }

    function closeNameModal() {
        nameModal.style.display = 'none';
    }

    function saveNames() {
        player1Name = player1Input.value.trim() || 'Player 1';
        player2Name = player2Input.value.trim() || 'Player 2';
        closeNameModal();
        resetGame();
        updatePlayerNames();
    }

    function getCurrentPlayerName() {
        return currentPlayer === 'X' ? player1Name : player2Name;
    }

    function updatePlayerNames() {
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function updateScore() {
        if (checkWin()) {
            currentPlayer === 'X' ? player1Wins += 50 : player2Wins += 50;
            status.textContent = `Player ${currentPlayer} (${getCurrentPlayerName()}) wins! ${player1Name}: ${player1Wins} coins, ${player2Name}: ${player2Wins} coins`;
        }
    }

    resetBtn.addEventListener('click', resetGame);
    nameBtn.addEventListener('click', openNameModal);
    saveNamesBtn.addEventListener('click', saveNames);

    resetGame(); // Initial setup
});
