/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
		"./src/Assets/image"
	],
	theme: {
		extend: {
			width: {
				'160': '40rem',
			}
		},
	},
	plugins: [require("flowbite/plugin")],
	darkMode: "class",
};
