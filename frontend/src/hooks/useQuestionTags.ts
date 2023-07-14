import { AxiosError } from 'axios';
import { QuestionTagProps } from 'types';
import { useState } from 'react';
import { axiosService } from 'api/axios';
import { useAxiosPrivate } from './useAxiosPrivate';

type addQuestionTagProps = {
   name: string;
   description: string;
};

type getQuestionTagsProps = {
   count: number;
   next: string | null;
   previous: string | null;
   results: QuestionTagProps[];
};

export const useQuestionTags = () => {
   const axiosPrivate = useAxiosPrivate();
   const [errors, setErrors] = useState<null | string[]>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   /**
    * API isteği ile etiketleri döner, DRF sayfalama kullanır !
    * @param {number} limit - limit
    * @param {number} offset - offset
    * @return etiketler
    */
   const getQuestionTags = async (
      limit: number,
      offset: number,
   ): Promise<getQuestionTagsProps | undefined> => {
      try {
         setIsLoading(true);
         const { data, status } = await axiosService.get(
            `/question-tags/?limit=${limit}&offset=${offset}`,
         );
         setErrors(null);
         return status === 200 ? data : [];
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return undefined;
      } finally {
         setIsLoading(false);
      }
   };

   const addQuestionTag = async (
      values: addQuestionTagProps,
   ): Promise<QuestionTagProps | boolean> => {
      try {
         setIsLoading(true);
         const { data, status } = await axiosPrivate.post('/question-tags/', {
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

   const destroyQuestionTag = async (tag: QuestionTagProps): Promise<boolean> => {
      try {
         setIsLoading(true);
         const { status } = await axiosPrivate.delete(`/question-tags/${tag.id}/`);
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

   const getQuestionTag = async (id: string): Promise<QuestionTagProps | undefined> => {
      try {
         setIsLoading(true);
         const { data, status } = await axiosPrivate.get(`/question-tags/${id}/`);
         setErrors(null);
         return status === 200 ? data : undefined;
      } catch (error) {
         if (error instanceof AxiosError) {
            error.response?.status !== 500 && setErrors(error.response?.data);
         }
         return undefined;
      } finally {
         setIsLoading(false);
      }
   };

   const editQuestionTag = async (
      id: number,
      updatedData: {
         name: string | undefined;
         description: string | undefined;
      },
   ): Promise<QuestionTagProps | boolean> => {
      try {
         setIsLoading(true);
         const { data, status } = await axiosPrivate.patch(`/question-tags/${id}/`, updatedData);
         setErrors(null);
         setIsLoading(false);
         return status === 200 ? data : false;
      } catch (error) {
         error instanceof AxiosError &&
            error.response?.status !== 500 &&
            setErrors(error.response?.data);
         return false;
      } finally {
         setIsLoading(false);
      }
   };

   return {
      errors,
      isLoading,
      getQuestionTags,
      addQuestionTag,
      destroyQuestionTag,
      getQuestionTag,
      editQuestionTag,
   };
};
