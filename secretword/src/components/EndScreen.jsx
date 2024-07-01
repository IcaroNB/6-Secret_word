import "./EndScreen.css"
import gameOverImg from "./assets/gameOverImg.png";

const EndScreen = ({newGame, score, pickedWord}) => {
  return (
    <div className="gameOverContainer">
      <img src={gameOverImg} className="gameOver"></img>
      <h2>Pontuação: <span>{score}</span></h2>
      <h3>A palavra era: <span>{pickedWord}</span></h3>
      <button onClick={newGame}>Iniciar novo Jogo</button>
    </div>
  )
}

export default EndScreen
