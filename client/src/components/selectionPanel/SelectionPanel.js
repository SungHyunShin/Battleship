import React from "react";
import Square from "../square/Square";
import { PIECE_SIZES, PIECE_NAMES } from "../../constants/constants"
import "./SelectionPanel.css"
import classnames from "classnames";


export default function SelectionPanel({ selectedPieceId, setSelectedPieceId, vertical, setVertical, randomize }) {
    let pieces = []
    for (let i = 0; i < PIECE_SIZES.length; i++) {
        let piece = []
        for (let j = 0; j < PIECE_SIZES[i]; j++) {
            piece.push(<Square key={`display${i.toString() + j.toString()}`} small={true} shipName={PIECE_NAMES[i]} />)
        }
        pieces.push(<div onClick={() => setSelectedPieceId(i)} className={classnames("pieceRow", { "selected": i === selectedPieceId })} key={PIECE_NAMES[i]} id={PIECE_NAMES[i]}>{piece}</div>)
    }
    return (
        <>
            <div className="selectionPanel">
                <div className="titleText">Place Pieces</div>
                <div className="rotateContainer">
                    <div className="text"> Rotate: {vertical ? "Vertical" : "Horizontal"}</div>
                    <button className="rotateButton" onClick={() => setVertical(!vertical)}>
                        <img className="rotateButtonImage" src={require("../../assets/rotate.png")} alt="Rotate" />
                    </button>
                </div>
                <div>
                    {pieces}
                </div>
                <button onClick={randomize}>Random Placement</button>
            </div>
        </>
    )
}