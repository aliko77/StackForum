import { FC } from 'react';

type Props = {
   path: string | undefined;
   width?: string;
   height?: string;
};

export const Avatar: FC<Props> = ({ path, height, width }) => {
   return (
      <>
         <img
            className="border-solid border-2 border-white rounded-full"
            src={path}
            alt="profile picture"
            style={{ height: `${height}`, width: `${width}` }}
         />
      </>
   );
};
