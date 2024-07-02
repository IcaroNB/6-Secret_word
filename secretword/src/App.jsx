// CSS
import "./App.css";

// React
import React, { useCallback, useEffect, useState } from "react";

// Data
import { wordsList } from "./data/words";

// Components
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import EndScreen from "./components/EndScreen";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    // Pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];

    // Pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  // Starts the game
  const startGame = () => {
    // Pick word and category
    const { word, category } = pickWordAndCategory();

    // Create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    // Fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    clearLettersStates();

    // Change the stage
    setGameStage(stages[1].name);
  };
  // clear all states

  const clearLettersStates = () => {
    setGuesses(5);
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // Check if the letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Check if the letter is in the word
    if (letters.includes(normalizedLetter)) {
      const updatedGuessedLetters = [...guessedLetters, normalizedLetter];
      setGuessedLetters(updatedGuessedLetters);

      const uniqueLetters = [...new Set(letters)];

      //win condition

      if (updatedGuessedLetters.length === uniqueLetters.length) {
        setScore((actualScore) => (actualScore += 100));
        startGame();
      }
    } else {
      setWrongLetters((currentWrongLetters) => [
        ...currentWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((currentGuesses) => currentGuesses - 1);
    }
  };

  //useEffect for monitoring
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Starts a new game
  const newGame = () => {
    setGameStage(stages[0].name);
    setGuesses(5);
    setScore(0);
  };

  return (
    <div className="App">
      {gameStage === "start" && (
        <StartScreen startGame={startGame}></StartScreen>
      )}
      {gameStage === "game" && (
        <GameScreen
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        ></GameScreen>
      )}
      {gameStage === "end" && (
        <EndScreen
          newGame={newGame}
          score={score}
          pickedWord={pickedWord}
        ></EndScreen>
      )}
    </div>
  );
}

export default App;
