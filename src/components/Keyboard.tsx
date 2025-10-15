import Key from "./Key";

export default function Keyboard({
	handleKeyClick,
}: {
	handleKeyClick: (key: string) => void;
}) {
	const LAYOUT = [
		["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
		["A", "S", "D", "F", "G", "H", "J", "K", "L"],
		["Z", "X", "C", "V", "B", "N", "M", "⌫", "⏎"],
	];

	return (
		<div className="flex flex-col items-center justify-center gap-2 mt-8 lg:mt-16 min-w-[300px]">
			{LAYOUT.map((row, index) => (
				<div
					key={index}
					className="flex items-center justify-center gap-2"
				>
					{row.map((key, index) => (
						<Key
							key={index}
							value={key}
							specialKey={key === "⌫" || key === "⏎"}
							onClick={() => handleKeyClick(key)}
						/>
					))}
				</div>
			))}
		</div>
	);
}
