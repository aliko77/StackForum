import { FC } from 'react';
import './index.css';

const Home: FC = () => {
   return (
      <>
         <div>
            <div id="home-topics" className="container mx-auto py-4 sm:py-8 max-sm:px-4 space-y-6">
               <div>
                  <ul>
                     <li className="header">
                        <ul>
                           <li className="relative w-16 border-r border-r-gray-500 bg-night-900">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-5 mx-auto"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                                 />
                              </svg>
                           </li>
                           <li className="sm:w-3/6 px-3 border-r border-r-gray-500 text-left !text-base">
                              Test Konu Başlığı
                           </li>
                           <li className="max-sm:!hidden px-2 bg-night-600 border-r border-r-gray-500 text-center">
                              Son Mesaj
                           </li>
                           <li className="max-sm:!hidden px-2 bg-night-600 text-center">
                              Konu / Mesaj
                           </li>
                        </ul>
                     </li>
                     <li className="body">
                        <ul>
                           <li className="w-16 text-gray-400 py-4 border-r border-r-gray-500">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-8 h-8 mx-auto"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                 />
                              </svg>
                           </li>
                           <li className="px-3 sm:w-3/6 border-r border-r-gray-500 text-left">s</li>
                           <li className="px-3 max-sm:hidden border-r border-r-gray-500 text-left">
                              <div>x Konusunda yeni mesaj</div>
                              <div>
                                 <div className="w-1/2 float-left">-ali</div>
                                 <div className="w-1/2 float-right text-gray-400">
                                    {new Date().toLocaleString()}
                                 </div>
                              </div>
                           </li>
                           <li className="px-3 max-sm:hidden border-r border-r-gray-500 text-center">
                              <div>100 / 200</div>
                           </li>
                        </ul>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
