const ControlPanel = () => {
   return (
      <>
         <div className="container mx-auto mt-4">
            <div className="table table-fixed w-full">
               <div className="sidebar rounded-t table table-fixed float-left w-full md:w-[240px]">
                  <div className="header h-12 leading-[3rem] bg-rose-500 dark:bg-indigo-500 rounded-t-sm">
                     <h1 className="text-gray-100 font-semibold uppercase px-4">Kontrol Paneli</h1>
                  </div>
                  <div className="content">
                     <div className="profile">
                        <div className="header bg-gray-100 dark:bg-night-200 px-4 py-2.5 flex justify-between items-center">
                           <span className="text-sm text-gray-900 dark:text-gray-100 uppercase font-medium">
                              Profil
                           </span>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4 text-rose-500 dark:text-indigo-500"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M4.5 15.75l7.5-7.5 7.5 7.5"
                              />
                           </svg>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="float-none md:float-right w-full md:w-[calc(100%-320px)]">
                  <div>content</div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ControlPanel;
