import { FC, useState } from 'react';
import { items } from './items';
import { SidebarItem } from './SidebarItem';
import classNames from 'classnames';
import { HiArrowUp } from 'react-icons/hi2';

export const Sidebar: FC = () => {
   const [hidden, setHidden] = useState<boolean>(false);

   const toggleSidebar = () => {
      setHidden(!hidden);
   };

   return (
      <>
         <aside className="sidebar w-full sm:w-[240px]">
            <div className="p-3 flex justify-between items-center  bg-gray-200 dark:bg-night-900 rounded-t border-b border-b-gray-500">
               <h1 className="text-secondary-500 dark:text-primary-400 font-500 uppercase">
                  Kontrol Paneli
               </h1>
               <button
                  className={classNames(
                     {
                        'sm:hidden': !hidden,
                     },
                     'border border-secondary-400 dark:border-primary-400 rounded-full p-0.5',
                  )}
                  onClick={toggleSidebar}
               >
                  <HiArrowUp className="text-secondary-400 dark:text-primary-500" size="14px" />
               </button>
            </div>
            <div hidden={hidden}>
               {items.map((item, index) => (
                  <SidebarItem key={index} item={item} />
               ))}
            </div>
         </aside>
      </>
   );
};
