import { Logo } from 'components/Logo';
import { FC } from 'react';

type Props = {
   message?: string;
};

export const PageLoading: FC<Props> = ({ message }) => {
   const circleCommonClasses = 'h-5 w-5 bg-violet-600 rounded-full';

   return (
      <div className="bg-night-800 h-screen">
         <div className="flex justify-center items-center my-20">
            <Logo noRedirect noText />
            <div className="ml-2">
               <h1 className="text-xl text-gray-100 font-mono text-center">
                  <span>Stack</span>
                  <span className="font-semibold">Forum</span>
               </h1>
            </div>
         </div>
         <div>
            <div>{message && <h1>{message}</h1>}</div>
            <div className="flex justify-center">
               <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
               <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
               <div className={`${circleCommonClasses} animate-bounce400`}></div>
            </div>
         </div>
      </div>
   );
};
