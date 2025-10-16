import { useCallback, useEffect, useState } from "react";

import Row from "./components/Row";
import Title from "./components/Title";
import Keyboard from "./components/Keyboard";

type GameStateType = "PLAYING" | "WON" | "LOST";

function App() {
	const [word, setWord] = useState<string>("");
	const boardInitialData = Array.from({ length: 6 }, () => "");
	const [boardData, setBoardData] = useState<string[]>(boardInitialData);
	const [currentRow, setCurrentRow] = useState<number>(0);

  const [gameState, setGameState] = useState<GameStateType>("PLAYING");

  const initializeGame = useCallback(async () => {
    try {
      const response = await fetch("/words.json");
      if (!response.ok) {
        throw new Error("Failed to load words");
      }
      const data = await response.json();
      const newWord = data[Math.floor(Math.random() * data.length)].toUpperCase();
      
      setWord(newWord);
      setBoardData(Array.from({ length: 6 }, () => ""));
      setCurrentRow(0);
      setGameState("PLAYING");
    } catch (error) {
      console.error("Error loading words:", error);
    }
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const processKeyInput = useCallback((key: string) => {
    // Handle Enter
    if (key === "Enter" && boardData[currentRow].length === 5 && gameState === "PLAYING") {
      if (boardData[currentRow] === word) {
        setGameState("WON");
      }
      if (currentRow === 5 && boardData[currentRow] !== word) {
        setGameState("LOST");
      }
      setCurrentRow((prev) => prev + 1);
      return;
    }
  
    // Handle Backspace
    if (key === "Backspace" && boardData[currentRow].length > 0 && gameState === "PLAYING") {
      setBoardData((prev) =>
        Array.from({ length: 6 }, (_, index) =>
          index === currentRow ? prev[currentRow].slice(0, -1) : prev[index]
        )
      );
      return;
    }
  
    // Handle letters
    if (
      key.length === 1 &&
      key.match(/[a-zA-Z]/) &&
      boardData[currentRow].length < 5 &&
      gameState === "PLAYING"
    ) {
      setBoardData((prev) =>
        Array.from({ length: 6 }, (_, index) =>
          index === currentRow ? prev[currentRow] + key.toUpperCase() : prev[index]
        )
      );
    }
  }, [boardData, currentRow, gameState, word]);

  const handleKeyPress = useCallback((key: string) => {
    processKeyInput(key);
  }, [processKeyInput]);

  const handleKeyClick = useCallback((key: string) => {
    // Map special symbols to standard key names
    const keyMap: Record<string, string> = {
      "⌫": "Backspace",
      "⏎": "Enter",
    };
    processKeyInput(keyMap[key] || key);
  }, [processKeyInput]);

	
	useEffect(() => {
		const handleDocumentKeyDown = (event: KeyboardEvent) => {
			handleKeyPress(event.key);
		};
		document.addEventListener("keydown", handleDocumentKeyDown);
		return () => {
			document.removeEventListener("keydown", handleDocumentKeyDown);
		};
	}, [handleKeyPress]);
  console.log('word', word)

	return (
		<div className="flex flex-col min-h-screen pb-16">
			{/* <h1>Word: {word}</h1> */}

			<Title />
			<div className="flex flex-col items-center justify-center mt-4 lg:mt-8">
				{boardData.map((letter, index) => {
					return <Row key={index} inputWord={letter} word={word} shouldApplyClassName={index < currentRow} />;
				})}
			</div>


			{( gameState === "WON" || gameState === "LOST" ) ? (
				<div className="flex flex-col items-center justify-center mt-8 lg:mt-12">
					<h1 className="text-xl font-light tracking-tight">You {gameState === "WON" ? "won!!" : "lost :("}</h1>
					<h3 className="text-md font-light tracking-tight">The word was: <span className="font-bold">{word}</span></h3>
					<button className="bg-wordle-accent text-gray-800 text-md px-6 py-3 rounded-xl mt-8 cursor-pointer hover:scale-105 hover:drop-shadow-xl hover:drop-shadow-black/30 hover:-translate-y-1 transition-all duration-200" onClick={initializeGame}>Play Again</button>
				</div>
			) : (
				<Keyboard handleKeyClick={handleKeyClick} />
			)}

      <footer className="flex justify-center mt-auto pt-8 pb-4">
        <a href="https://andres-leal.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 underline hover:text-gray-300 transition-all duration-200">Made with ❤️ by Andres Leal</a>
      </footer>
		</div>
	);
}

export default App;
