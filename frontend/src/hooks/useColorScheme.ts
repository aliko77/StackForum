import { useEffect, useState } from 'react';

export default function UseColorScheme() {
   const [colorScheme, setColorScheme] = useState<string>('light');

   useEffect(() => {
      const colorSchemeQ = window.matchMedia('(prefers-color-scheme: dark)');
      console.log(colorSchemeQ);

      const changeHandler = (event: MediaQueryListEvent | MediaQueryList) => {
         const newColorScheme = event.matches ? 'dark' : 'light';
         setColorScheme(newColorScheme);
      };

      colorSchemeQ.addEventListener('change', changeHandler as EventListener);

      changeHandler(colorSchemeQ);

      return () => {
         colorSchemeQ.removeEventListener('change', changeHandler as EventListener);
      };
   }, []);

   return {
      colorScheme,
   };
}
