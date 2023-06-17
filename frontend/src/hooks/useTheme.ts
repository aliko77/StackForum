import { useEffect, useState } from 'react';

export default function useTheme() {
   const [theme, setTheme] = useState<string>('light');

   useEffect(() => {
      const colorSchemeQ = window.matchMedia('(prefers-color-scheme: dark)');
      console.log(colorSchemeQ);

      const changeHandler = (event: MediaQueryListEvent) => {
         const newColorScheme = event.matches ? 'dark' : 'light';
         setTheme(newColorScheme);
      };

      colorSchemeQ.addEventListener('change', changeHandler);
   }, []);

   return {
      theme,
   };
}
