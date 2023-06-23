import { Logo } from 'components/Logo';
import { FC } from 'react';

export const Footer: FC = () => {
   return (
      <footer className="bg-white dark:bg-night-900 border-t border-t-secondary-400 dark:border-t-primary-500">
         <div className="w-full p-4">
            <div className="inline-block">
               <Logo />
            </div>
            <hr className="my-6 border-gray-300 dark:border-gray-600" />
            <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
               © 2023 StackForum™. Tüm hakları saklıdır.
            </span>
         </div>
      </footer>
   );
};
