import Letter from "./Letter";

export default function Title() {
	const STYLE = {
		width: "2.5rem",
		height: "2.5rem",
		fontSize: "1.7rem",
	};

	const CLASSNAME = "text-md bg-wordle-partial-match text-slate-800";

	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<Letter
				value="W"
				className={CLASSNAME}
				style={STYLE}
			/>
			<Letter
				value="O"
				className={CLASSNAME}
				style={STYLE}
			/>
			<Letter
				value="R"
				className={CLASSNAME}
				style={STYLE}
			/>
			<Letter
				value="D"
				className={CLASSNAME}
				style={STYLE}
			/>
			<Letter
				value="L"
				className={CLASSNAME}
				style={STYLE}
			/>
			<Letter
				value="E"
				className={CLASSNAME}
				style={STYLE}
			/>
		</div>
	);
}
