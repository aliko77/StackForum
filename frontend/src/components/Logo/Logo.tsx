import StackLogo from 'assets/images/ForumLogo.png';
import { Link } from 'react-router-dom';

type LogoProps = {
   noText?: boolean;
};

const Logo: React.FC<LogoProps> = ({ noText }) => {
   let classList: string = 'font-mono space-x-0.5 text-xl dark:text-gray-100 ';
   if (noText) classList += 'sr-only';
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
