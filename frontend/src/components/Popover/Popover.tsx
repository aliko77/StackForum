import { FC, ReactNode } from 'react';

interface Props {
   content: ReactNode;
   button: ReactNode;
}

export const Popover: FC<Props> = ({ content, button }): JSX.Element => {
   return (
      <div className="group relative inline-block">
         {button}
         <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition shadow bg-night-200 text-gray-100 p-2 rounded absolute top-full mt-2 whitespace-nowrap">
            {}
         </span>
      </div>
   );
};
