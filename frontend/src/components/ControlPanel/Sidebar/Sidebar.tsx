import { FC, useState } from 'react';
import { items } from './items';
import { SidebarItem } from './SidebarItem';
import classNames from 'classnames';
import { GoSidebarCollapse } from 'react-icons/go';

export const Sidebar: FC = () => {
   const [hidden, setHidden] = useState<boolean>(false);

   const toggleSidebar = () => {
      setHidden(!hidden);
   };

   return (
      <>
         <button
            className={'sm:hidden relative z-[999] -mx-4 mb-6 p-3 rounded-r-full bg-night-900'}
            onClick={toggleSidebar}
         >
            <GoSidebarCollapse
               className="text-secondary-400 dark:text-primary-500 bg-night-800"
               size="24px"
            />
         </button>
         <aside
            className={classNames(
               'max-sm:absolute',
               'max-sm:-mt-4',
               { 'max-sm:-left-full': hidden },
               { 'max-sm:left-4': !hidden },
               { 'max-sm:-ml-4': !hidden },
               'max-sm:transition-all',
               'w-full',
               'sm:w-[240px]',
               'border-r',
               'dark:border-gray-500',
               'dark:bg-night-700',
            )}
         >
            <div className="p-3 flex justify-between items-center">
               <h1 className="text-secondary-500 dark:text-primary-400 font-500 uppercase">
                  Kontrol Paneli
               </h1>
            </div>
            <div>
               {items.map((item, index) => (
                  <SidebarItem key={index} item={item} />
               ))}
            </div>
         </aside>
      </>
   );
};
