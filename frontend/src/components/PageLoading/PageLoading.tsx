import { Logo } from 'components/Logo';
import { FC } from 'react';

interface IProp {
   message?: string;
}

export const PageLoading: FC<IProp> = ({ message }) => {
   const circleCommonClasses = 'h-5 w-5 bg-indigo-600 rounded-full';

   return (
      <div className="dark:bg-night-200 h-screen">
         <div className="flex justify-center my-20">
            <div>
               <Logo noRedirect />
               <div>
                  <h1 className="text-xl dark:text-gray-100 font-mono text-center sm:hidden">
                     <span>Stack</span>
                     <span className="font-semibold">Forum</span>
                  </h1>
               </div>
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
