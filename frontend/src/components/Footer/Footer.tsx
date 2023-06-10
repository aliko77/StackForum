import { Logo } from 'components/Logo';
import { FC } from 'react';

export const Footer: FC = () => {
   return (
      <footer className="bg-white dark:bg-night-900 border-t border-t-violet-500">
         <div className="w-full p-4">
            <div>
               <Logo />
            </div>
            <hr className="my-6 border-gray-200 dark:border-gray-400" />
            <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
               © 2023 StackForum™. Tüm hakları saklıdır.
            </span>
         </div>
      </footer>
   );
};
