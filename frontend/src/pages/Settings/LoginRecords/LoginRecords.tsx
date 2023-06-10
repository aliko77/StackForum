import { LoadSpinner } from 'components/LoadSpinner';
import useUser from 'hooks/useUser';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC, useEffect, useState } from 'react';
import { LoginRecordProps } from 'types';
import { parseDateTimeToString } from 'utils';

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
            <div className="title bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Son Giriş Kaydı
               </p>
            </div>
            <div className="content bg-gray-200 dark:bg-night-800">
               <div>
                  {!ready && (
                     <div>
                        <LoadSpinner />
                     </div>
                  )}
                  {records.map((record, index) => (
                     <div key={index} className="flex w-full">
                        <div className="border-r border-b border-gray-400 dark:border-gray-600 flex items-center px-3">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-gray-600 dark:text-gray-400"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                              />
                           </svg>
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
