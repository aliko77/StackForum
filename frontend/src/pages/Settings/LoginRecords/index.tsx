import { LoadSpinner } from 'components/LoadSpinner';
import useUser from 'hooks/useUser';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC, useEffect, useState } from 'react';
import { LoginRecordProps } from 'types';
import { parseDateTimeToString } from 'utils';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';

const LoginLogs: FC = () => {
   const { getLastLoginRecords } = useUser();
   const [records, setRecords] = useState<LoginRecordProps>([]);
   const [ready, setReady] = useState<boolean>(false);

   useEffect(() => {
      const fetchLoginRecords = async () => {
         const loginRecord = await getLastLoginRecords();
         setRecords(loginRecord);
         setReady(true);
      };
      fetchLoginRecords();
   }, []);

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Son Giriş Kaydı
               </p>
            </div>
            <div className="bg-gray-200 dark:bg-night-800">
               <div>
                  {!ready && (
                     <div className="pt-4">
                        <LoadSpinner />
                     </div>
                  )}
                  {records.map((record, index) => (
                     <div key={index} className="flex w-full">
                        <div className="border-r border-b border-gray-400 dark:border-gray-600 flex items-center px-3">
                           <HiOutlineComputerDesktop
                              className="text-gray-600 dark:text-gray-400"
                              size="24px"
                           />
                        </div>
                        <div className="w-full border-b border-gray-400 dark:border-gray-600 px-3 py-3">
                           <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                 {record.os} @ {record.ip_address}
                              </span>
                           </div>
                           <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                 {record.browser} - {parseDateTimeToString(record.login_time)}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default LoginLogs;
