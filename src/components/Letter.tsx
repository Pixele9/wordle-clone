import { useEffect, useState } from "react";

type LetterProps = {
	value: string;
	className?: string;
	style?: React.CSSProperties;
};

export default function Letter({ value, className, style }: LetterProps) {
	const [shouldAnimate, setShouldAnimate] = useState(false);

	useEffect(() => {
		if (value && !className) {
			// Only animate when typing (value exists but no match class)
			setShouldAnimate(true);
			const timer = setTimeout(() => setShouldAnimate(false), 300);
			return () => clearTimeout(timer);
		}
	}, [value, className]);

	return (
		<div
			className={`w-16 h-16 flex text-4xl text-amber-50 font-bold items-center justify-center rounded-xl bg-gray-100/30 ${className} ${shouldAnimate ? 'animate-scale-105' : ''}`}
			style={style}
		>
			{value}
		</div>
	);
}
