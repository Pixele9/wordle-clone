type LetterProps = {
	value: string;
	className?: string;
};

export default function Letter({ value, className }: LetterProps) {
	return (
		<div
			className={`w-24 h-24 flex text-lg items-center justify-center border-2 border-gray-300 bg-gray-100/30 ${className}`}
		>
			{value}
		</div>
	);
}
