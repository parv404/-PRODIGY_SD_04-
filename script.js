document.addEventListener("DOMContentLoaded", function() {
    const sudokuBoard = document.querySelector('.sudoku-board');
    const solveButton = document.getElementById('solveButton');

    // Generate Sudoku cells
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        const input = document.createElement('input');
        input.maxLength = 1;
        cell.classList.add('sudoku-cell');
        cell.appendChild(input);
        sudokuBoard.appendChild(cell);
    }

    solveButton.addEventListener('click', solveSudoku);

    function solveSudoku() {
        const board = getBoard();
        if (solve(board)) {
            displayBoard(board);
        } else {
            alert("No solution exists for the given Sudoku puzzle!");
        }
    }

    function getBoard() {
        const board = [];
        const cells = document.querySelectorAll('.sudoku-cell input');
        let cellIndex = 0;
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const value = cells[cellIndex].value.trim();
                row.push(value === '' ? 0 : parseInt(value));
                cellIndex++;
            }
            board.push(row);
        }
        return board;
    }

    function displayBoard(board) {
        const cells = document.querySelectorAll('.sudoku-cell input');
        let cellIndex = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cells[cellIndex].value = board[i][j];
                cellIndex++;
            }
        }
    }

    function solve(board) {
        const emptyCell = findEmptyCell(board);
        if (!emptyCell) {
            return true; // Puzzle solved successfully
        }

        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
                board[row][col] = num;

                if (solve(board)) {
                    return true;
                }

                board[row][col] = 0; // Backtrack
            }
        }

        return false; // No solution found
    }

    function findEmptyCell(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return null;
    }

    function isValidMove(board, row, col, num) {
        return (
            !isInRow(board, row, num) &&
            !isInCol(board, col, num) &&
            !isInBox(board, row - (row % 3), col - (col % 3), num)
        );
    }

    function isInRow(board, row, num) {
        return board[row].includes(num);
    }

    function isInCol(board, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return true;
            }
        }
        return false;
    }

    function isInBox(board, startRow, startCol, num) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return true;
                }
            }
        }
        return false;
    }
});
