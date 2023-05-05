import { FC } from 'react';

interface IButtonProps {
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
   rose: 'bg-rose-500 hover:bg-rose-600 disabled:bg-rose-600',
};

const darkColorVariants: IcolorVariants = {
   rose: 'dark:bg-rose-500 dark:hover:bg-rose-600 dark:disabled:bg-rose-600',
   indigo: 'dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:disabled:bg-indigo-600',
};

const Button: FC<IButtonProps> = ({
   onClick,
   text,
   color = 'rose',
   dark = 'indigo',
   type = 'button',
   ...props
}) => {
   const buttonClass = `w-full ${colorVariants[color]} py-1.5 px-2 rounded-sm dark:text-gray-100 ${darkColorVariants[dark]}`;

   return (
      <button className={`${buttonClass}`} onClick={onClick} type={type} {...props}>
         <span className="text-white uppercase text-sm">{text}</span>
      </button>
   );
};

export default Button;
