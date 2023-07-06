import { FC } from 'react';
import { Questions } from 'components/Questions';

const Home: FC = () => {
   return (
      <>
         <div>
            <div
               id="home-questions"
               className="container mx-auto py-4 sm:py-8 max-sm:px-4 space-y-6"
            >
               <Questions />
            </div>
         </div>
      </>
   );
};

export default Home;
