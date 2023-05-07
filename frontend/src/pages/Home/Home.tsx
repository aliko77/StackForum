import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';

const Home: FC = () => {
   const { user } = useAuth();
   return (
      <div className="text-2xl m-auto">
         <div>Hoşgeldin: {user?.email || 'Misafir'}</div>
      </div>
   );
};

export default Home;
