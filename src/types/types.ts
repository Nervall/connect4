type Row = number[];
export type Board = Row[];

export type Player = {
    name: string,
    color: string
};

export type GameState = {
    board: Board;
    playerTurn: number,
    player1: Player,
    player2: Player,
    winner: boolean,
    draw: boolean
};