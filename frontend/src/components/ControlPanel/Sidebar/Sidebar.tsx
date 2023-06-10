import { FC } from 'react';
import { items } from './items';
import { SidebarItem } from './SidebarItem';

export const Sidebar: FC = () => {
   return (
      <div className="sidebar rounded-t table table-fixed md:float-left w-full md:w-[220px]">
         <div className="header h-12 leading-[3rem] rounded-t-sm bg-night-900 border-b border-b-gray-500">
            <h1 className="text-rose-400 dark:text-violet-500 font-semibold uppercase px-4">
               Kontrol Paneli
            </h1>
         </div>
         <div className="content">
            {items.map((item, index) => (
               <SidebarItem key={index} item={item} />
            ))}
         </div>
      </div>
   );
};
