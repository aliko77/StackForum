import { useTopicTags } from 'hooks/useTopicTags';
import AdminPanel from 'layouts/AdminPanel';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TopicTagProps } from 'types';

export const TopicTagDetail = () => {
   const { id } = useParams();
   const { getTopicTag } = useTopicTags();
   const [tagDetail, setTagDetail] = useState<TopicTagProps | null>(null);

   useEffect(() => {
      const retrieveTopicTags = async () => {
         const topic = await getTopicTag(id ?? '');
         setTagDetail(topic);
      };
      retrieveTopicTags();
   }, []);

   return (
      <AdminPanel>
         <div className="bg-night-900 p-2 rounded-t">
            <p className="text-base font-semibold tracking-wide text-gray-100">
               Etiketi Düzenle [{tagDetail?.id}]
            </p>
         </div>
         <div className="p-4 bg-gray-200 dark:bg-night-800"></div>
      </AdminPanel>
   );
};
