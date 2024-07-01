import React from "react";
import "./StartScreen.css";
import startScreenImg from "./assets/startScreenImg.png";

const StartScreen = ({startGame}) => {
  return (
    <div className="startScreen">
      <img src={startScreenImg} alt="Start Screen" />
      <p>Clique no botão para iniciar!</p>
      <button onClick={startGame}>Iniciar Jogo</button>
    </div>
  );
}

export default StartScreen;
