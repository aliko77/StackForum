import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import { axiosPrivate } from 'api/axios';

const Home: FC = () => {
   const { accessToken, user } = useAuth();

   const handleClick = async () => {
      const response = await axiosPrivate.get('/user/');
      console.log(response);
   };

   return (
      <div className="m-auto text-center">
         <div className="text-xl dark:text-gray-100">Hoşgeldin: {user?.email || 'Misafir'}</div>
         <Button text="Test" onClick={handleClick} />
         {accessToken && !user?.is_verified && (
            <div className="mt-4">
               <Link to={'/auth/verify'}>
                  <Button text="Lütfen email adresinizi doğrulayınız." />
               </Link>
            </div>
         )}
      </div>
   );
};

export default Home;
