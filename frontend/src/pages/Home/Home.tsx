import Button from 'components/Button/Button';
import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () => {
   const { user } = useAuth();

   return (
      <div className="m-auto text-center">
         <div className="text-xl dark:text-gray-100">Hoşgeldin: {user?.email || 'Misafir'}</div>
         {user && !user.is_verified && (
            <div className="mt-4">
               <Link to={'/account/verify'}>
                  <Button text="Lütfen email adresinizi doğrulayınız." />
               </Link>
            </div>
         )}
      </div>
   );
};

export default Home;
