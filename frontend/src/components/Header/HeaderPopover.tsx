import { Popover, Transition } from '@headlessui/react';
import Button from 'components/Button';
import { LogoutButton } from 'components/LogoutButton';
import { Avatar, StatusIcon } from 'components/Profile';
import { useAuth } from 'hooks/useAuth';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { parseDateTimeToString } from 'utils';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { TbClockPin, TbEdit, TbShieldCheck } from 'react-icons/tb';
import { MdOutlineCameraswitch } from 'react-icons/md';
import { PiSignatureDuotone } from 'react-icons/pi';

export const HeaderPopOver = () => {
   const { user } = useAuth();
   const lastlogin = user?.last_login ? parseDateTimeToString(user.last_login) : 'Bilinmiyor.';
   return (
      <Popover className="relative">
         <Popover.Button className="group inline-flex p-1.5 items-center bg-white dark:bg-night-800 shadow rounded-sm focus:outline-none text-zinc-500 hover:text-secondary-500 dark:text-zinc-400 dark:hover:text-primary-500">
            <div>
               <HiOutlineAdjustmentsHorizontal size="24px" />
            </div>
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
            <Popover.Panel className="z-10 absolute w-screen -right-3 sm:right-0 mt-3 sm:w-[380px] sm:rounded-t shadow bg-white dark:bg-night-900 border border-gray-300 dark:border-gray-600 whitespace-nowrap">
               <div className="overflow-hidden">
                  <div className="relative flex flex-row flex-wrap h-full w-full m-0 float-none">
                     <div className="flex items-center w-full leading-4 p-2">
                        <div className="mr-4">
                           <Avatar path={user?.profile?.avatar} width="4rem" height="4rem" />
                           <StatusIcon status="ONLINE" transitions="top-12" />
                        </div>
                        <div>
                           <div className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                              {user?.username}
                           </div>
                           <div className="text-xs flex items-center mt-1">
                              <div className="text-gray-500 dark:text-gray-100 mr-1">
                                 <TbClockPin size="16px" />
                              </div>
                              <span className="text-gray-700 dark:text-gray-100">
                                 Son giriş: {lastlogin}
                              </span>
                           </div>
                        </div>
                        <div className="absolute right-2">
                           <div className="bg-white border border-solid border-gray-300 dark:border-gray-600 dark:bg-night-800 p-2 rounded-sm shadow">
                              <LogoutButton />
                           </div>
                        </div>
                     </div>
                     <div className="w-full flex border-y border-gray-300 h-10 leading-10 text-sm">
                        <Popover.Button
                           as={NavLink}
                           to="/profil/"
                           className="w-1/2 text-center border-r font-semibold text-gray-900 hover:bg-gray-200 hover:text-secondary-500 dark:text-gray-100 dark:hover:text-primary-400 dark:hover:bg-gray-900"
                        >
                           Profilim
                        </Popover.Button>
                        <Popover.Button
                           as={NavLink}
                           to="/kontrol-paneli/"
                           className="w-1/2 text-center font-semibold text-gray-900 hover:bg-gray-200 hover:text-secondary-500 dark:text-gray-100 dark:hover:text-primary-400 dark:hover:bg-gray-900"
                        >
                           Panelim
                        </Popover.Button>
                     </div>
                     <div className="w-full text-sm">
                        <Popover.Button as={NavLink} to="/ayarlar/sifre/">
                           <div className="p-3 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-200 dark:bg-night-800 dark:hover:bg-gray-900 dark:text-gray-100 dark:hover:text-primary-400">
                              <div>
                                 <TbShieldCheck
                                    className="text-secondary-500 dark:text-primary-400"
                                    size="20px"
                                 />
                              </div>
                              <div>
                                 <span>E-posta veya Şifre Değiştir</span>
                              </div>
                           </div>
                        </Popover.Button>
                        <Popover.Button as={NavLink} to="/profil/duzenle/">
                           <div className="p-3 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-200 dark:bg-night-800 dark:hover:bg-gray-900 dark:text-gray-100 dark:hover:text-primary-400">
                              <div className="text-gray-900 dark:text-gray-400">
                                 <TbEdit
                                    className="text-secondary-500 dark:text-primary-400"
                                    size="20px"
                                 />
                              </div>
                              <div>
                                 <span>Profili Düzenle</span>
                              </div>
                           </div>
                        </Popover.Button>
                        <Popover.Button as={NavLink} to="/profil/avatar/">
                           <div className="p-3 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-200 dark:bg-night-800 dark:hover:bg-gray-900 dark:text-gray-100 dark:hover:text-primary-400">
                              <div className="text-gray-900 dark:text-gray-400">
                                 <MdOutlineCameraswitch
                                    className="text-secondary-500 dark:text-primary-400"
                                    size="20px"
                                 />
                              </div>
                              <div>
                                 <span>Profil Resmini Değiştir</span>
                              </div>
                           </div>
                        </Popover.Button>
                        <Popover.Button as={NavLink} to="/profil/imza/">
                           <div className="p-3 flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-200 dark:bg-night-800 dark:hover:bg-gray-900 dark:text-gray-100 dark:hover:text-primary-400">
                              <div className="text-gray-900 dark:text-gray-400">
                                 <PiSignatureDuotone
                                    className="text-secondary-500 dark:text-primary-400"
                                    size="20px"
                                 />
                              </div>
                              <div>
                                 <span>İmzanı Değiştir</span>
                              </div>
                           </div>
                        </Popover.Button>
                     </div>
                     <div className="w-full">
                        <div className="py-2 px-1 flex justify-evenly">
                           <div>
                              <Button>Abonelikler</Button>
                           </div>
                           <div>
                              <Popover.Button as={NavLink} to="/sosyal/arkadaslar/">
                                 <Button>Sosyal Ağ</Button>
                              </Popover.Button>
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
