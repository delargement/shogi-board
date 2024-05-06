import {PlayerPiece} from "./Piece";

export type Tile = [number, number]
export type PieceMap = PlayerPiece[][]

declare class ShogiBoard {
    constructor(pieceMap?: PieceMap)

    pieceMap: PieceMap
    height: number
    width: number

    get(Tile: Tile): number | null
    set(Tile: Tile, playerPiece: PlayerPiece): ShogiBoard
    has(Tile: Tile): boolean
    clear(): ShogiBoard
    makeMove(
        originalTile: Tile,
        finalTile: Tile,
    ): ShogiBoard
    isSquare(): boolean
    isEmpty(): boolean
}

export default ShogiBoard
