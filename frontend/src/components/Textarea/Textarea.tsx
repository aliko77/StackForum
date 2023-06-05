import { ChangeEvent, FocusEvent, FC, TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
   errorMessage?: string;
   onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
   onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
};

export const Textarea: FC<TextareaProps> = (props: TextareaProps) => {
   return (
      <>
         <textarea
            className="w-full bg-gray-100 dark:bg-night-300 rounded p-2 text-gray-900 dark:text-gray-100 outline-none border border-gray-100 dark:border-night-300 focus:border-gray-900 dark:focus:border-gray-900"
            {...props}
         />
         {props.errorMessage && (
            <p className="text-red-500 dark:text-red-400 text-sm ml-1">{props.errorMessage}</p>
         )}
      </>
   );
};
