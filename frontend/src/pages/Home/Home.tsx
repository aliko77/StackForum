import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';

const Home: FC = () => {
   const { user, isVerified } = useAuth();
   const _isVerified = isVerified();
   return (
      <div className="text-2xl m-auto text-center">
         <div>Hoşgeldin: {user?.email || 'Misafir'}</div>
         {user && !_isVerified && <div>Lütfen email adresinizi doğrulayınız.</div>}
      </div>
   );
};

export default Home;
