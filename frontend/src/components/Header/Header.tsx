import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { HeaderPopOver, HeaderBottom } from 'components/Header';
import { Logo } from 'components/Logo';
import Button from 'components/Button';
import { Avatar, StatusIcon } from 'components/Profile';
import { HiOutlineMegaphone } from 'react-icons/hi2';
import { BsChatRightDots } from 'react-icons/bs';

export const Header: FC = () => {
   const { user } = useAuth();

   return (
      <header className="sticky top-0 shadow z-[999] border-t-4 border-t-secondary-400 dark:border-t-primary-700">
         <div className="bg-white dark:bg-night-900 border-b border-b-secondary-400 dark:border-b-primary-500">
            <div className="h-16 p-3 sm:max-w-7xl mx-auto flex flex-row items-center justify-between">
               <Logo />
               <div>
                  <div className="flex justify-center items-center">
                     <div className="p-2 bg-white dark:bg-night-800 border dark:border-gray-500 shadow rounded-full">
                        <HiOutlineMegaphone
                           className="text-gray-500 hover:text-secondary-400 dark:text-gray-400 dark:hover:text-primary-500"
                           size="20px"
                        />
                     </div>
                     <div className="p-2 mx-3 bg-white dark:bg-night-800 border dark:border-gray-500 shadow rounded-full">
                        <ThemeSwitcher />
                     </div>
                     {user && (
                        <>
                           <div className="p-2 bg-white dark:bg-night-800 border dark:border-gray-500 shadow rounded-full">
                              <BsChatRightDots
                                 className="text-gray-500 hover:text-secondary-400 dark:text-gray-400 dark:hover:text-primary-500"
                                 size="20px"
                              />
                           </div>
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
                           <div className="ml-2">
                              <HeaderPopOver />
                           </div>
                        </>
                     )}
                     {!user && (
                        <>
                           <div className="mr-2">
                              <NavLink to="/login">
                                 <Button dark="secondary">Giriş Yap</Button>
                              </NavLink>
                           </div>
                           <div>
                              <NavLink to="/register">
                                 <Button color="primary">Kayıt Ol</Button>
                              </NavLink>
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
