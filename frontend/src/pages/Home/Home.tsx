import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import axiosService from 'api/axios';

const Home: FC = () => {
   const { user } = useAuth();
   console.log(typeof user, user);

   const handleClick = async () => {
      try {
         const response = await axiosService.get('user/');
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="m-auto text-center">
         <div className="text-xl dark:text-gray-100">Hoşgeldin: {user?.email || 'Misafir'}</div>
         <Button text="Helloo" onClick={handleClick} />
         {user && !user.is_verified && (
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
