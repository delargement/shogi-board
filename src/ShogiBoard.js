const {isValidMove} = require("./helper");
const {PlayerPiece} = require("./Piece");

function setupBoard()  {
    let a = [
        ["KY","KE","GI","KI","OU","KI","GI","KE","KY"],
            [null,"HI",null,null,null,null,null,"KA",null],
            ["FU","FU","FU","FU","FU","FU","FU","FU","FU"],
            [null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null],
            ["FU","FU","FU","FU","FU","FU","FU","FU","FU"],
            [null,"HI",null,null,null,null,null,"KA",null],
            ["KY","KE","GI","KI","OU","KI","GI","KE","KY"]
        ]
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
            if (i > 4) {
                a[i][j] = new PlayerPiece(a[i][j],1)
            } else {
                a[i][j] = new PlayerPiece(a[i][j],-1)
            }
        }
    }
    return a;
}

class ShogiBoard {
    constructor(pieceMap = setupBoard()) {
        this.pieceMap = pieceMap
        this.height = pieceMap.length
        this.width = this.height === 0 ? 0 : pieceMap[0].length

        if (pieceMap.some(row => row.length !== this.width)) {
            throw new Error('pieceMap is not well-formed')
        }
        //  sente - gote
        this.players = [1, -1]
        this.captures = new Map([[-1,[]], [1,[]]]);
    }

    get([x, y]) {
        return this.pieceMap[y] != null ? this.pieceMap[y][x] : null
    }

    set([x, y], piece) {
        if (this.has([x, y])) {
            this.pieceMap[y][x] = piece
        }

        return this
    }

    has([x, y]) {
        return 0 <= x && x < this.width && 0 <= y && y < this.height
    }

    clear() {
        this.pieceMap = this.pieceMap.map(row => row.map(_ => null))
        return this
    }

    movePiece(originalTile,finalTile) {
        const piece = this.get(originalTile);
        const player = piece.player;
        if (this.get(finalTile) !== null && this.get(finalTile).player === player) {
            throw new Error("Cannot move piece on top your own pieces");
        }
        if (!isValidMove(piece,originalTile,finalTile,this.width)) {
            throw new Error("Invalid move");
        }

        if (this.get(finalTile) !== null) {
            this.captures[player].push(new Piece(this.get(finalTile)))
        }
        this.set(originalTile, null);
        this.set(finalTile, piece);

    }

    isSquare() {
        return this.width === this.height
    }

    isEmpty() {
        return this.pieceMap.every(row => row.every(x => x === null))
    }
}

module.exports = ShogiBoard
