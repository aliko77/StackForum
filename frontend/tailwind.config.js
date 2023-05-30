/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {
         colors: {
            night: {
               100: '#383b50',
               200: '#323448',
               300: '#2b2e47',
            }
         },
         animation: {
            bounce200: 'bounce 1s infinite 200ms',
            bounce400: 'bounce 1s infinite 400ms',
         }
      }
   },
   plugins: []
}
