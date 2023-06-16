import classNames from 'classnames';
import { FC } from 'react';

type StatusIconProps = {
   status?: string;
   transitions?: string;
};

export const StatusIcon: FC<StatusIconProps> = ({ status, transitions }) => {
   const iconColor = status === 'ONLINE' ? 'bg-green-400' : 'bg-red-400';

   const iconClasses = classNames(
      'absolute',
      transitions,
      'w-3.5',
      'h-3.5',
      'border-2',
      'border-white',
      'rounded-full',
      iconColor,
   );

   return <span className={iconClasses}></span>;
};
