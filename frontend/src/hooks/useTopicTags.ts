import { AxiosError } from 'axios';
import { TopicTagProps } from 'types';
import { useState } from 'react';
import { axiosService } from 'api/axios';
import { useAxiosPrivate } from './useAxiosPrivate';

type addTopicTagProps = {
   name: string;
   description: string;
};

export const useTopicTags = () => {
   const axiosPrivate = useAxiosPrivate();
   const [errors, setErrors] = useState<null | string[]>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const getTopicTags = async (): Promise<TopicTagProps[]> => {
      try {
         setIsLoading(false);
         const { data, status } = await axiosService.get('/topic-tags/');
         setErrors(null);
         if (status === 200) return data;
         return [];
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return [];
      } finally {
         setIsLoading(true);
      }
   };

   const addTopicTag = async (values: addTopicTagProps): Promise<TopicTagProps | boolean> => {
      try {
         setIsLoading(false);
         const { data, status } = await axiosPrivate.post('/topic-tags/', {
            name: values.name,
            description: values.description,
         });
         setErrors(null);
         return status === 201 ? data : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      } finally {
         setIsLoading(true);
      }
   };

   return {
      errors,
      isLoading,
      getTopicTags,
      addTopicTag,
   };
};
