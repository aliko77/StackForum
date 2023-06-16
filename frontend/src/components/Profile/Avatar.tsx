import { FC } from 'react';

type Props = {
   path: string | undefined;
   width?: string;
   height?: string;
};

export const Avatar: FC<Props> = ({ path, height = '2.5rem', width = '2.5rem' }) => {
   return (
      <>
         <img
            className="border-solid border-2 border-white rounded-full min-w-max w-full h-full"
            src={path}
            alt="profile picture"
            style={{ height, width }}
         />
      </>
   );
};
