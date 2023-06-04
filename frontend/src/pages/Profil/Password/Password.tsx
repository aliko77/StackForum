import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';

const Password: FC = () => {
   return (
      <ControlPanelLayout>
         <div className="w-full mb-4">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">Email & Şifre</p>
            </div>
            <div className="content px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-200">
               <fieldset id="change_password">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">
                        Şifre Değişikliği
                     </p>
                  </legend>
                  <div className="content ml-4">
                     <p className="text-gray-900 dark:text-gray-100">#</p>
                  </div>
               </fieldset>
               <fieldset id="change_email">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">
                        Email Değişikliği
                     </p>
                  </legend>
                  <div className="content ml-4">
                     <p className="text-gray-900 dark:text-gray-100">#</p>
                  </div>
               </fieldset>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Password;
