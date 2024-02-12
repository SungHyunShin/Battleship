// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const pieceSizes = [5, 4, 4, 3, 2];

var boardState = [...Array(10)].map(_ => Array(10).fill(-1));
/*
boardState is a 2d array of size 10x10. Values of -1 mean empty, and 
any other value will be the index value of the piece.
*/

var pieces = Array(5).fill([0, 0, false, false]) // [i,j,placed,vertical]

function randomizeFull() {
    let newBoard = [...Array(10)].map(_ => Array(10).fill(-1));
    let res = []
    for (let x = 0; x < pieceSizes.length; x++) {
        res[x] = randomizeCoor(pieceSizes[x], newBoard);
        newBoard = place(newBoard, res[x][0], res[x][1], res[x][2], pieceSizes[x], x);
    }
    boardState = newBoard;
    return res;
}

function randomizeCoor(size, newBoard) {
    let vertical = Math.random() < 0.5;
    let i = Math.floor(Math.random() * (vertical ? 10 - size + 1 : 10));
    let j = Math.floor(Math.random() * (!vertical ? 10 - size + 1 : 10));
    while (!valid(i, j, size, vertical, newBoard)) {
        i = Math.floor(Math.random() * (vertical ? 10 - size + 1 : 10));
        j = Math.floor(Math.random() * (!vertical ? 10 - size + 1 : 10));
        vertical = Math.random() < 0.5;
    }
    return [i, j, vertical];
}

function place(oldBoard, i, j, vertical, pieceSize, shipIndex) {
    let newBoard = [];
    for (let x = 0; x < oldBoard.length; x++) {
        newBoard[x] = oldBoard[x].slice();
    }
    for (let x = 0; x < pieceSize; x++) {
        if (vertical) {
            newBoard[i + x][j] = shipIndex;
        }
        else {
            newBoard[i][j + x] = shipIndex;
        }
    }
    return newBoard;
}

function valid(i, j, size, vertical, b) {
    if ((vertical && i + size > 9) || (!vertical && j + size > 9)) {
        return false;
    }
    for (let x = 0; x < size; x++) {
        if (vertical) {
            if (b[i + x][j] !== -1) {
                return false
            }
        }
        else {
            if (b[i][j + x] !== -1) {
                return false
            }
        }
    }
    return true;
}

app.get("/random", (req, res) => {
    res.json(randomizeFull());
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});