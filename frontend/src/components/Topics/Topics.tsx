import { FC } from 'react';
import { PiChatsLight } from 'react-icons/pi';
import { topics } from 'fake-api';
import { Avatar } from 'components/Profile';

export const Topics: FC = () => {
   return (
      <>
         {topics.map((topic, key) => (
            <ul key={key}>
               <li>
                  <ol className="table table-fixed w-full h-14 bg-gray-200 dark:bg-night-800 border-b border-x border-secondary-500 dark:border-gray-600 text-sm">
                     <li className="max-md:hidden table-cell align-middle w-12 text-gray-600 dark:text-gray-400 border-r border-secondary-500 dark:border-gray-600">
                        <PiChatsLight className="mx-auto" size={'2rem'} />
                     </li>
                     <li className="table-cell align-middle w-16 border-r border-secondary-500 dark:border-gray-600">
                        <div className="flex justify-center">
                           <Avatar path={topic.author.profile_photo} />
                        </div>
                     </li>
                     <li className="table-cell align-middle px-3 border-r border-secondary-500 dark:border-gray-600 text-gray-100/90">
                        <div className="mb-1">{topic.topic_title}</div>
                        <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                           {topic.author.name}
                        </div>
                     </li>
                     <li className="max-md:hidden w-[160px] table-cell align-middle px-3 border-r border-secondary-500 dark:border-gray-600 text-right">
                        <div className="mb-1 text-xs text-gray-700 dark:text-gray-400">
                           {topic.last_activity.date}
                        </div>
                        <div className="text-gray-100/80 overflow-hidden whitespace-nowrap text-ellipsis">
                           {topic.last_activity.sender.name}
                        </div>
                     </li>
                     <li className="max-md:hidden w-[160px] table-cell align-middle px-3 border-r border-secondary-500 dark:border-gray-600 text-center">
                        <div className="mb-1 text-gray-700 dark:text-gray-400">Ana Konu</div>
                        <div className="text-gray-100/80 overflow-hidden whitespace-nowrap text-ellipsis">
                           {topic.main_topic_header}
                        </div>
                     </li>
                  </ol>
               </li>
            </ul>
         ))}
      </>
   );
};
