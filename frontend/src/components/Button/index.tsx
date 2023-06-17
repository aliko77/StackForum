import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

type ElementSize = 'small' | 'medium' | 'large';
type ElementColor = 'violet' | 'rose';

type ElementProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   size?: ElementSize;
   color?: ElementColor;
   dark?: ElementColor;
   onClick?: () => void;
};

const Button: FC<ElementProps> = ({
   children,
   size = 'small',
   color = 'rose',
   dark = 'violet',
   onClick,
   ...props
}) => {
   const sizeClasses = {
      small: 'px-2 py-1.5',
      medium: 'px-4 py-2.5',
      large: 'px-6 py-3',
   };

   const colorClasses = {
      violet:
         'bg-violet-500 hover:bg-violet-600 disabled:bg-violet-600 ring-violet-600 text-gray-100',
      rose: 'bg-rose-500 hover:bg-rose-600 disabled:bg-rose-600 ring-rose-600 text-gray-100',
   };
   const darkColorClasses = {
      violet:
         'dark:bg-violet-500 dark:hover:bg-violet-600 dark:disabled:bg-violet-600 dark:ring-violet-600',
      rose: 'dark:bg-rose-500 dark:hover:bg-rose-600 dark:disabled:bg-rose-600 dark:ring-rose-600',
   };

   const commonClasses =
      'w-full flex items-center justify-center rounded-sm outline-none focus:ring-1 text-sm whitespace-nowrap uppercase';

   // Buttonun tüm sınıflarını birleştiren fonksiyon
   const buttonClasses = classNames(
      commonClasses,
      sizeClasses[size],
      colorClasses[color],
      darkColorClasses[dark],
   );

   return (
      <button className={buttonClasses} onClick={onClick} {...props}>
         {children}
      </button>
   );
};

export default Button;
