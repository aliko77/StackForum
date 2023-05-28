import { FC } from 'react';

interface StatusIconProps {
   status?: string;
   transitions?: string;
}

export const StatusIcon: FC<StatusIconProps> = ({ status, transitions }) => {
   const iconColor = status === 'ONLINE' ? 'bg-green-400' : 'bg-red-400';

   return (
      <span
         className={`absolute ${transitions} w-3.5 h-3.5 border-2 border-white rounded-full ${iconColor}`}
      ></span>
   );
};
