import StackLogo from 'assets/images/ForumLogo.png';
import { Link } from 'react-router-dom';
import { FC } from 'react';

type LogoProps = {
   noText?: boolean;
   noRedirect?: boolean;
};

const Logo: FC<LogoProps> = ({ noText, noRedirect }) => {
   const classList = `hidden sm:block font-mono space-x-0.5 text-xl dark:text-gray-100 ${
      noText ? 'sr-only' : ''
   }`;
   if (noRedirect) {
      return (
         <div className="flex">
            <div>
               <div className="flex space-x-2 items-center outline-0">
                  <img width="36px" src={StackLogo} alt="Logo" />
                  <h1 className={classList}>
                     <span>Stack</span>
                     <span className="font-semibold">Forum</span>
                  </h1>
               </div>
            </div>
         </div>
      );
   }
   return (
      <div className="flex">
         <Link to="/">
            <div>
               <div className="flex space-x-2 items-center outline-0">
                  <img width="36px" src={StackLogo} alt="Logo" />
                  <h1 className={classList}>
                     <span>Stack</span>
                     <span className="font-semibold">Forum</span>
                  </h1>
               </div>
            </div>
         </Link>
      </div>
   );
};

export default Logo;
