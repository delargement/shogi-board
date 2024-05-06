
export default class Piece {
    constructor(piece){
        this.piece = piece;
    }
}
class PlayerPiece extends Piece {
    constructor(piece, player) {
        super(piece);
        this.player = player;
    }
}
export { PlayerPiece }
