import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

type ElementSize = 'small' | 'medium' | 'large';
type ElementColor =
   | 'primary'
   | 'secondary'
   | 'state'
   | 'gray'
   | 'zinc'
   | 'neutral'
   | 'stone'
   | 'red'
   | 'orange'
   | 'amber'
   | 'yellow'
   | 'lime'
   | 'green'
   | 'emerald'
   | 'teal'
   | 'cyan'
   | 'sky'
   | 'blue'
   | 'indigo'
   | 'violet'
   | 'purple'
   | 'fuchsia'
   | 'pink';

type ElementProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   size?: ElementSize;
   color?: ElementColor;
   dark?: ElementColor;
   onClick?: () => void;
};

const Button: FC<ElementProps> = ({
   children,
   size = 'small',
   color = 'secondary',
   dark = 'primary',
   onClick,
   ...props
}) => {
   const sizeClasses = {
      small: 'px-2 py-1.5',
      medium: 'px-4 py-2.5',
      large: 'px-6 py-3',
   };

   const colorClasses = (color: ElementColor) =>
      `bg-${color}-600 hover:bg-${color}-700 disabled:bg-${color}-700 ring-${color}-700 text-gray-100`;
   const darkColorClasses = (dark: ElementColor) =>
      `dark:bg-${dark}-600 dark:hover:bg-${dark}-700 dark:disabled:bg-${dark}-700 dark:ring-${dark}-700`;

   const commonClasses =
      'w-full flex items-center justify-center rounded-sm outline-none focus:ring-1 text-sm whitespace-nowrap uppercase';
   // Buttonun tüm sınıflarını birleştiren fonksiyon
   const buttonClasses = classNames(
      commonClasses,
      sizeClasses[size],
      colorClasses(color),
      darkColorClasses(dark),
   );

   return (
      <button className={buttonClasses} onClick={onClick} {...props}>
         {children}
      </button>
   );
};

export default Button;
