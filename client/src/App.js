// client/src/App.js

import React from "react";
import "./App.css";
import Board from "./components/board/Board";
import SelectionPanel from "./components/selectionPanel/SelectionPanel";
import { PIECE_SIZES } from "./constants/constants"

function place(placeQueue, oldBoard, pieces) {
  let newBoard = [];
  let newPieces = pieces.slice();
  for (let i = 0; i < oldBoard.length; i++) {
    newBoard[i] = oldBoard[i].slice();
  }
  for (let x = 0; x < placeQueue.length; x++) {
    // place for each command
    let i = placeQueue[x][0];
    let j = placeQueue[x][1];
    let v = placeQueue[x][2]
    for (let y = 0; y < PIECE_SIZES[x]; y++) {
      if (v) {
        newBoard[i + y][j] = x
      }
      else {
        newBoard[i][j + y] = x
      }
    }
    newPieces[x] = [i, j, true, v]
  }
  return [newBoard, newPieces];
}

export default function App() {
  const [boardState, setBoardState] = React.useState([...Array(10)].map(_ => Array(10).fill(-1)));
  const [hovered, setHovered] = React.useState([...Array(10)].map(_ => Array(10).fill(false)));
  const [pieces, setPieces] = React.useState(Array(5).fill([0, 0, false, false])) // [i,j,placed,vertical]
  const [selectedPieceId, setSelectedPieceId] = React.useState(0)
  const [vertical, setVertical] = React.useState(false)

  const randomize = React.useCallback(() => {
    fetch("/random")
      .then((res) => res.json())
      .then((piecesList) => {
        let placeVars = place(piecesList, boardState, pieces);
        setBoardState(placeVars[0]);
        setPieces(placeVars[1]);
      });
  }, [boardState, pieces]);

  function onPlace(clickI, clickJ) {
    let newBoardState = []
    let pieceSize = PIECE_SIZES[selectedPieceId];
    // copy boardState to newBoardState
    for (let i = 0; i < boardState.length; i++) {
      newBoardState[i] = boardState[i].slice();
    }
    // check if the piece is already placed
    if (pieces[selectedPieceId][2] === true) {
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

  return (
    <div className="App">
      <Board hovered={hovered} selectedPieceId={selectedPieceId} vertical={vertical} board={boardState} onPlace={onPlace} onHover={onHover} />
      <SelectionPanel selectedPieceId={selectedPieceId} setSelectedPieceId={setSelectedPieceId} vertical={vertical} setVertical={setVertical} randomize={randomize} />
    </div>
  );
}