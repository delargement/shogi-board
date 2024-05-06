
declare class Piece {
    constructor(piece?: string)
    piece: string
}
declare class PlayerPiece extends Piece {
    constructor(piece?: string, player?: number)
    player: boolean
}
export { PlayerPiece }
export default Piece
