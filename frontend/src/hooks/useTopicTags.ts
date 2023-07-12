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
         setIsLoading(true);
         const { data, status } = await axiosService.get('/topic-tags/');
         setErrors(null);
         return status === 200 ? data : [];
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return [];
      } finally {
         setIsLoading(false);
      }
   };

   const addTopicTag = async (values: addTopicTagProps): Promise<TopicTagProps | boolean> => {
      try {
         setIsLoading(true);
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
         setIsLoading(false);
      }
   };

   const destroyTopicTag = async (tag: TopicTagProps): Promise<boolean> => {
      try {
         setIsLoading(true);
         const { status } = await axiosPrivate.delete(`/topic-tags/${tag.id}/`);
         setErrors(null);
         return status === 204 ? true : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      } finally {
         setIsLoading(false);
      }
   };

   const getTopicTag = async (id: string): Promise<TopicTagProps | null> => {
      try {
         setIsLoading(true);
         const { data, status } = await axiosPrivate.get(`/topic-tags/${id}/`);
         setErrors(null);
         return status === 200 ? data : null;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return null;
      } finally {
         setIsLoading(false);
      }
   };

   return {
      errors,
      isLoading,
      getTopicTags,
      addTopicTag,
      destroyTopicTag,
      getTopicTag,
   };
};
