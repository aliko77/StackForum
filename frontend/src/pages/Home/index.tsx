import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';

const Home: FC = () => {
   const { user } = useAuth();
   return (
      <div className="m-auto text-center">
         <div className="text-xl dark:text-gray-100">Hoşgeldin: {user?.username || 'Misafir'}</div>
      </div>
   );
};

export default Home;
