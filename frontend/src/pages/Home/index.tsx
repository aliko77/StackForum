import { Logo } from 'components/Logo';
import { FC } from 'react';

const Home: FC = () => {
   return (
      <>
         <div>
            <div id="topics" className="container mx-auto py-8">
               <div className="flex justify-between items-center bg-night-900 rounded-t p-3 border-b border-gray-500">
                  <h1 className="text-base font-semibold tracking-wide text-gray-300">
                     Konu Başlıkları
                  </h1>
                  <div>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-300"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                        />
                     </svg>
                  </div>
               </div>
               <div className="flex items-center align-middle bg-night-900 border-b border-gray-500 text-gray-100">
                  <div className="p-3 border-r border-gray-500">
                     <Logo noText noRedirect hw="12" />
                  </div>
                  <div className="p-3 w-full">Test</div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
