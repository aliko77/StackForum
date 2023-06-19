import { useState, useEffect } from 'react';
import UseColorScheme from 'hooks/useColorScheme';

export default function useTheme() {
   const allowedThemes = ['default', 'dark', 'light'];
   const [theme, setTheme] = useState<string>('default');
   const { colorScheme } = UseColorScheme();

   const changeTheme = (selectedTheme: string) => {
      setTheme((currentTheme) => {
         if (allowedThemes.includes(selectedTheme)) {
            return selectedTheme;
         }
         return currentTheme;
      });
   };

   useEffect(() => {
      if (theme === 'default') {
         document.body.className = colorScheme;
      } else {
         document.body.className = theme;
      }
   }, [theme, colorScheme]);

   return {
      theme,
      changeTheme,
      setTheme,
   };
}
