import { Board } from '../types/types';
import { ROWS, COLUMNS } from './constants';

/* ******* BOARD *******
 [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]
*************************/

export function createBoard(): Board {
    const board = [];
    for (let row = 0; row < ROWS; row = row + 1) {
        board.push(Array.from({ length: COLUMNS}, () => (
           0
        )))
    }
    return board;
};

export function checkHorizontally(board: Board, player: number): boolean {
    for( let row = 0; row < ROWS; row = row +1 ) {
        for (let col = 0; col < COLUMNS; col = col + 1 ) {
        if (board[row][col] === player
            && board[row][col + 1] === player
            && board[row][col + 2] === player
            && board[row][col + 3] === player) {
            return true;
            }
        }
    }
    return false;
};

export function checkVertically(board: Board, player: number): boolean {
    for( let row = ROWS - 1; row >= ROWS - (ROWS - 3); row = row - 1 ) {
        for (let col = 0; col < COLUMNS; col = col + 1 ) {
        if (board[row][col] 
            && board[row][col] === player
            && board[row - 1][col] === player
            && board[row - 2][col] === player
            && board[row - 3][col] === player) {
            return true;
            }
        }
    }
    return false;
};

export function checkDiagonalLeft(board: Board, player: number): boolean {
    for( let row = ROWS - (ROWS - 3); row < ROWS; row = row +1 ) {
        for (let col = COLUMNS - (COLUMNS - 3); col < COLUMNS; col = col + 1 ) {
        if (board[row][col] 
            && board[row][col] === player
            && board[row - 1][col - 1] === player
            && board[row - 2][col - 2] === player
            && board[row - 3][col - 3] === player) {
            return true;
            }
        }
    }
    return false;
};

export function checkDiagonalRight(board: Board, player: number): boolean {
    for( let row = ROWS - (ROWS - 3); row < ROWS; row = row + 1 ) {
        for (let col = 0; col <= COLUMNS - (COLUMNS - 3); col = col + 1 ) {
        if (board[row][col] 
            && board[row][col] === player
            && board[row - 1][col + 1] === player
            && board[row - 2][col + 2] === player
            && board[row - 3][col + 3] === player) {
            return true;
            }
        }
    }
    return false;
};

export function checkWinner(board: Board, player: number): boolean {
    return checkHorizontally(board, player) || 
    checkVertically(board, player) || 
    checkDiagonalLeft(board, player) ||
    checkDiagonalRight(board, player)
}

export function checkDraw(board: Board): boolean {
    return board.every((row) => {
        return row.every(( cell ) => {
             return cell !== 0
        })
    })
};
