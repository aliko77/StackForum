import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';

const Home: FC = () => {
   const { accessToken, user } = useAuth();
   return (
      <div className="m-auto text-center">
         <div className="text-xl dark:text-gray-100">Hoşgeldin: {user?.username || 'Misafir'}</div>
         {accessToken && !user?.is_verified && (
            <div className="mt-4">
               <Link to="/auth/verify">
                  <Button>Lütfen email adresinizi doğrulayınız.</Button>
               </Link>
            </div>
         )}
      </div>
   );
};

export default Home;
