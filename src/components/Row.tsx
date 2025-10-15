import Letter from "./Letter";

type RowProps = {
	inputWord: string;
	word: string;
	shouldApplyClassName: boolean;
};

const getLetterClassName = (
	guessLetter: string,
	targetLetter: string,
	targetWord: string
) => {
	const targetWordArray = Array.from(targetWord);

	if (guessLetter === targetLetter) {
		return "bg-wordle-match animate-match-animation";
	} else if (targetWordArray.includes(guessLetter)) {
		return "bg-wordle-partial-match animate-match-animation";
	} else {
		return "bg-wordle-no-match animate-match-animation";
	}
};

export default function Row({ inputWord, word, shouldApplyClassName }: RowProps) {
	const rowLetter = Array.from(
		{ length: 5 },
		(_, index) => inputWord[index] || ""
	);

	return (
		<div className="flex flex-row items-center justify-center gap-2 my-1">
			{rowLetter.map((letter, index) =>
				(
					<Letter
						key={index}
						value={letter}
						className={shouldApplyClassName ? getLetterClassName(letter, word[index], word) + ` text-slate-800` : ""}
						style={shouldApplyClassName ? { animationDelay: `${index * 200}ms` } : undefined}
					/>
				)
			)}
		</div>
	);
}
