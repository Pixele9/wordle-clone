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
		return "match";
	} else if (targetWordArray.includes(guessLetter)) {
		return "partial-match";
	} else {
		return "no-match";
	}
};

export default function Row({ inputWord, word, shouldApplyClassName }: RowProps) {
	const rowLetter = Array.from(
		{ length: 5 },
		(_, index) => inputWord[index] || ""
	);

	return (
		<div className="flex flex-row items-center justify-center gap-4 my-2">
			{rowLetter.map((letter, index) =>
				(
					<Letter
						key={index}
						value={letter}
						className={shouldApplyClassName ? getLetterClassName(letter, word[index], word) + ` delay-${index * 0.1}s` : ""}
					/>
				)
			)}
		</div>
	);
}
