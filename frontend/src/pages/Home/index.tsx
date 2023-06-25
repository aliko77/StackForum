import { FC } from 'react';
import { HomeTopics } from 'components/Topics';

const Home: FC = () => {
   return (
      <>
         <div>
            <div id="home-topics" className="container mx-auto py-4 sm:py-8 max-sm:px-4 space-y-6">
               <HomeTopics />
            </div>
         </div>
      </>
   );
};

export default Home;
