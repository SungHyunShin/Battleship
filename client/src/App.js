// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/board/Board";
import SelectionPanel from "./components/selectionPanel/SelectionPanel";
import {PIECE_SIZES} from "./constants/constants"


export default function App() {
  const [boardState, setBoardState] = React.useState([...Array(10)].map(_=>Array(10).fill(-1)));
  const [hovered, setHovered] = React.useState([...Array(10)].map(_=>Array(10).fill(false)));
  const [pieces, setPieces] = React.useState(Array(5).fill([0, 0, false]))
  const [selectedPieceId, setSelectedPieceId] = React.useState(0)
  const [vertical, setVertical] = React.useState(false)

  function onPlace() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
      }
    }
    return;
  }

  function onHover(i, j) {
    let pieceSize = PIECE_SIZES[selectedPieceId];
    let currHover = [...Array(10)].map(_=>Array(10).fill(false));
    // bounding
    if (vertical) {
      i = i + pieceSize > 9 ? 9 - pieceSize + 1 : i
      for (let x = 0; x < pieceSize; x++) {
        currHover[i+x][j] = true;
      }
    }
    else {
      j = j + pieceSize > 9 ? 9 - pieceSize + 1: j
      for (let x = 0; x < pieceSize; x++) {
        currHover[i][j+x] = true;
      }
    }
    setHovered(currHover);
  }
/*
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
*/
  return (
    <div className="App">
      <span><Board hovered = {hovered} selectedPieceId={selectedPieceId} vertical={vertical} board={boardState} onPlace={onPlace} onHover = {onHover}/></span>
      <span><SelectionPanel vertical={vertical} setVertical={setVertical} /></span>
    </div>
  );
}