import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

type ElementSize = 'small' | 'medium' | 'large';
type ElementColor =
   | 'primary'
   | 'secondary'
   | 'red'
   | 'orange'
   | 'yellow'
   | 'green'
   | 'cyan'
   | 'blue'
   | 'purple';

type ElementProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   size?: ElementSize;
   color?: ElementColor;
   onClick?: () => void;
};

const Button: FC<ElementProps> = ({
   children,
   size = 'small',
   color = 'secondary',
   onClick,
   ...props
}) => {
   const sizeClasses = {
      small: 'px-2 py-1.5',
      medium: 'px-4 py-2.5',
      large: 'px-6 py-3',
   };

   const colorClasses = (color: string) => {
      let bgColor, hoverBgColor, disabledBgColor, ringColor;

      switch (color) {
         case 'primary':
            bgColor = 'bg-primary-600';
            hoverBgColor = 'hover:bg-primary-700';
            disabledBgColor = 'disabled:bg-primary-700';
            ringColor = 'ring-primary-700';
            break;
         case 'secondary':
            bgColor = 'bg-secondary-600';
            hoverBgColor = 'hover:bg-secondary-700';
            disabledBgColor = 'disabled:bg-secondary-700';
            ringColor = 'ring-secondary-700';
            break;
         case 'red':
            bgColor = 'bg-red-600';
            hoverBgColor = 'hover:bg-red-700';
            disabledBgColor = 'disabled:bg-red-700';
            ringColor = 'ring-red-700';
            break;
         case 'orange':
            bgColor = 'bg-orange-600';
            hoverBgColor = 'hover:bg-orange-700';
            disabledBgColor = 'disabled:bg-orange-700';
            ringColor = 'ring-orange-700';
            break;
         case 'yellow':
            bgColor = 'bg-yellow-600';
            hoverBgColor = 'hover:bg-yellow-700';
            disabledBgColor = 'disabled:bg-yellow-700';
            ringColor = 'ring-yellow-700';
            break;
         case 'green':
            bgColor = 'bg-green-600';
            hoverBgColor = 'hover:bg-green-700';
            disabledBgColor = 'disabled:bg-green-700';
            ringColor = 'ring-green-700';
            break;
         case 'cyan':
            bgColor = 'bg-cyan-600';
            hoverBgColor = 'hover:bg-cyan-700';
            disabledBgColor = 'disabled:bg-cyan-700';
            ringColor = 'ring-cyan-700';
            break;
         case 'blue':
            bgColor = 'bg-blue-600';
            hoverBgColor = 'hover:bg-blue-700';
            disabledBgColor = 'disabled:bg-blue-700';
            ringColor = 'ring-blue-700';
            break;
         case 'purple':
            bgColor = 'bg-purple-600';
            hoverBgColor = 'hover:bg-purple-700';
            disabledBgColor = 'disabled:bg-purple-700';
            ringColor = 'ring-purple-700';
            break;
         default:
            bgColor = '';
            hoverBgColor = '';
            disabledBgColor = '';
            ringColor = '';
            break;
      }

      return `${bgColor} ${hoverBgColor} ${disabledBgColor} ${ringColor} text-gray-100`;
   };

   const commonClasses =
      'w-full flex items-center justify-center rounded-sm outline-none focus:ring-1 text-sm whitespace-nowrap uppercase';
   // Buttonun tüm sınıflarını birleştiren fonksiyon
   const buttonClasses = classNames(commonClasses, sizeClasses[size], colorClasses(color));

   return (
      <button className={buttonClasses} onClick={onClick} {...props}>
         {children}
      </button>
   );
};

export default Button;
