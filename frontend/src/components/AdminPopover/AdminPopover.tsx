import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { TbShieldLock } from 'react-icons/tb';
import { BsCardHeading } from 'react-icons/bs';
import { FaUserShield } from 'react-icons/fa';
import { useAuth } from 'hooks/useAuth';

export const AdminPopover = () => {
   const { user } = useAuth();

   return (
      <Popover className="relative">
         <Popover.Button className="group inline-flex p-2 items-center bg-white dark:bg-night-800 border border-secondary-500 dark:border-primary-500 shadow rounded-full focus:outline-none">
            <TbShieldLock
               className="text-gray-500 hover:text-secondary-400 dark:text-gray-400 dark:hover:text-primary-500"
               size="20px"
            />
         </Popover.Button>
         <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-x-3 sm:-translate-y-3 sm:translate-x-0"
            enterTo="opacity-100 translate-x-0 sm:translate-y-0 sm:translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0 sm:translate-y-0"
            leaveTo="opacity-0 translate-x-3 sm:-translate-y-3 sm:translate-x-0"
         >
            <Popover.Panel className="z-10 absolute w-screen -right-14 sm:right-0 mt-3 sm:w-[380px] sm:rounded-t shadow bg-white dark:bg-night-900 border border-gray-300 dark:border-gray-600 whitespace-nowrap">
               <div className="overflow-hidden">
                  <div className="relative flex flex-wrap h-full w-full m-0 float-none">
                     <div className="w-full border-b border-gray-300 h-10 leading-10 text-sm font-500 text-center px-4">
                        <div className="flex items-center justify-center space-x-3 text-gray-900 dark:text-gray-100">
                           <FaUserShield size="20px" />
                           <p>Admin Panel</p>
                        </div>
                     </div>
                     <div className="w-full text-sm">
                        <Popover.Button as={NavLink} to="/admin/ana-konu-basliklari">
                           <div className="p-3 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-200 dark:bg-night-800 dark:hover:bg-gray-900 dark:text-gray-100 dark:hover:text-primary-400">
                              <div>
                                 <BsCardHeading
                                    className="text-secondary-500 dark:text-primary-400"
                                    size="20px"
                                 />
                              </div>
                              <div>
                                 <span>Ana Konu Başlıkları</span>
                              </div>
                           </div>
                        </Popover.Button>
                     </div>
                     <div className="flex items-center w-full leading-4 p-2 space-x-2 border-t border-gray-300">
                        <div className="text-sm text-gray-400 dark:text-gray-400 italic font-semibold">
                           {user?.username}
                        </div>
                        {user?.auth_groups && (
                           <div className="mx-2 text-sm text-secondary-400 dark:text-primary-600 italic font-semibold">
                              [ {user?.auth_groups[0]} ]
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </Popover.Panel>
         </Transition>
      </Popover>
   );
};
