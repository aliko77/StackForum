import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import classNames from 'classnames';
import { TopicTagProps } from 'types';
import { TopicTags as rTopicTags } from 'fake-api/TopicTags';
import { LoadSpinner } from 'components/LoadSpinner';

type sortingTypes = 'popular' | 'new';

export const TopicTags: FC = () => {
   const [searchString, setSearchString] = useState<string>('');
   const [sorting, setSorting] = useState<sortingTypes>('popular');
   const [tag_records, setTag_records] = useState<TopicTagProps[] | null>(null);
   const def_tag_records: TopicTagProps[] = rTopicTags;

   useEffect(() => {
      setTag_records(def_tag_records.sort((a, b) => b.total_Q - a.total_Q));
   }, []);

   useEffect(() => {
      if (sorting === 'popular') {
         const sortedTags = [...def_tag_records].sort((a, b) => b.total_Q - a.total_Q);
         setTag_records(sortedTags);
      } else if (sorting === 'new') {
         const sortedTags = [...def_tag_records].sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA;
         });
         setTag_records(sortedTags);
      }
   }, [sorting]);

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchString(event.target.value);
   };

   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         if (searchString.length > 0) {
            const filteredTags = def_tag_records.filter((tag) =>
               tag.name.toLowerCase().includes(searchString.toLowerCase()),
            );
            setTag_records(filteredTags);
         } else {
            setTag_records(def_tag_records);
         }
      }
   };

   return (
      <div className="flex flex-auto">
         <div className="w-full max-w-5xl mx-auto sm:border-x sm:dark:border-gray-400 p-6 before:table after:table after:clear-both">
            <h1 className="text-xl font-500 mb-4 dark:text-gray-100"># Konu Etiketleri</h1>
            <p className="text-sm w-2/3 mb-4 text-gray-700 dark:text-gray-300">
               Etiketler, sorunuzu kategorize eden bir anahtar kelimedir. Doğru etiketleri
               kullanmak, sorunuzun yanıtlanmasını kolaylaştırır.
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
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                     />
                  </div>
               </div>
               <div>
                  <div className="flex justify-center items-center text-sm font-500 text-secondary-900 dark:text-primary-100">
                     <button
                        onClick={() => {
                           setSorting('popular');
                        }}
                        className={classNames(
                           'border-r-0',
                           'border',
                           'border-gray-400',
                           'rounded-l',
                           'p-2',
                           { 'bg-slate-300': sorting == 'popular' },
                           { 'dark:bg-night-900': sorting == 'popular' },
                           { 'dark:bg-night-700': sorting != 'popular' },
                        )}
                     >
                        Popüler
                     </button>
                     <button
                        onClick={() => {
                           setSorting('new');
                        }}
                        className={classNames(
                           'border',
                           'border-gray-400',
                           'rounded-r',
                           'p-2',
                           { 'bg-slate-300': sorting == 'new' },
                           { 'dark:bg-night-900': sorting == 'new' },
                           { 'dark:bg-night-700': sorting != 'new' },
                        )}
                     >
                        Yeni
                     </button>
                  </div>
               </div>
            </div>
            <div className="my-4">
               {!tag_records && (
                  <div>
                     <LoadSpinner />
                  </div>
               )}
               {tag_records && tag_records.length == 0 && (
                  <p className="text-center text-xl text-gray-600 dark:text-primary-100">
                     Böyle bir etiket bulunamadı.
                  </p>
               )}
               <div className="w-full grid gap-2.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {tag_records &&
                     tag_records.map((tag, key) => (
                        <div
                           key={key}
                           className="bg-white dark:bg-night-700 border rounded border-gray-300 dark:border-gray-500 p-2.5 flex flex-col justify-between"
                        >
                           <div className="mb-2.5 w-full max-w-min text-xs font-500 text-tertiary-700 dark:text-primary-100 bg-tertiary-300 dark:bg-night-900 p-0.5 px-1.5 rounded-sm">
                              {tag.name}
                           </div>
                           <div className="text-[13px] mb-2.5 overflow-hidden text-ellipsis dark:text-gray-200">
                              {tag.description}
                           </div>
                           <div className="flex justify-between items-center text-xs">
                              <div className="text-center text-gray-500 dark:text-gray-400">
                                 <div>Soru Sayısı</div>
                                 <div>{tag.total_Q}</div>
                              </div>
                              <div className="text-center text-gray-500 dark:text-gray-400">
                                 <div>Bugün</div>
                                 <div>{tag.new_total_Q} yeni soru</div>
                              </div>
                           </div>
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </div>
   );
};
