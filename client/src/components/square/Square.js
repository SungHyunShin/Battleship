import "./Square.css";
import classnames from "classnames";
import React from "react";
export default function Square({ onHover, onClickFunc, pieceSet, hovered, small, shipName }) {
    return (
        <button onMouseOver={onHover} className={classnames("square", shipName, { "hovered": hovered }, { "small": small })} onClick={onClickFunc}></button>
    )
}