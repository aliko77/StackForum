import { FC } from 'react';

export enum eColors {
   Error = 'text-secondary-600 dark:text-primary-400',
   Success = 'text-green-700 dark:text-green-500',
   None = '',
}

type AlertProps = {
   text: string;
   color?: eColors | null | undefined;
};

export const Alert: FC<AlertProps> = ({ text, color = eColors.Success }) => {
   return (
      <div
         className={`flex p-4 mb-4 text-center text-sm ${color} border border-gray-300 dark:border-night-700 rounded-lg bg-gray-100 dark:bg-gray-900`}
         role="alert"
      >
         <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fillRule="evenodd"
               d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
               clipRule="evenodd"
            ></path>
         </svg>
         <span className="sr-only">Info</span>
         <div className="mx-2">{text}</div>
      </div>
   );
};
