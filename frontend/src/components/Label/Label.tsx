import { FC, LabelHTMLAttributes } from 'react';

interface ILabel extends LabelHTMLAttributes<HTMLLabelElement> {
   htmlFor: string;
}

export const Label: FC<ILabel> = ({ htmlFor, children, ...props }) => {
   return (
      <label
         htmlFor={htmlFor}
         className="text-sm font-medium text-gray-700 h-7 leading-7 dark:text-gray-100"
         {...props}
      >
         {children}
      </label>
   );
};
