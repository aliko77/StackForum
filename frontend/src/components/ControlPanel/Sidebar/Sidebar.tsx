import { FC, useState } from 'react';
import { items } from './items';
import { SidebarItem } from './SidebarItem';

export const Sidebar: FC = () => {
   const [hidden, setHidden] = useState<boolean>(false);

   const toggleSidebar = () => {
      setHidden(!hidden);
   };

   return (
      <>
         <aside className="sidebar w-full sm:w-[240px]">
            <div className="flex items-center justify-between bg-night-900 rounded-t border-b px-4 border-b-gray-500">
               <div>
                  <h1 className="text-rose-400 dark:text-violet-500 font-semibold uppercase py-4">
                     Kontrol Paneli
                  </h1>
               </div>
               <button
                  className={`${
                     !hidden && 'sm:hidden'
                  } text-gray-400 border border-gray-400 rounded-full p-1`}
                  onClick={toggleSidebar}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className={`w-5 h-5 transition-transform duration-300 ${
                        hidden ? 'transform rotate-180' : ''
                     }`}
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                     />
                  </svg>
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
