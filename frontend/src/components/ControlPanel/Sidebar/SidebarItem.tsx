import { FC } from 'react';
import { ItemProps } from './items';
import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';

type Props = {
   item: ItemProps;
};

export const SidebarItem: FC<Props> = ({ item }) => {
   return (
      <Disclosure defaultOpen>
         <div className={`${item.name.toLowerCase()}`}>
            <Disclosure.Button className="w-full focus:outline-none">
               <div className="header bg-gray-100 dark:bg-night-200 px-4 py-2.5 flex justify-between items-center">
                  <span className="text-sm text-gray-900 dark:text-gray-100 uppercase font-medium">
                     {item.name}
                  </span>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-4 h-4 text-rose-500 dark:text-indigo-500"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                     />
                  </svg>
               </div>
            </Disclosure.Button>
            <Disclosure.Panel className="content w-full bg-gray-200 dark:bg-night-300" as="ul">
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
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-4 h-4 text-gray-900 dark:text-gray-100"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                           />
                        </svg>
                        <span className="text-sm font-medium text-gray-900 dark:text-indigo-400">
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
