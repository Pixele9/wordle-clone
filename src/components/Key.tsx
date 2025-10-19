type KeyProps = {
	value: string;
	className?: string;
	specialKey?: boolean;
	onClick: () => void;
};

export default function Key({ value, className, specialKey, onClick }: KeyProps) {
	return (
		<button
			className={`min-w-7 h-10 lg:w-14 lg:h-16 flex items-center justify-center rounded-md  text-gray-800 text-bold text-md ${className} ${
				specialKey ? "bg-wordle-accent w-12 lg:w-20 lg:h-16" : "bg-[#E1DFD7]"
			}`}
			onClick={onClick}
		>
			{value}
		</button>
	);
}
