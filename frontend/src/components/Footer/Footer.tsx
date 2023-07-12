import { Logo } from 'components/Logo';
import { COMPANY_NAME } from 'config';
import { FC } from 'react';

export const Footer: FC = () => {
   return (
      <footer className="bg-white dark:bg-night-900 border-t border-t-secondary-400 dark:border-t-primary-500">
         <div className="w-full p-4">
            <div className="inline-block sm:inline-flex items-center w-full">
               <Logo />
               <div className="ml-auto">
                  <div className="grid auto-cols-auto sm:grid-flow-col items-center text-sm">
                     <div className="p-2 text-gray-700 dark:text-gray-400/80 dark:hover:text-gray-300 rounded-sm hover:bg-gray-100 dark:hover:bg-night-600 dark:hover:bg-opacity-50">
                        <span>Gizlilik Sözleşmesi</span>
                     </div>
                     <div className="p-2 text-gray-700 dark:text-gray-400/80 dark:hover:text-gray-300 rounded-sm hover:bg-gray-100 dark:hover:bg-night-600 dark:hover:bg-opacity-50">
                        <span>İletişim</span>
                     </div>
                     <div className="p-2 text-gray-700 dark:text-gray-400/80 dark:hover:text-gray-300 rounded-sm hover:bg-gray-100 dark:hover:bg-night-600 dark:hover:bg-opacity-50">
                        <span>Kullanıcı Sözleşmesi</span>
                     </div>
                     <div className="p-2 text-gray-700 dark:text-gray-400/80 dark:hover:text-gray-300 rounded-sm hover:bg-gray-100 dark:hover:bg-night-600 dark:hover:bg-opacity-50">
                        <span>Forum Kuralları</span>
                     </div>
                  </div>
               </div>
            </div>
            <hr className="my-6 border-gray-300 dark:border-gray-600" />
            <span className="block text-sm font-500 text-gray-600 text-center dark:text-gray-400">
               © 2023 {COMPANY_NAME}™. Tüm hakları saklıdır.
            </span>
         </div>
      </footer>
   );
};
