import { useCallback, useEffect, useState } from "react";

import "./App.css";
import Row from "./components/Row";

type GameStateType = "PLAYING" | "WON" | "LOST";

function App() {
	const [word, setWord] = useState<string>("");
	const boardInitialData = Array.from({ length: 6 }, () => "");
	const [boardData, setBoardData] = useState<string[]>(boardInitialData);
	const [currentRow, setCurrentRow] = useState<number>(0);

  const [gameSate, setGameState] = useState<GameStateType>("PLAYING");

  const initializeGame = useCallback(async () => {
    const response = await fetch("/src/utils/words.json");
    const data = await response.json();
    const newWord = data[Math.floor(Math.random() * data.length)].toUpperCase();
    
    setWord(newWord);
    setBoardData(Array.from({ length: 6 }, () => ""));
    setCurrentRow(0);
    setGameState("PLAYING");
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

	const handleKeyPress = useCallback(
		(event: KeyboardEvent) => {
			// SUBMIT WORD
			if (event.key === "Enter" && boardData[currentRow].length === 5) {
        if (boardData[currentRow] === word) {
          setGameState("WON");
        } 

        if (currentRow === 5 && boardData[currentRow] !== word) {
          setGameState("LOST");
        }

        setCurrentRow((prev) => prev + 1);
			}

			// REMOVE LETTERS
			if (boardData[currentRow].length > 0 && event.key === "Backspace" && gameSate === "PLAYING") {
				setBoardData((prev) =>
					Array.from({ length: 6 }, (_, index) =>
						index === currentRow
							? prev[currentRow].slice(0, -1)
							: prev[index]
					)
				);
			}

			// ADD NEW LETTERS
			if (
				event.key.length === 1 &&
				event.key.match(/[a-z]/) &&
				boardData[currentRow].length < 5 &&
				gameSate === "PLAYING"
			) {
				setBoardData((prev) =>
					Array.from({ length: 6 }, (_, index) =>
						index === currentRow
							? prev[currentRow].toUpperCase() +
							  event.key.toUpperCase()
							: prev[index]
					)
				);
			}
		},
		[boardData, currentRow, gameSate, word]
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleKeyPress]);

	return (
		<>
			<h1>Word: {word}</h1>
			<div className="flex flex-col items-center justify-center ">
				<h1>Guessing: {boardData[currentRow]}</h1>
				{boardData.map((letter, index) => {
					return <Row key={index} inputWord={letter} word={word} shouldApplyClassName={index < currentRow} />;
				})}
			</div>


      {( gameSate === "WON" || gameSate === "LOST" ) && (
        <div className="flex flex-col items-center justify-center mt-16">
          <h1 className="text-xl font-light tracking-tight">You {gameSate === "WON" ? "won!!" : "lost :("}</h1>
          <button className="bg-wordle-accent text-gray-800 text-md px-6 py-3 rounded-xl mt-8 cursor-pointer hover:scale-105 hover:drop-shadow-xl hover:drop-shadow-black/30 hover:-translate-y-1 transition-all duration-200" onClick={initializeGame}>Play Again</button>
        </div>
      )}
		</>
	);
}

export default App;
