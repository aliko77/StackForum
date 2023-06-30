import { useTheme } from 'hooks/useTheme';
import { FC } from 'react';
import { BsMoonStars, BsSun } from 'react-icons/bs';

export const ThemeSwitcher: FC = () => {
   const { setTheme } = useTheme();

   const handleLightTheme = () => {
      setTheme('light');
   };

   const handleDarkTheme = () => {
      setTheme('dark');
   };

   return (
      <>
         <button
            className="hidden dark:flex dark:text-gray-400 dark:hover:text-primary-500 focus:outline-none"
            onClick={handleLightTheme}
         >
            <BsMoonStars size="20px" />
         </button>
         <button
            className="dark:hidden flex text-gray-500 hover:text-secondary-500 focus:outline-none"
            onClick={handleDarkTheme}
         >
            <BsSun size="20px" />
         </button>
      </>
   );
};

