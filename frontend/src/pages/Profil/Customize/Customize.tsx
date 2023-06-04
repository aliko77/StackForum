import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';

const Customize: FC = () => {
   return (
      <ControlPanelLayout>
         <div className="w-full mb-4">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Profilinizi Özelleştirin
               </p>
            </div>
            <div className="content px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-200">
               <fieldset id="private">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">
                        Profil Gizliliği
                     </p>
                  </legend>
                  <div className="content ml-4">
                     <p className="text-gray-900 dark:text-gray-100">#</p>
                  </div>
               </fieldset>
               <fieldset id="friend_requests">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">
                        Arkadaşlık İstekleri
                     </p>
                  </legend>
                  <div className="content ml-4">
                     <div className="mb-2">
                        <span className="text-gray-800 dark:text-gray-300 text-sm">
                           Size kimlerin arkadaşlık isteği gönderebileceğine karar verin.
                        </span>
                     </div>
                     <p className="text-gray-900 dark:text-gray-100">#</p>
                  </div>
               </fieldset>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Customize;
