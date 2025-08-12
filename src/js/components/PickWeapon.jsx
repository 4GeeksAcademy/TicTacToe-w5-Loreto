import React, { useState, useEffect } from "react";

const PickWeapon = ({ onStart, defaultNames = { X: "", O: "" } }) => {
  const [choice, setChoice] = useState("X");
  const [nameX, setNameX] = useState("");
  const [nameO, setNameO] = useState("");

  // If parent sends names (you could keep this or remove it; it keeps in sync)
  useEffect(() => {
    setNameX(defaultNames.X ?? "");
    setNameO(defaultNames.O ?? "");
  }, [defaultNames]);

  const handleStart = () => {
    const trimmedX = nameX.trim() || "Player X"; // ← fallback only when starting
    const trimmedO = nameO.trim() || "Player O";
    onStart({ firstPlayer: choice, names: { X: trimmedX, O: trimmedO } });
  };

  return (
    <div
      className="d-flex flex-column align-items-center gap-3"
      style={{ maxWidth: 420, margin: "0 auto" }}
    >
      <h3 className="mb-2">Choose your weapon & names</h3>

      <div className="w-100">
        <label className="form-label text-start w-100">Name for X</label>
        <input
          className="form-control"
          value={nameX}
          onChange={(e) => setNameX(e.target.value)}
          placeholder="Player X" // ← placeholder instead of preset text
          onFocus={(e) => e.target.select()} // nice UX: select-all on click
        />
      </div>

      <div className="w-100">
        <label className="form-label text-start w-100">Name for O</label>
        <input
          className="form-control"
          value={nameO}
          onChange={(e) => setNameO(e.target.value)}
          placeholder="Player O"
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="btn-group mt-2" role="group" aria-label="Who starts?">
        <button
          type="button"
          className={`btn ${
            choice === "X" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setChoice("X")}
        >
          X starts
        </button>
        <button
          type="button"
          className={`btn ${
            choice === "O" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setChoice("O")}
        >
          O starts
        </button>
      </div>

      <button className="btn btn-dark mt-2" onClick={handleStart}>
        Start game
      </button>
    </div>
  );
};

export default PickWeapon;
