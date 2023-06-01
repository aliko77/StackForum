import { Popover, Transition } from '@headlessui/react';
import { Button } from 'components/Button';
import { LogoutButton } from 'components/LogoutButton';
import { Avatar, StatusIcon } from 'components/Profile';
import { useAuth } from 'hooks/useAuth';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
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
                  strokeWidth={1.5}
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
            enterFrom="opacity-0 translate-x-3 sm:-translate-y-4 sm:translate-x-0"
            enterTo="opacity-100 translate-x-0 sm:translate-y-0 sm:translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0 sm:translate-y-0"
            leaveTo="opacity-0 translate-x-3 sm:-translate-y-4 sm:translate-x-0"
         >
            <Popover.Panel className="z-10 absolute w-screen -right-4 mt-3 sm:mt-4 sm:w-[380px] sm:rounded-t shadow bg-white dark:bg-night-200 border border-gray-300 dark:border-gray-600 whitespace-nowrap">
               <div className="overflow-hidden">
                  <div className="relative flex flex-row flex-wrap h-full w-full m-0 float-none">
                     <div className="flex items-center w-full leading-4 p-2">
                        <div className="mr-4">
                           <Avatar path="53571.jpg" width="4rem" height="4rem" />
                           <StatusIcon status="ONLINE" transitions="top-12" />
                        </div>
                        <div>
                           <div className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                              <span>{user?.username}</span>
                           </div>
                           <div className="text-xs flex space-x-1 items-center mt-1">
                              <div className="text-gray-500 dark:text-gray-100">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
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
                     <div className="w-full flex border-y border-gray-300 h-10 leading-10">
                        <NavLink
                           to="/profil/"
                           className="w-1/2 text-center border-r font-semibold float-left text-gray-900 hover:bg-gray-100 hover:text-rose-500 dark:text-gray-100 dark:hover:text-indigo-400 dark:hover:bg-gray-800"
                        >
                           Profilim
                        </NavLink>
                        <NavLink
                           to="/kontrol-paneli/"
                           className="w-1/2 text-center font-semibold float-left text-gray-900 hover:bg-gray-100 hover:text-rose-500 dark:text-gray-100 dark:hover:text-indigo-400 dark:hover:bg-gray-800"
                        >
                           Panelim
                        </NavLink>
                     </div>
                     <div className="w-full bg-white dark:bg-night-100 text-gray-900 dark:text-gray-200 text-sm">
                        <div className="p-3 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600">
                           <div className="text-gray-900 dark:text-gray-400">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-5"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                 />
                              </svg>
                           </div>
                           <div>
                              <span> E-posta veya Şifre Değiştir</span>
                           </div>
                        </div>
                        <div className="p-3 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600">
                           <div className="text-gray-900 dark:text-gray-400">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-5"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                                 />
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                                 />
                              </svg>
                           </div>
                           <div>
                              <span>Profil Resmini Değiştir</span>
                           </div>
                        </div>
                        <div className="p-3 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600">
                           <div className="text-gray-900 dark:text-gray-400">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-4"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                 />
                              </svg>
                           </div>
                           <div>
                              <span>İmzanı Değiştir</span>
                           </div>
                        </div>
                     </div>
                     <div className="w-full">
                        <div className="py-2 px-1 flex justify-evenly">
                           <div>
                              <Button text="Abonelikler" />
                           </div>
                           <div>
                              <Button text="Davetiyeler" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Popover.Panel>
         </Transition>
      </Popover>
   );
};
