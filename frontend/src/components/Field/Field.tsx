import { ChangeEvent, FocusEvent, FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   label?: string;
   errorMessage?: string;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Field: FC<InputProps> = ({
   id,
   label,
   type = 'text',
   errorMessage,
   onChange,
   onBlur,
   ...props
}) => {
   return (
      <div className="mb-4">
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
            type={type}
            id={id}
            className="block w-full p-1.5 outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-rose-500 focus:border-rose-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder:text-sm"
            onChange={onChange}
            onBlur={onBlur}
            {...props}
         />
         {errorMessage && (
            <p className="text-red-500 dark:text-red-400 text-sm ml-1">{errorMessage}</p>
         )}
      </div>
   );
};
