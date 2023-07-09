import { FC } from 'react';
import { ItemProps } from './items';
import { NavLink } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import classNames from 'classnames';

type Props = {
   item: ItemProps;
};

export const SidebarItem: FC<Props> = ({ item }) => {
   return (
      <div>
         <div className="header bg-gray-100 dark:bg-night-800 px-4 py-2.5 flex justify-between items-center">
            <span className="text-sm text-gray-900 dark:text-gray-100 uppercase font-medium">
               {item.name}
            </span>
         </div>
         <ul className="w-full">
            {item.sublinks?.map((item, index) => (
               <li key={index}>
                  <NavLink
                     to={item.link}
                     end
                     className={({ isActive }) =>
                        classNames(
                           'px-4',
                           'py-2',
                           'flex',
                           'items-center',
                           'space-x-2',
                           'hover:bg-gray-300',
                           'dark:hover:bg-night-600',
                           'hover:shadow-lg',
                           {
                              'bg-gray-300': isActive,
                              'dark:bg-night-600': isActive,
                              'border-r-2 border-secondary-500 dark:border-primary-500': isActive,
                           },
                        )
                     }
                  >
                     <HiArrowRight
                        className="text-secondary-500 dark:text-primary-400"
                        size="16px"
                     />
                     <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                     </span>
                  </NavLink>
               </li>
            ))}
         </ul>
      </div>
   );
};
