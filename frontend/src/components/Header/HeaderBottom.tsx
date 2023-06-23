import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
   HiOutlineArrowTrendingUp,
   HiOutlineChatBubbleBottomCenterText,
   HiOutlineCog,
   HiOutlineNewspaper,
   HiOutlineUserCircle,
} from 'react-icons/hi2';

export const HeaderBottom: FC = () => {
   return (
      <div className="bg-white dark:bg-night-900 p-1 sm:p-3 flex flex-auto">
         <div className="container mx-auto max-sm:px-4">
            <div className="flex flex-auto flex-row space-x-3 px-4 items-center overflow-auto no-scrollbar">
               <NavLink to="/profil">
                  <div className="flex items-center text-sm text-gray-800 dark:text-gray-300">
                     <HiOutlineUserCircle
                        className="text-secondary-500 dark:text-primary-500"
                        size="20px"
                     />
                     <span className="mx-1.5 hover:text-secondary-600 dark:hover:text-primary-500">
                        Profilim
                     </span>
                  </div>
               </NavLink>
               <NavLink to="/kontrol-paneli">
                  <div className="flex items-center text-sm text-gray-800 dark:text-gray-300">
                     <HiOutlineCog
                        className="text-secondary-500 dark:text-primary-500"
                        size="20px"
                     />
                     <span className="mx-1.5 hover:text-secondary-600 dark:hover:text-primary-500">
                        Panelim
                     </span>
                  </div>
               </NavLink>
               <div>
                  <div className="flex items-center text-sm text-gray-800 dark:text-gray-300">
                     <HiOutlineArrowTrendingUp
                        className="text-secondary-500 dark:text-primary-500"
                        size="20px"
                     />
                     <span className="mx-1.5 hover:text-secondary-600 dark:hover:text-primary-500">
                        Popüler Konular
                     </span>
                  </div>
               </div>
               <div>
                  <div className="flex items-center text-sm text-gray-800 dark:text-gray-300 hover:text-secondary-600 dark:hover:text-primary-500">
                     <HiOutlineNewspaper
                        className="text-secondary-500 dark:text-primary-500"
                        size="20px"
                     />
                     <span className="mx-1.5 hover:text-secondary-600 dark:hover:text-primary-500">
                        Yeni Konular
                     </span>
                  </div>
               </div>
               <div>
                  <div className="flex items-center text-sm text-gray-800 dark:text-gray-300 hover:text-secondary-600 dark:hover:text-primary-500">
                     <HiOutlineChatBubbleBottomCenterText
                        className="text-secondary-500 dark:text-primary-500"
                        size="20px"
                     />
                     <span className="mx-1.5 hover:text-secondary-600 dark:hover:text-primary-500">
                        Yeni Mesajlar
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
