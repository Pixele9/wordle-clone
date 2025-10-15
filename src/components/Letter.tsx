type LetterProps = {
	value: string;
	className?: string;
};

export default function Letter({ value, className }: LetterProps) {
	return (
		<div
			className={`w-24 h-24 flex text-5xl text-amber-50 font-bold items-center justify-center rounded-xl bg-gray-100/30 ${className}`}
		>
			{value}
		</div>
	);
}
