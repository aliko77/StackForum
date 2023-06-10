import { FC, ButtonHTMLAttributes } from 'react';
import { KeyValue } from 'types';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   text: string;
   dark?: string;
};

const colorVariants: KeyValue = {
   rose: 'bg-rose-500 focus:ring-rose-600 hover:bg-rose-600 disabled:bg-rose-600',
   violet: 'bg-violet-500 focus:ring-violet-600 hover:bg-violet-600 disabled:bg-violet-600',
};

const darkColorVariants: KeyValue = {
   rose: 'dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-500 dark:disabled:bg-rose-600',
   violet:
      'dark:bg-violet-500 dark:hover:bg-violet-600 dark:focus:ring-violet-500 dark:disabled:bg-violet-600',
};

export const Button: FC<ButtonProps> = ({
   children,
   onClick,
   text,
   color = 'rose',
   dark = 'violet',
   type = 'button',
   ...props
}) => {
   const buttonClass = `w-full flex justify-center items-center ${colorVariants[color]} focus:outline-none focus:ring-1 py-1.5 px-2 rounded-sm text-gray-100 ${darkColorVariants[dark]}`;

   return (
      <button className={`${buttonClass}`} onClick={onClick} type={type} {...props}>
         <span className="text-gray-100 uppercase text-sm whitespace-nowrap">{text}</span>
         {children}
      </button>
   );
};
