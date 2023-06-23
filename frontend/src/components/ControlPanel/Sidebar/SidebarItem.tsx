import { FC } from 'react';
import { ItemProps } from './items';
import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import { HiArrowRight, HiChevronUp } from 'react-icons/hi2';

type Props = {
   item: ItemProps;
};

export const SidebarItem: FC<Props> = ({ item }) => {
   return (
      <Disclosure defaultOpen>
         <div className={`${item.name.toLowerCase()}`}>
            <Disclosure.Button className="w-full focus:outline-none">
               <div className="header bg-gray-100 dark:bg-night-900 px-4 py-2.5 flex justify-between items-center">
                  <span className="text-sm text-gray-900 dark:text-gray-100 uppercase font-medium">
                     {item.name}
                  </span>
                  <HiChevronUp className="text-secondary-500 dark:text-primary-400" size="16px" />
               </div>
            </Disclosure.Button>
            <Disclosure.Panel className="w-full bg-gray-200 dark:bg-night-800" as="ul">
               {item.sublinks?.map((item, index) => (
                  <li key={index} className="border-b border-gray-300 dark:border-gray-500">
                     <NavLink
                        to={item.link}
                        end
                        className={({ isActive }) =>
                           `px-4 py-2 flex items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-900
                           ${isActive && 'bg-gray-300 dark:bg-gray-900'}`
                        }
                     >
                        <HiArrowRight
                           className="text-secondary-500 dark:text-primary-400"
                           size="16px"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-primary-400">
                           {item.name}
                        </span>
                     </NavLink>
                  </li>
               ))}
            </Disclosure.Panel>
         </div>
      </Disclosure>
   );
};
