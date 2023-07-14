import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
   HiOutlineChatBubbleBottomCenterText,
   HiOutlineCog,
   HiOutlineUserCircle,
} from 'react-icons/hi2';
import { RiQuestionnaireLine } from 'react-icons/ri';

export const HeaderBottom: FC = () => {
   return (
      <div className="bg-white dark:bg-night-900 p-3 flex flex-auto">
         <div className="container mx-auto">
            <div className="flex flex-auto flex-row space-x-3 px-4 items-center overflow-auto no-scrollbar">
               <NavLink to="/profil/">
                  <div className="flex items-center text-sm text-gray-800 dark:text-gray-300">
                     <HiOutlineUserCircle
                        className="text-secondary-500 dark:text-primary-500"
                        size="20px"
                     />
                     <span className="mx-1.5 font-500 hover:text-secondary-500 dark:hover:text-primary-500">
                        Profilim
                     </span>
                  </div>
               </NavLink>
               <NavLink to="/kontrol-paneli/">
                  <div className="flex items-center text-sm text-gray-800 dark:text-gray-300">
                     <HiOutlineCog
                        className="text-secondary-500 dark:text-primary-500"
                        size="20px"
                     />
                     <span className="mx-1.5 font-500 hover:text-secondary-500 dark:hover:text-primary-500">
                        Panelim
                     </span>
                  </div>
               </NavLink>
               <div>
                  <NavLink to={'/sorular'}>
                     <div className="flex items-center text-sm text-gray-800 dark:text-gray-300 font-500 hover:text-secondary-500 dark:hover:text-primary-500">
                        <RiQuestionnaireLine
                           className="text-secondary-500 dark:text-primary-500"
                           size="20px"
                        />
                        <span className="mx-1.5 font-500 hover:text-secondary-500 dark:hover:text-primary-500">
                           Sorular
                        </span>
                     </div>
                  </NavLink>
               </div>
               <div>
                  <NavLink to={'/etiketler'}>
                     <div className="flex items-center text-sm text-gray-800 dark:text-gray-300 font-500 hover:text-secondary-500 dark:hover:text-primary-500">
                        <HiOutlineChatBubbleBottomCenterText
                           className="text-secondary-500 dark:text-primary-500"
                           size="20px"
                        />
                        <span className="mx-1.5 font-500 hover:text-secondary-500 dark:hover:text-primary-500">
                           Konu Etiketleri
                        </span>
                     </div>
                  </NavLink>
               </div>
            </div>
         </div>
      </div>
   );
};
