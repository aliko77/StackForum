import StackLogo from 'assets/images/ForumLogo.png';
import { Link } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import classNames from 'classnames';

type LogoProps = {
   noText?: boolean;
   noRedirect?: boolean;
   hw?: string;
};

export const Logo: FC<LogoProps> = ({ noText, noRedirect, hw = '8' }) => {
   const _ = (): ReactNode => {
      const logoClasses = classNames(
         'block',
         'text-md',
         'sm:text-xl',
         'dark:text-gray-100',
         { 'sr-only': noText },
      );

      const hwList: { [key: string]: string } = {
         '2': 'h-2 w-2',
         '4': 'h-4 w-4',
         '6': 'h-6 w-6',
         '8': 'h-8 w-8',
         '10': 'h-10 w-10',
         '12': 'h-12 w-12',
         '14': 'h-14 w-14',
         '16': 'h-16 w-16',
      };
      const imgClasses = classNames(hwList[hw]);

      return (
         <div className="flex space-x-2 items-center">
            <img src={StackLogo} alt="Logo" className={imgClasses} />
            <h1 className={logoClasses}>
               <span>StackForum</span>
            </h1>
         </div>
      );
   };

   if (noRedirect) {
      return _();
   }
   return (
      <Link
         className="rounded focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
         to="/"
      >
         {_()}
      </Link>
   );
};
