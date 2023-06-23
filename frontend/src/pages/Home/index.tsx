import { FC } from 'react';
import { Topics } from 'components/Topics';

const Home: FC = () => {
   return (
      <>
         <div>
            <div id="home-topics" className="container mx-auto py-4 sm:py-8 max-sm:px-4 space-y-6">
               <Topics />
            </div>
         </div>
      </>
   );
};

export default Home;
