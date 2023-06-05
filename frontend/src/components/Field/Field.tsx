import { ChangeEvent, FocusEvent, FC, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
   label?: string;
   errorMessage?: string;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export const Field: FC<InputProps> = ({ id, label, errorMessage, ...props }) => {
   return (
      <div>
         <label
            htmlFor={id}
            className={
               label
                  ? 'block text-sm font-medium text-gray-700 h-7 leading-7 dark:text-gray-100'
                  : 'sr-only'
            }
         >
            {label}
         </label>
         <input
            className="block w-full p-1.5 outline-none disabled:bg-gray-300 disabled:dark:bg-gray-800 bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 rounded-sm focus:ring-rose-500 focus:border-rose-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 placeholder:text-sm"
            {...props}
         />
         {errorMessage && (
            <p className="text-red-500 dark:text-red-400 text-sm ml-1">{errorMessage}</p>
         )}
      </div>
   );
};
