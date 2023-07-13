import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { HeaderPopOver, HeaderBottom } from 'components/Header';
import { Logo } from 'components/Logo';
import Button from 'components/Button';
import { Avatar, StatusIcon } from 'components/Profile';
import { HiOutlineHome, HiOutlineMegaphone } from 'react-icons/hi2';
import { BsChatRightDots, BsPersonCheck, BsPersonPlus } from 'react-icons/bs';
import classNames from 'classnames';
import PERMISSIONS from 'permissions/Permissions';
import { AdminPopover } from 'components/AdminPopover';

export const Header: FC = () => {
   const { user, isAllow } = useAuth();

   return (
      <header className="sticky top-0 shadow z-[999] border-t-4 border-t-secondary-400 dark:border-t-primary-700">
         <div className="bg-white dark:bg-night-900 border-b border-b-secondary-400 dark:border-b-primary-500">
            <div className="h-16 p-3 sm:max-w-7xl mx-auto flex flex-row items-center justify-between">
               <Logo />
               <div>
                  <div className="grid grid-flow-col auto-cols-auto items-center">
                     <div className="p-2 mx-1 bg-white dark:bg-night-800 border dark:border-gray-500 shadow rounded-full">
                        <HiOutlineMegaphone
                           className="text-gray-500 hover:text-secondary-400 dark:text-gray-400 dark:hover:text-primary-500"
                           size="20px"
                        />
                     </div>
                     <div className="p-2 mx-1 bg-white dark:bg-night-800 border dark:border-gray-500 shadow rounded-full">
                        <ThemeSwitcher />
                     </div>
                     {user && (
                        <>
                           <div className="p-2 mx-1 max-sm:ml-2 bg-white dark:bg-night-800 border dark:border-gray-500 shadow rounded-full">
                              <BsChatRightDots
                                 className="text-gray-500 hover:text-secondary-400 dark:text-gray-400 dark:hover:text-primary-500"
                                 size="20px"
                              />
                           </div>
                           {isAllow([PERMISSIONS.MOD, PERMISSIONS.COMA]) && (
                              <div className="mx-1">
                                 <AdminPopover />
                              </div>
                           )}
                           <div className="hidden sm:block mx-4">
                              <div className="flex items-center justify-center whitespace-nowrap">
                                 <div className="mr-4">
                                    <Avatar
                                       path={user.profile?.avatar}
                                       width="2.5rem"
                                       height="2.5rem"
                                    />
                                    <StatusIcon status="ONLINE" transitions="top-[38%]" />
                                 </div>
                                 <div>
                                    <span className="text-xs text-gray-600 dark:text-gray-300">
                                       {'Hoş geldin'}
                                    </span>
                                    <p className="text-xs text-gray-900 dark:text-gray-100 font-semibold">
                                       {user?.username}
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="ml-1">
                              <HeaderPopOver />
                           </div>
                        </>
                     )}
                     {!user && (
                        <>
                           <div className="max-sm:hidden mx-1">
                              <NavLink to="/login/">
                                 <Button color="purple">Giriş Yap</Button>
                              </NavLink>
                           </div>
                           <div className="max-sm:hidden ml-1">
                              <NavLink to="/register/">
                                 <Button>Kayıt Ol</Button>
                              </NavLink>
                           </div>
                           <div className="hidden max-sm:block fixed bottom-0 left-0 bg-gray-100 dark:bg-night-900 w-full shadow">
                              <div className="grid grid-cols-3">
                                 <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                       classNames(
                                          'flex flex-col items-center justify-center py-2 border-t border-white dark:border-gray-900',
                                          {
                                             'border-t-secondary-500 dark:border-t-primary-400':
                                                isActive,
                                          },
                                       )
                                    }
                                 >
                                    <HiOutlineHome
                                       className="text-secondary-500 dark:text-primary-400 mb-1"
                                       size="24px"
                                    />
                                    <span className="text-sm font-medium dark:text-gray-100">
                                       Anasayfa
                                    </span>
                                 </NavLink>
                                 <NavLink
                                    to="/login/"
                                    className={({ isActive }) =>
                                       classNames(
                                          'flex flex-col items-center justify-center py-2 border-t border-white dark:border-gray-900',
                                          {
                                             'border-t-secondary-500 dark:border-t-primary-400':
                                                isActive,
                                          },
                                       )
                                    }
                                 >
                                    <BsPersonCheck
                                       className="text-secondary-500 dark:text-primary-400 mb-1"
                                       size="24px"
                                    />
                                    <span className="text-sm font-medium dark:text-gray-100">
                                       Giriş Yap
                                    </span>
                                 </NavLink>
                                 <NavLink
                                    to="/register/"
                                    className={({ isActive }) =>
                                       classNames(
                                          'flex flex-col items-center justify-center py-2 border-t border-white dark:border-gray-900',
                                          {
                                             'border-t-secondary-500 dark:border-t-primary-400':
                                                isActive,
                                          },
                                       )
                                    }
                                 >
                                    <BsPersonPlus
                                       className="text-secondary-500 dark:text-primary-400 mb-1"
                                       size="24px"
                                    />
                                    <span className="text-sm font-medium dark:text-gray-100">
                                       Kayıt Ol
                                    </span>
                                 </NavLink>
                              </div>
                           </div>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <HeaderBottom />
      </header>
   );
};
