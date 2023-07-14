import Button from 'components/Button';
import { FC } from 'react';

const Questions: FC = () => {
   return (
      <div className="flex flex-auto">
         <div className="w-full max-w-5xl mx-auto sm:border-x sm:border-gray-200 sm:dark:border-gray-400 before:table after:table after:clear-both">
            <div className="flex flex-wrap px-6 pt-6 mb-6">
               <h1 className="flex-auto text-xl font-500 mb-4 dark:text-gray-100">Tüm Sorular</h1>
               <div>
                  <Button color="purple">Soru Sor</Button>
               </div>
            </div>
            <div className="px-6 mb-6">
               <div className="flex-auto" >
                  <p className="">1,200 Soru</p>
               </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-400" />
         </div>
      </div>
   );
};

export default Questions;
