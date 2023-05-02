import React from "react";

function RangeSlider(props) {
	const handleMax = (e) => {
		const value = parseInt(e.target.value);
		if (value > props.data.min) {
			props.setData((prev) => ({ ...prev, max: value }));
		}
	};

	const handleMin = (e) => {
		const value = parseInt(e.target.value);
		if (value < props.data.max) {
			props.setData((prev) => ({ ...prev, min: value }));
		}
	};

	return (
		<div>
			<div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 relative mt-6">
				<div
					className="bg-indigo-300 h-1.5 rounded-full absolute"
					style={{
						left: `${(props.data.min / props.max) * 100}%`,
						right: `${100 - (props.data.max / props.max) * 100}%`,
						zIndex: 1,
					}}
				></div>
			</div>
			<div className="relative mb-6 top-[-7px]">
				<input
					onChange={handleMax}
					// onMouseUp={handleSlider}
					min={props.min}
					max={props.max}
					id="medium-range"
					type="range"
					step={props.step}
					value={props.data.max}
					className="absolute w-full h-2 bg-gray-200 bg-transparent rounded-lg appearance-none dark:bg-gray-700 pointer-events-none"
				></input>
				<input
					onChange={handleMin}
					// onMouseUp={handleSlider}
					min={props.min}
					max={props.max}
					id="medium-range"
					type="range"
					step={props.step}
					value={props.data.min}
					className={`absolute w-full h-2 bg-gray-200 bg-transparent rounded-lg appearance-none dark:bg-gray-700 pointer-events-none`}
				></input>
				<style>
					{`
					input[type=range]::-webkit-slider-runnable-track {
						z-index: 1;
					  }
                    input[type=range]::-webkit-slider-thumb {
                        pointer-events: auto;
						z-index: 50;
                    }
                    `}
				</style>
			</div>
		</div>
	);
}

export default RangeSlider;
