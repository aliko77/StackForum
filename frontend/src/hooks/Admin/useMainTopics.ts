import { axiosPrivate } from 'api/axios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { TagNameProps } from 'types/Admin';

export const useMainTopics = () => {
   const [errors, setErrors] = useState<null | string[]>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const getMainTopicsHeaders = async (): Promise<TagNameProps[]> => {
      try {
         setIsLoading(false);
         setIsLoading(true);
         return [];
         const { data, status } = await axiosPrivate.get('/admin/main-topics-headers/');
         setErrors(null);
         return status === 200 ? data : [];
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return [];
      }
   };

   return {
      errors,
      isLoading,
      getMainTopicsHeaders,
   };
};
