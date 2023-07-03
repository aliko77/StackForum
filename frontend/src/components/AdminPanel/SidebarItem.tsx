import { FC } from 'react';
import { ItemProps } from './items';
import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import { HiArrowRight, HiChevronUp } from 'react-icons/hi2';
import classNames from 'classnames';
import { useAuth } from 'hooks/useAuth';

type Props = {
   item: ItemProps;
};

export const SidebarItem: FC<Props> = ({ item }) => {
   const { isAllow } = useAuth();
   return (
      <Disclosure defaultOpen>
         <div>
            <Disclosure.Button className="w-full focus:outline-none">
               <div className="header bg-gray-100 dark:bg-night-900 px-4 py-2.5 flex justify-between items-center">
                  <span className="text-sm text-gray-900 dark:text-gray-100 uppercase font-medium">
                     {item.name}
                  </span>
                  <HiChevronUp className="text-secondary-500 dark:text-primary-400" size="16px" />
               </div>
            </Disclosure.Button>
            <Disclosure.Panel className="w-full bg-gray-200 dark:bg-night-800" as="ul">
               {item.sublinks?.map(
                  (item, index) =>
                     isAllow(item.permissions) && (
                        <li key={index} className="border-b border-gray-300 dark:border-gray-500">
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
                                    'dark:hover:bg-gray-900',
                                    {
                                       'bg-gray-300': isActive,
                                       'dark:bg-gray-900': isActive,
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
                     ),
               )}
            </Disclosure.Panel>
         </div>
      </Disclosure>
   );
};
