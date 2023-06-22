import { FC } from 'react';

const Home: FC = () => {
   return (
      <>
         <div>
            <div id="topics" className="container mx-auto py-4 sm:py-8 max-sm:px-4 space-y-6">
               <div className="overflow-x-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex justify-between items-center bg-night-900 rounded-t">
                     <div className="h-10 leading-10 flex items-center">
                        <h1 className="px-2 text-sm font-semibold tracking-wide text-gray-300">
                           Konu Başlıkları
                        </h1>
                     </div>
                     <div className="max-sm:hidden">
                        <div className="flex flex-auto text-sm">
                           <div className="w-[200px] text-center h-10 leading-10 bg-night-600 font-medium text-gray-300 border-r-2 border-gray-500">
                              <p>Son Mesaj</p>
                           </div>
                           <div className="w-[200px] text-center h-10 leading-10 bg-night-600 font-medium text-gray-300">
                              <p>Konu / Mesaj</p>
                           </div>
                           <div className="w-[40px] flex items-center justify-center bg-night-900 text-gray-300">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-5"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                                 />
                              </svg>
                           </div>
                        </div>
                     </div>
                  </div>
                  <ul>
                     <li className="w-full overflow-hidden bg-night-800 text-gray-100">
                        <ol className="w-full table table-fixed border-b border-gray-500">
                           <li className="w-16 h-16 flex items-center justify-center border-r border-gray-500">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                 />
                              </svg>
                           </li>
                           <li className="p-3 w-full max-sm:text-sm text-ellipsis">
                              <span>Test Konu</span>
                           </li>
                        </ol>
                        {/* <div className="bg-night-800 text-gray-100">
                              <div className="flex items-center border-b border-gray-500">
                                 <div className="p-3 border-r border-gray-500">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       strokeWidth={1.5}
                                       stroke="currentColor"
                                       className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                       />
                                    </svg>
                                 </div>
                                 <div className="p-3 w-full text-sm sm:text-base text-ellipsis">
                                    <span>Test Konu</span>
                                 </div>
                                 <div className="w-full">hi</div>
                              </div>
                           </div> */}
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
