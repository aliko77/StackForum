import classNames from 'classnames';
import Button from 'components/Button';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';

type tabProps = 'unanswered' | 'active' | 'new';

const Questions: FC = () => {
   const [searchParams] = useSearchParams();
   const [tab, setTab] = useState<tabProps>('new');

   useEffect(() => {
      const tabParam = searchParams.get('tab');
      if (tabParam && ['unanswered', 'active', 'new'].includes(tabParam)) {
         setTab(tabParam as SetStateAction<tabProps>);
      }
   }, [searchParams]);

   return (
      <div className="flex flex-auto">
         <div className="w-full max-w-5xl mx-auto sm:border-x sm:border-gray-200 sm:dark:border-gray-400 before:table after:table after:clear-both">
            <div className="flex flex-wrap px-6 pt-6 mb-4">
               <h1 className="flex-auto text-xl font-500 mb-4 dark:text-gray-100">Tüm Sorular</h1>
               <div>
                  <Button color="purple">Soru Sor</Button>
               </div>
            </div>
            <div className="px-6 mb-3 flex items-center justify-between">
               <div className="flex-auto">
                  <div>
                     <p className="font-500 dark:text-primary-100 ">
                        <span className="tracking-wider">1,200</span> Soru
                     </p>
                  </div>
               </div>
               <div className="flex items-center justify-between space-x-4">
                  <div>
                     <div className="flex items-center justify-center border border-gray-400 rounded-sm">
                        <button
                           className={classNames(
                              'tracking-wide',
                              'text-sm',
                              { 'text-gray-500 dark:text-gray-400': tab !== 'unanswered' },
                              {
                                 'text-black dark:text-primary-100 bg-gray-300 dark:bg-night-900':
                                    tab == 'unanswered',
                              },
                              'hover:text-black dark:hover:text-primary-100 hover:bg-gray-300 dark:hover:bg-night-900',
                              'border-r',
                              'py-1.5',
                              'px-2',
                           )}
                           onClick={() => setTab('unanswered')}
                        >
                           Cevapsız
                        </button>
                        <button
                           className={classNames(
                              'tracking-wide',
                              'text-sm',
                              { 'text-gray-500 dark:text-gray-400': tab !== 'new' },
                              {
                                 'text-black dark:text-primary-100 bg-gray-300 dark:bg-night-900':
                                    tab == 'new',
                              },
                              'hover:text-black dark:hover:text-primary-100 hover:bg-gray-300 dark:hover:bg-night-900',
                              'border-r',
                              'py-1.5',
                              'px-2',
                           )}
                           onClick={() => setTab('new')}
                        >
                           Yeni
                        </button>
                        <button
                           className={classNames(
                              'tracking-wide',
                              'text-sm',
                              { 'text-gray-500 dark:text-gray-400': tab !== 'active' },
                              {
                                 'text-black dark:text-primary-100 bg-gray-300 dark:bg-night-900':
                                    tab == 'active',
                              },
                              'hover:text-black dark:hover:text-primary-100 hover:bg-gray-300 dark:hover:bg-night-900',
                              'py-1.5',
                              'px-2',
                           )}
                           onClick={() => setTab('active')}
                        >
                           Aktif
                        </button>
                     </div>
                  </div>
                  <div className="py-1.5 px-2 bg-sky-200 hover:bg-sky-300 text-sky-700 rounded-sm">
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
