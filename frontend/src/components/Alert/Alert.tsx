import { FC } from 'react';

export enum eColors {
   Rose = 'text-rose-900 dark:text-rose-400',
   Indigo = 'text-indigo-700 dark:text-indigo-400',
   Green = 'text-green-700 dark:text-green-500',
   None = '',
}

interface IAlert {
   text: string;
   color?: eColors | null | undefined;
}

export const Alert: FC<IAlert> = ({ text, color = eColors.Green }) => {
   return (
      <div
         className={`flex p-4 mb-4 text-center text-sm ${color} rounded-lg bg-blue-100 dark:bg-gray-800`}
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
