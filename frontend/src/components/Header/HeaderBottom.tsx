import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const HeaderBottom: FC = () => {
   return (
      <div className="bg-white dark:bg-night-900 p-1 sm:p-3 flex flex-auto">
         <div className="container mx-auto max-sm:px-4">
            <div className="flex flex-auto flex-row space-x-3 items-center overflow-auto no-scrollbar">
               <NavLink to="/profil">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-violet-500">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-rose-500 dark:text-violet-500"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                     </svg>
                     <span className="ml-1.5">Profilim</span>
                  </div>
               </NavLink>
               <NavLink to="/kontrol-paneli">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-violet-500">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-rose-500 dark:text-violet-500"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                        />
                     </svg>
                     <span className="ml-1.5">Panelim</span>
                  </div>
               </NavLink>
               <div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-violet-500">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-rose-500 dark:text-violet-500"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                     </svg>
                     <span className="ml-1.5">Popüler Konular</span>
                  </div>
               </div>
               <div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-violet-500">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-rose-500 dark:text-violet-500"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                        />
                     </svg>
                     <span className="ml-1.5">Yeni Konular</span>
                  </div>
               </div>
               <div>
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-violet-500">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-rose-500 dark:text-violet-500"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                     </svg>
                     <span className="ml-1.5">Yeni Mesajlar</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
