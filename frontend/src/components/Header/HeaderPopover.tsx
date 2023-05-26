import { Popover, Transition } from '@headlessui/react';
import { LogoutButton } from 'components/LogoutButton';
import { useAuth } from 'hooks/useAuth';
import { Fragment } from 'react';
import { parseDateTimeToString } from 'utils';

export const HeaderPopOver = () => {
   const { user } = useAuth();
   const lastlogin = user?.last_login ? parseDateTimeToString(user.last_login) : 'Bilinmiyor.';
   return (
      <Popover className="relative">
         <Popover.Button className="group inline-flex p-1.5 items-center bg-white dark:bg-night-100 shadow rounded focus:outline-none">
            <div className="text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-indigo-500">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
               </svg>
            </div>
         </Popover.Button>
         <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 0 translate-x-4 sm:-translate-y-3 sm:translate-x-0"
            enterTo="opacity-100 translate-x-0 sm:translate-y-0 sm:translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0 sm:translate-y-0"
            leaveTo="opacity-0 translate-x-4 sm:-translate-y-3 sm:translate-x-0"
         >
            <Popover.Panel className="z-10 absolute w-screen -right-4 mt-3 sm:w-[380px] sm:rounded shadow bg-white dark:bg-night-200 border border-gray-300 dark:border-gray-600 whitespace-nowrap">
               <div className="overflow-hidden">
                  <div className="relative flex flex-row flex-wrap h-full w-full m-0 float-none">
                     <div className="flex items-center w-full leading-4 p-2">
                        <div className="mr-4">
                           <img
                              className="w-16 h-16 border-solid border-2 border-white rounded-full"
                              src="src/assets/images/profile_pictures/53571.jpg"
                              alt="profile picture"
                           />
                        </div>
                        <div>
                           <div className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                              <span>{user?.first_name + ' ' + user?.last_name}</span>
                           </div>
                           <div className="text-xs flex space-x-1 items-center mt-1">
                              <div className="text-gray-500 dark:text-gray-100">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                 </svg>
                              </div>
                              <span className="text-gray-500 dark:text-gray-100">
                                 Son giriş: {lastlogin}
                              </span>
                           </div>
                        </div>
                        <div className="absolute right-2">
                           <div className="bg-white border border-solid border-gray-300 dark:border-gray-600 dark:bg-night-100 p-2 rounded shadow">
                              <LogoutButton />
                           </div>
                        </div>
                     </div>
                     <div className="w-full self-end border-t h-9 leading-9">
                        <span className="w-1/2 text-center text-gray-900 dark:text-gray-100 float-left border-r">
                           Profil
                        </span>
                        <span className="w-1/2 text-center text-gray-900 dark:text-gray-100 float-left">
                           Ayarlar
                        </span>
                     </div>
                  </div>
               </div>
            </Popover.Panel>
         </Transition>
      </Popover>
   );
};
