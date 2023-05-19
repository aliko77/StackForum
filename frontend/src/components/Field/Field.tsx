import { ChangeEvent, FC, FocusEvent } from 'react';

interface IInput {
   id: string;
   type: string;
   name: string;
   placeholder: string;
   required?: boolean;
   value?: string;
   autoComplete?: string;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Field: FC<IInput> = ({
   id,
   type,
   name,
   placeholder,
   required = true,
   autoComplete = 'off',
   ...props
}) => {
   return (
      <>
         <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            className="block w-full p-2 outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-rose-500 focus:border-rose-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder:text-sm"
            {...props}
         />
      </>
   );
};
