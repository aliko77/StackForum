/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx,css}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                night: '#383b50',
                "night-e": '#323448',
            },
        },
    },
    plugins: [],
}

