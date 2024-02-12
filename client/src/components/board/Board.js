import React from "react";
import "./Board.css"
import Square from "../square/Square"

export default function Board({ hovered, selectedPieceId, vertical, board, onPlace, onHover }) {
    // create front end
    let boardBuild = [];

    for (let i = 0; i < 10; i++) {
        let boardRow = []
        for (let j = 0; j < 10; j++) {
            boardRow.push(
                <Square
                    key={i.toString() + j.toString()}
                    onHover={() => onHover(i, j)}
                    hovered={hovered[i][j]}
                    onClickFunc={() => onPlace(i, j)}
                    pieceSet={board[i][j]}
                />
            );
        }
        boardBuild.push(<div key={`row${i.toString()}`} className="boardRow">{boardRow}</div>);
    }

    return <span className="board">{boardBuild}</span>;
}