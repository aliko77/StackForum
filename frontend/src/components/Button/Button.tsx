import { FC, ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
   text: string;
   dark?: string;
}

interface IcolorVariants {
   [key: string]: string;
}

const colorVariants: IcolorVariants = {
   rose: 'bg-rose-500 focus:ring-rose-600 hover:bg-rose-600 disabled:bg-rose-600',
   indigo: 'bg-indigo-500 focus:ring-indigo-600 hover:bg-indigo-600 disabled:bg-indigo-600',
};

const darkColorVariants: IcolorVariants = {
   rose: 'dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-500 dark:disabled:bg-rose-600',
   indigo:
      'dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-500 dark:disabled:bg-indigo-600',
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
   const buttonClass = `w-full ${colorVariants[color]} focus:outline-none focus:ring-1 py-1.5 px-2 rounded-sm dark:text-gray-100 ${darkColorVariants[dark]}`;

   return (
      <button className={`${buttonClass}`} onClick={onClick} type={type} {...props}>
         <span className="text-gray-100 uppercase text-sm whitespace-nowrap">{text}</span>
         {children}
      </button>
   );
};
