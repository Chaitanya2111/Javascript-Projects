document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        if (!gameBoard.includes('')) {
            return 'draw';
        }

        return null;
    }

    function handleCellClick(index) {
        if (gameBoard[index] || !gameActive) return;

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        const winner = checkWinner();

        if (winner) {
            gameActive = false;
            if (winner === 'draw') {
                message.textContent = 'It\'s a draw!';
            } else {
                message.textContent = `Player ${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function handleReset() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        message.textContent = '';
        cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.dataset.index;
            handleCellClick(index);
        });
    });

    resetButton.addEventListener('click', handleReset);
});
