import { useState, useEffect } from "react"
import Letter from "./components/Letter"

export default function HowToPlay({ onClose }: { onClose: () => void }) {
	const [isClosing, setIsClosing] = useState(false)

	const handleClose = () => {
		setIsClosing(true)
		setTimeout(() => {
			onClose()
		}, 300) // Match animation duration
	}

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			handleClose()
		}
	}

	// Prevent body scroll when modal is open
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [])

	return (
		<div 
			className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
				isClosing ? 'opacity-0' : 'opacity-100'
			}`}
			onClick={handleBackdropClick}
		>
			<div 
				className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl shadow-2xl transition-all duration-300 ${
					isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button 
					onClick={handleClose} 
					className="absolute top-4 right-4 text-white text-3xl font-light hover:text-gray-300 transition-colors z-10 w-8 h-8 flex items-center justify-center hover:cursor-pointer"
					aria-label="Close"
				>
					×
				</button>

				{/* Content */}
				<div className="p-6 sm:p-8 md:p-10">
					{/* Header */}
					<section className="mb-8">
						<h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">How To Play</h1>
						<p className="text-base sm:text-lg text-gray-300 mb-4">Guess the Wordle in 6 tries.</p>
						<ul className="text-left space-y-2 text-gray-300 text-sm sm:text-base">
							<li className="flex items-start">
								<span className="mr-2">•</span>
								<span>Each guess must be a valid 5-letter word.</span>
							</li>
							<li className="flex items-start">
								<span className="mr-2">•</span>
								<span>The color of the tiles will change to show how close your guess was to the word.</span>
							</li>
						</ul>
					</section>

					{/* Examples Section */}
					<section className="mb-6">
						<h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Examples</h2>
						
						{/* Example 1 - Correct position */}
						<div className="mb-6">
							<div className="flex gap-1 sm:gap-2 mb-3 justify-start">
								<Letter value="M" className="bg-wordle-match !text-gray-900" />
								<Letter value="O" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="V" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="I" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="E" className="bg-gray-700 border-2 border-gray-600" />
							</div>
							<p className="text-left text-gray-300 text-sm sm:text-base">
								<span className="font-bold">M</span> is in the word and in the correct spot.
							</p>
						</div>

						{/* Example 2 - Wrong position */}
						<div className="mb-6">
							<div className="flex gap-1 sm:gap-2 mb-3 justify-start">
								<Letter value="A" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="P" className="bg-wordle-partial-match !text-gray-900" />
								<Letter value="P" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="L" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="Y" className="bg-gray-700 border-2 border-gray-600" />
							</div>
							<p className="text-left text-gray-300 text-sm sm:text-base">
								<span className="font-bold">P</span> is in the word but in the wrong spot.
							</p>
						</div>

						{/* Example 3 - Not in word */}
						<div className="mb-6">
							<div className="flex gap-1 sm:gap-2 mb-3 justify-start">
								<Letter value="E" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="N" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="T" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="E" className="bg-gray-700 border-2 border-gray-600" />
								<Letter value="R" className="bg-gray-700 border-2 border-gray-600" />
							</div>
							<p className="text-left text-gray-300 text-sm sm:text-base">
								<span className="font-bold">Not a single</span> letter is in the word.
							</p>
						</div>
					</section>

				</div>
			</div>
		</div>
	)
}
