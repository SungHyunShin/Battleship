// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/board/Board";
import SelectionPanel from "./components/selectionPanel/SelectionPanel";
import { PIECE_NAMES, PIECE_SIZES } from "./constants/constants"


export default function App() {
  const [boardState, setBoardState] = React.useState([...Array(10)].map(_ => Array(10).fill(-1)));
  const [hovered, setHovered] = React.useState([...Array(10)].map(_ => Array(10).fill(false)));
  const [pieces, setPieces] = React.useState(Array(5).fill([0, 0, false, false])) // [i,j,placed,vertical]
  const [selectedPieceId, setSelectedPieceId] = React.useState(0)
  const [vertical, setVertical] = React.useState(false)

  function onPlace(clickI, clickJ) {
    let newBoardState = []
    let pieceSize = PIECE_SIZES[selectedPieceId];
    // copy boardState to newBoardState
    for (let i = 0; i < boardState.length; i++) {
      newBoardState[i] = boardState[i].slice();
    }
    // check if the piece is already placed
    if (pieces[selectedPieceId][2] == true) {
      // remove piece from board
      let i = pieces[selectedPieceId][0];
      let j = pieces[selectedPieceId][1];
      for (let x = 0; x < pieceSize; x++) {
        if (pieces[selectedPieceId][3]) {
          newBoardState[i + x][j] = -1;
        }
        else {
          newBoardState[i][j + x] = -1;
        }
      }
    }

    let placeable = true;
    let placementQueue = [];
    // bound our piece to the board edges
    if (vertical) {
      clickI = clickI + pieceSize > 9 ? 9 - pieceSize + 1 : clickI
    }
    else {
      clickJ = clickJ + pieceSize > 9 ? 9 - pieceSize + 1 : clickJ
    }

    // keep track of if this is a valid piece and a list of positions that need to be updated
    for (let x = 0; x < pieceSize; x++) {
      if (vertical) {
        placeable = placeable && newBoardState[clickI + x][clickJ] === -1;
        placementQueue.push([clickI + x, clickJ]);
      }
      else {
        placeable = placeable && newBoardState[clickI][clickJ + x] === -1;
        placementQueue.push([clickI, clickJ + x]);
      }
    }
    if (placeable) {
      //TODO: add this to server check
      for (let x = 0; x < placementQueue.length; x++) {
        let i = placementQueue[x][0];
        let j = placementQueue[x][1];
        newBoardState[i][j] = selectedPieceId;
      }
      setBoardState(newBoardState);
      let newPieces = pieces.slice()
      newPieces[selectedPieceId] = [clickI, clickJ, true, vertical]
      setPieces(newPieces);
    }
  }

  function onHover(i, j) {
    console.log(boardState[i][j], PIECE_NAMES[boardState[i][j]]);
    let pieceSize = PIECE_SIZES[selectedPieceId];
    let currHover = [...Array(10)].map(_ => Array(10).fill(false));
    // bounding
    if (vertical) {
      i = i + pieceSize > 9 ? 9 - pieceSize + 1 : i
      for (let x = 0; x < pieceSize; x++) {
        currHover[i + x][j] = true;
      }
    }
    else {
      j = j + pieceSize > 9 ? 9 - pieceSize + 1 : j
      for (let x = 0; x < pieceSize; x++) {
        currHover[i][j + x] = true;
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
      <Board hovered={hovered} selectedPieceId={selectedPieceId} vertical={vertical} board={boardState} onPlace={onPlace} onHover={onHover} />
      <SelectionPanel selectedPieceId={selectedPieceId} setSelectedPieceId={setSelectedPieceId} vertical={vertical} setVertical={setVertical} />
    </div>
  );
}