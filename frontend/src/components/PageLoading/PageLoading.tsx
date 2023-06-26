import classNames from 'classnames';
import { Logo } from 'components/Logo';
import { COMPANY_NAME } from 'config';
import { FC } from 'react';

type Props = {
   message?: string;
};

export const PageLoading: FC<Props> = ({ message }) => {
   const circleCommonClasses = 'h-5 w-5 bg-primary-600 rounded-full';

   return (
      <div className="bg-white dark:bg-night-800 h-screen">
         <div className="flex justify-center items-center my-20">
            <Logo noRedirect noText />
            <div className="ml-2">
               <h1 className="text-xl dark:text-gray-100 text-center">
                  <span>{COMPANY_NAME}</span>
               </h1>
            </div>
         </div>
         <div>
            <div>{message && <h1>{message}</h1>}</div>
            <div className="flex justify-center">
               <div className={classNames(circleCommonClasses, 'mr-1', 'animate-bounce')}></div>
               <div className={classNames(circleCommonClasses, 'mr-1', 'animate-bounce200')}></div>
               <div className={classNames(circleCommonClasses, 'animate-bounce400')}></div>
            </div>
         </div>
      </div>
   );
};
