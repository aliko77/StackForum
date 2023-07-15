import classNames from 'classnames';
import Button from 'components/Button';
import { FC } from 'react';
import { BiFilter } from 'react-icons/bi';

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
            <div className="px-6 mb-6 flex items-center justify-between">
               <div className="flex-auto">
                  <div>
                     <p className="font-500">
                        <span className="tracking-wide">1,200</span> Soru
                     </p>
                  </div>
               </div>
               <div className="flex items-center justify-between space-x-4">
                  <div>
                     <div className="flex items-center justify-center space-x-2 border border-gray-400 rounded-sm">
                        <button
                           className={classNames(
                              'tracking-wide',
                              'text-sm',
                              'text-gray-500',
                              'border-r',
                              'py-1.5',
                              'px-2',
                           )}
                        >
                           Yeni
                        </button>
                        <button
                           className={classNames(
                              'tracking-wide',
                              'text-sm',
                              'text-gray-500',
                              'border-r',
                              'py-1.5',
                              'pr-2',
                           )}
                        >
                           Aktif
                        </button>
                        <button
                           className={classNames(
                              'tracking-wide',
                              'text-sm',
                              'text-gray-500',
                              'border-r',
                              'py-1.5',
                              'pr-2',
                           )}
                        >
                           Cevapsız
                        </button>
                     </div>
                  </div>
                  <div className="py-1.5 px-2 bg-sky-300 text-sky-700 rounded-sm">
                     <button className="flex items-center tracking-wide font-500 text-sm">
                        <BiFilter size={18} />
                        Filtre
                     </button>
                  </div>
               </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-400" />
         </div>
      </div>
   );
};

export default Questions;
