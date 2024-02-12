import "./Square.css";
import classnames from "classnames";
import React from "react";
import { PIECE_NAMES } from "../../constants/constants"

export default function Square({ onHover, onClickFunc, pieceSet, hovered, small, shipName}) {
    let placedShip = null;
    if(pieceSet!==-1 || pieceSet !== null){
        placedShip = PIECE_NAMES[pieceSet]
    }
    return (
        <button onMouseOver={onHover} className={classnames("square", placedShip, shipName, { "hovered": hovered }, { "small": small })} onClick={onClickFunc}></button>
    )
}