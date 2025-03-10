import classNames from 'classnames';
import { FC } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

export enum eColors {
   Error = 'text-secondary-600 dark:text-primary-400',
   Success = 'text-green-700 dark:text-green-500',
   None = '',
}

type AlertProps = {
   text: string;
   color?: eColors | null | undefined;
};

export const Alert: FC<AlertProps> = ({ text, color = eColors.Success }) => {
   const sentences = text.split('\n');

   const messageContent = sentences.map((sentence, index) => <p key={index}>{sentence}</p>);

   return (
      <div
         className={classNames(
            'flex',
            'p-4',
            'mb-4',
            'text-center',
            'text-sm',
            color,
            'border',
            'border-gray-300',
            'dark:border-night-700',
            'rounded-lg',
            'bg-gray-100',
            'dark:bg-gray-900',
         )}
         role="alert"
      >
         <span className="sr-only">Info</span>
         <HiOutlineInformationCircle size="1.5rem" className="flex-shrink-0 mr-2" />
         <div className="m-auto">{messageContent}</div>
      </div>
   );
};
