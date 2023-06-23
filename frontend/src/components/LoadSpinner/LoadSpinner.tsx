import { FC } from 'react';
import { ImSpinner9 } from 'react-icons/im';

export const LoadSpinner: FC = () => {
   return (
      <div role="status" className="flex justify-center items-center mb-4">
         <ImSpinner9
            className="inline text-gray-200 animate-spin dark:text-gray-600 fill-secondary-500 dark:fill-primary-600"
            size="32px"
         />
         <span className="sr-only">Yükleniyor...</span>
      </div>
   );
};
