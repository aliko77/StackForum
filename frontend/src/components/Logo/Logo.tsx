import StackLogo from 'assets/images/ForumLogo.png';
import { Link } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import classNames from 'classnames';

type LogoProps = {
   noText?: boolean;
   noRedirect?: boolean;
};

export const Logo: FC<LogoProps> = ({ noText, noRedirect }) => {
   const _ = (): ReactNode => {
      const logoClasses = classNames(
         'hidden',
         'sm:block',
         'font-mono',
         'text-xl',
         'dark:text-gray-100',
         { 'sr-only': noText },
      );

      return (
         <div className="flex space-x-2 items-center">
            <img src={StackLogo} alt="Logo" className="h-8 w-8" />
            <h1 className={logoClasses}>
               <span>Stack</span>
               <span className="font-semibold ml-0.5">Forum</span>
            </h1>
         </div>
      );
   };

   if (noRedirect) {
      return _();
   }
   return <Link to="/">{_()}</Link>;
};
