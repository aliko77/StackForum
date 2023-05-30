import { FC } from 'react';
import { items } from './items';
import { SidebarItem } from './SidebarItem';

export const Sidebar: FC = () => {
   return (
      <div className="sidebar rounded-t table table-fixed md:float-left w-full md:w-[220px]">
         <div className="header h-12 leading-[3rem] bg-rose-500 dark:bg-indigo-500 rounded-t-sm">
            <h1 className="text-gray-100 font-semibold uppercase px-4">Kontrol Paneli</h1>
         </div>
         <div className="content">
            {items.map((item, index) => (
               <SidebarItem key={index} item={item} />
            ))}
         </div>
      </div>
   );
};
