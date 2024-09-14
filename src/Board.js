import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { render } from "@testing-library/react";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      initialBoard.push([]);
      for (let b = 0; b < ncols; b++) {
        const isLit = Math.random() < chanceLightStartsOn;
        initialBoard[i].push(isLit);
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let row of board) {
      for (let cell of row) {
        if (cell) return false;
      }
    }
    return true;
  }

  function flipCellsAroundMe(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);

      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You win! Congrats!</div>
  }
  // TODO

  // make table board
  return (
    <table className="Board">
      <tbody>
        {board.map((row, y) => (
          <tr key={y}>
            {row.map((isLit, x) => (
              <Cell
                key={`${y}-${x}`}
                isLit={isLit}
                flipCellsAroundMe={() => flipCellsAroundMe(`${y}-${x}`)}
                 />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

  // TODO
}

export default Board;
