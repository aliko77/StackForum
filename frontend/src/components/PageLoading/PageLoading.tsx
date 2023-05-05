const PageLoading = () => {
   let circleCommonClasses = 'h-5 w-5 bg-indigo-600 rounded-full';

   return (
      <div className="dark:bg-night-200">
         <div className="flex h-screen my-40 justify-center">
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
         </div>
      </div>
   );
};

export default PageLoading;