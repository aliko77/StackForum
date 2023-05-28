import { FC, ReactNode } from 'react';

interface IButton {
   children?: ReactNode;
   onClick?: () => void;
   text: string;
   color?: string;
   dark?: string;
   type?: 'button' | 'submit' | 'reset';
   disabled?: boolean;
}

interface IcolorVariants {
   [key: string]: string;
}

const colorVariants: IcolorVariants = {
   rose: 'bg-rose-500 focus:ring-rose-600 hover:bg-rose-600 disabled:bg-rose-600',
   indigo: 'bg-indigo-500 focus:ring-indigo-600 hover:bg-indigo-600 disabled:bg-indigo-600',
};

const darkColorVariants: IcolorVariants = {
   rose: 'dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-600 dark:disabled:bg-rose-600',
   indigo:
      'dark:bg-indigo-500 dark:focus:ring-indigo-600 dark:hover:bg-indigo-600 dark:disabled:bg-indigo-600',
};

export const Button: FC<IButton> = ({
   children,
   onClick,
   text,
   color = 'rose',
   dark = 'indigo',
   type = 'button',
   ...props
}) => {
   const buttonClass = `w-full ${colorVariants[color]} focus:outline-none focus:ring py-1.5 px-2 rounded-sm dark:text-gray-100 ${darkColorVariants[dark]}`;

   return (
      <button className={`${buttonClass}`} onClick={onClick} type={type} {...props}>
         <span className="text-white uppercase text-sm whitespace-nowrap">{text}</span>
         {children}
      </button>
   );
};
