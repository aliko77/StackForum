/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {
         outlineColor: {
            white12: 'rgba(255, 255, 255, 0.12)',
         },
         colors: {
            night: {
               900: '#333452',
               800: '#444466',
               700: '#4D4D73',
               600: '#7878B3',
               500: '#6D6DA3',
               400: '#7676B0',
               300: '#7E7EBD',
               200: '#8787C9',
               100: '#9090D6',
            },
         },
         animation: {
            bounce200: 'bounce 1s infinite 200ms',
            bounce400: 'bounce 1s infinite 400ms',
         },
      },
   },
   plugins: [],
};
