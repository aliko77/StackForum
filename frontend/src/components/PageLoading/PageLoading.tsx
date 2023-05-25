import { FC } from 'react';

interface IProp {
   message?: string;
}

export const PageLoading: FC<IProp> = ({ message }) => {
   const circleCommonClasses = 'h-5 w-5 bg-indigo-600 rounded-full';

   return (
      <div className="dark:bg-night-200">
         <div className="flex h-screen my-40 justify-center">
            {message && <h1>{message}</h1>}
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
         </div>
      </div>
   );
};
