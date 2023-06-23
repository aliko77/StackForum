import { FC } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

type FormErrorProps = {
   errors: string[];
};

export const FormErrors: FC<FormErrorProps> = ({ errors }) => {
   return (
      <>
         {Object.values(errors).map((value, index) => {
            return (
               <div key={index}>
                  <div
                     className={`flex p-4 mb-2 text-center text-sm text-secondary-600 dark:text-primary-400 border border-gray-300 dark:border-night-700 rounded-lg bg-gray-100 dark:bg-gray-900`}
                     role="alert"
                  >
                     <HiOutlineInformationCircle size="1.5rem" />
                     <span className="sr-only">Info</span>
                     <div className="flex flex-col mx-2">
                        <div>
                           <span>{value}</span>
                        </div>
                     </div>
                  </div>
               </div>
            );
         })}
      </>
   );
};
