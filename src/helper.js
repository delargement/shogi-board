export const subtractTile = ([a,b],[c,d]) => [a-c,b-d]
export const transposeTile = ([a,b,N]) => [N-1-a,N-1-b]
export const kingmoves = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1],[1,0],[1,1]]
export const genrookmoves = (n) => {
    const res = [];
    for (let i = 1; i < n; i++) {
        res.push([0,i]);
        res.push([0,-i]);
        res.push([-i,0]);
        res.push([i,0]);
    }
    return res;
}
export const genbishopmoves = (n) => {
    const res = [];
    for (let i = 1; i < n; i++) {
        res.push([-i,-i]);
        res.push([-i,i]);
        res.push([i,-i]);
        res.push([i,i]);
    }
    return res;
}
export const genlancemoves = (n) => {
    const res = [];
    for (let i = 1; i < n; i++) {
        res.push([0,-i]);
    }
    return res;
}
export const movepatterns = (n) => new Map([
    ["FU", [[0,-1]]],
    ["GY", kingmoves],
    ["OU", kingmoves],
    ["HI", genrookmoves(n)],
    ["KA", genbishopmoves(n)],
    ["KE", [[-2,-1],[-2,1]]],
    ["KI", [[0,-1], [-1,-1], [1,-1],[-1,0],[1,0], [0,1]]],
    ["KY", genlancemoves(n)],
    ["GI", [[0,-1], [-1,-1], [1,-1], [-1,1], [1,-1]]],
    ["NG", [[0,-1], [-1,-1], [1,-1], [-1,1], [1,-1]]],
    ["NK", [[0,-1], [-1,-1], [1,-1], [-1,1], [1,-1]]],
    ["NY", [[0,-1], [-1,-1], [1,-1], [-1,1], [1,-1]]],
    ["NG", [[0,-1], [-1,-1], [1,-1], [-1,1], [1,-1]]],
    ["TO", [[0,-1], [-1,-1], [1,-1], [-1,1], [1,-1]]],
    ["RY", genrookmoves(n).concat(kingmoves)],
    ["UM", genbishopmoves(n).concat(kingmoves)],
])
function searchForArray(needle, haystack){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
        if(needle.length === haystack[i].length){
            current = haystack[i];
            for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
            if(j === needle.length)
                return true;
        }
    }
    return false;
}

export function isValidMove(playerPiece, originalTile, finalTile, N)  {

    if (finalTile[0] >= N || finalTile[1] >= N) return false

    if (playerPiece.player === -1) {
        originalTile = transposeTile(originalTile);
        finalTile = transposeTile(finalTile);
    }
    const sub = subtractTile(finalTile,originalTile)
    return searchForArray(sub,movepatterns(N)[playerPiece.piece]);
}