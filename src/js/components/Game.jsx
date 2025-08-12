import React, { useEffect, useMemo, useState } from "react";

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { player: sq[a], line: [a, b, c] };
    }
  }
  return null;
}

const Game = ({
  firstPlayer = "X",
  names = { X: "Player 1", O: "Player 2" },
  onBack,
}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(firstPlayer === "X");

  useEffect(() => {
    setXIsNext(firstPlayer === "X");
  }, [firstPlayer]);

  const winnerInfo = useMemo(() => calculateWinner(board), [board]);
  const isFull = board.every((v) => v !== null);
  const winningLine = winnerInfo?.line ?? [];

  const status = winnerInfo
    ? `${winnerInfo.player} (${
        winnerInfo.player === "X" ? names.X : names.O
      }) Wins!`
    : isFull
    ? "Draw!"
    : `It is ${xIsNext ? "X" : "O"} (${xIsNext ? names.X : names.O}) turn!`;

  const handleClick = (i) => {
    if (winnerInfo || board[i]) return;
    const next = [...board];
    next[i] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(firstPlayer === "X");
  };

  return (
    <div>
      <h2>{status}</h2>

      <div className="board-container">
        <div className="board">
          {board.map((cell, idx) => (
            <button
              key={idx}
              className={`cell ${cell ? cell.toLowerCase() : ""} ${
                winningLine.includes(idx) ? "win" : ""
              }`}
              onClick={() => handleClick(idx)}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-dark mt-2" onClick={handleReset}>
        Start Over
      </button>
      <button className="btn btn-dark mt-2" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default Game;
