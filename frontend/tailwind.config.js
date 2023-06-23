import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {
         colors: {
            primary: colors.violet,
            secondary: colors.rose,
            night: {
               900: '#272838',
               800: '#36384D',
               700: '#3A3C54',
               600: '#41445E',
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
