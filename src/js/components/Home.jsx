import React, { useState } from "react";
import PickWeapon from "./PickWeapon";
import Game from "./Game";

//create your first component
const Home = () => {
  const [step, setStep] = useState("pick");
  const [firstPlayer, setFirstPlayer] = useState("X");
  const [names, setNames] = useState({ X: "", O: "" }); // ← start empty

  const handleStartGame = ({ firstPlayer: chosen, names: pickedNames }) => {
    setFirstPlayer(chosen);
    setNames(pickedNames);
    setStep("game");
  };

  const handleBackToPick = () => {
    setStep("pick");
    setNames({ X: "", O: "" }); // ← clear inputs on return
    setFirstPlayer("X"); // (optional) reset starter
  };

  return (
    <div className="text-center container py-4">
      <h1 className="text-center mb-4">Tic Tac Toe in React.js</h1>
      {step === "pick" ? (
        <PickWeapon onStart={handleStartGame} defaultNames={names} />
      ) : (
        <Game
          firstPlayer={firstPlayer}
          names={names}
          onBack={handleBackToPick}
        />
      )}
    </div>
  );
};

export default Home;
