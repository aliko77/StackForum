import { FC } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export const TopicTags: FC = () => {
   return (
      <div className="w-full max-w-5xl mx-auto border-l dark:border-gray-400 p-6 h-screen before:table after:table after:clear-both">
         <h1 className="text-xl font-500 mb-4 dark:text-gray-100"># Konu Etiketleri</h1>
         <p className="text-sm w-2/3 mb-4 dark:text-gray-100">
            Etiketler, sorunuzu kategorize eden bir anahtar kelimedir. Doğru etiketleri kullanmak,
            sorunuzun yanıtlanmasını kolaylaştırır.
         </p>
         <div className="flex justify-between items-center space-x-4">
            <div className="relative w-60">
               <div className="flex items-center">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                     <AiOutlineSearch size="24px" className="text-gray-500" />
                  </div>
                  <input
                     type="text"
                     name="tag-search"
                     id="tag-search"
                     placeholder="Etikete göre ara"
                     className="block w-full pl-10 p-2 text-sm outline-none disabled:bg-gray-300 disabled:dark:bg-gray-800 bg-gray-50 dark:bg-night-700 border border-gray-300 text-gray-900 rounded-sm focus:ring-secondary-500 focus:border-secondary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 placeholder:text-sm"
                  />
               </div>
            </div>
            <div>
               <div className="flex justify-center items-center text-sm text-secondary-600 dark:text-primary-600">
                  <button className="border border-r-0 border-gray-400 rounded-l p-2 bg-gray-300 dark:bg-night-900">
                     Popüler
                  </button>
                  <button className="border border-gray-400 rounded-r p-2 dark:bg-night-700">
                     Yeni
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
