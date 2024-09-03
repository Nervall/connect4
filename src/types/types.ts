type Row = number[];
export type Board = Row[];

type PlayerID = number;

type PlayerBody = {
    name: string,
    color: string
}

export type Player = Record<PlayerID, PlayerBody>

export type GameState = {
    board: Board;
    playerTurn: number,
    players: Player,
    winner: boolean,
    draw: boolean
};