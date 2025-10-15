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

	useEffect(() => {
		const fetchWords = async () => {
			const response = await fetch("/src/utils/words.json");
			const data = await response.json();

			setWord(data[Math.floor(Math.random() * data.length)]);
		};
		fetchWords();
	}, []);

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
          <h1 className="text-2xl font-bold">You {gameSate === "WON" ? "won!!" : "lost :("}</h1>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-md mt-3 cursor-pointer" onClick={() => {
            setGameState("PLAYING")
            setBoardData(Array.from({ length: 6 }, () => ""))
            setCurrentRow(0)
          }}>Play Again</button>
        </div>
      )}
		</>
	);
}

export default App;
