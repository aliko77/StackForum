import useUser from 'hooks/useUser';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';

const LoginLogs: FC = () => {
   const { getLastLoginRecords } = useUser();
   const records = getLastLoginRecords();
   console.log(records);

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Son Giriş Kayıtları
               </p>
            </div>
            <div className="content px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-200"></div>
         </div>
      </ControlPanelLayout>
   );
};
export default LoginLogs;
