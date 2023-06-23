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
         'bg-primary-500 hover:bg-primary-600 disabled:bg-primary-600 ring-primary-600 text-gray-100',
      rose: 'bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-600 ring-secondary-600 text-gray-100',
   };
   const darkColorClasses = {
      violet:
         'dark:bg-primary-500 dark:hover:bg-primary-600 dark:disabled:bg-primary-600 dark:ring-primary-600',
      rose: 'dark:bg-secondary-500 dark:hover:bg-secondary-600 dark:disabled:bg-secondary-600 dark:ring-secondary-600',
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
