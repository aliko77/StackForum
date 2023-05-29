import { FC } from 'react';

interface Prop {
   path: string;
   width?: string;
   height?: string;
}

export const Avatar: FC<Prop> = ({ path, height, width }) => {
   return (
      <>
         <img
            className="border-solid border-2 border-white rounded-full"
            src={`/images/profile_pictures/${path}`}
            alt="profile picture"
            style={{ height: `${height}`, width: `${width}` }}
         />
      </>
   );
};
