import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { ThemeSwitcher } from 'components/ThemeSwitcher';
import { HeaderPopOver, HeaderBottom } from 'components/Header';
import { Logo } from 'components/Logo';
import { Button } from 'components/Button';
import { Avatar, StatusIcon } from 'components/Profile';

export const Header: FC = () => {
   const navigate: NavigateFunction = useNavigate();
   const { user } = useAuth();

   return (
      <>
         <header className="sticky top-0 shadow z-[999]">
            <div className="h-full p-2 bg-white dark:bg-night-900 border-t-4 border-t-rose-400 dark:border-t-violet-700 border-b border-b-rose-400 dark:border-b-violet-500">
               <div className="w-full md:max-w-6xl mx-auto flex justify-between items-center">
                  <div>
                     <Logo />
                  </div>
                  <div>
                     <div className="flex items-center my-auto">
                        <div className="p-1.5 mr-2 bg-white dark:bg-night-800 shadow rounded-full">
                           <div className="text-gray-500 hover:text-rose-400 dark:text-gray-400 dark:hover:text-violet-500">
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
                                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                                 />
                              </svg>
                           </div>
                        </div>
                        {user && (
                           <>
                              <div className="p-1.5 mx-2 bg-white dark:bg-night-800 shadow rounded-full">
                                 <ThemeSwitcher />
                              </div>
                              <div className="p-1.5 mx-2 bg-white dark:bg-night-800 shadow rounded-full">
                                 <div className="text-gray-500 hover:text-rose-400 dark:text-gray-400 dark:hover:text-violet-500">
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
                                          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                       />
                                    </svg>
                                 </div>
                              </div>
                              <div className="hidden sm:block mx-4">
                                 <div className="flex items-center justify-center whitespace-nowrap">
                                    <div className="mr-4">
                                       <Avatar
                                          path={user.profile?.avatar}
                                          width="2.5rem"
                                          height="2.5rem"
                                       />
                                       <StatusIcon status="ONLINE" transitions="top-[44%]" />
                                    </div>
                                    <div>
                                       <span className="text-xs text-gray-600 dark:text-gray-300">
                                          {'Hoş geldin'}
                                       </span>
                                       <p className="text-gray-900 dark:text-gray-100 font-semibold text-base">
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
                           <div className="flex items-center">
                              <div className="mx-2">
                                 <Button
                                    text="Giriş yap"
                                    dark="rose"
                                    onClick={(): void => {
                                       navigate('/login/');
                                    }}
                                 />
                              </div>
                              <div>
                                 <Button
                                    text="Kayıt ol"
                                    color="violet"
                                    onClick={(): void => {
                                       navigate('/register/');
                                    }}
                                 />
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
            <HeaderBottom />
         </header>
      </>
   );
};
