import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

interface UseAxiosResponse<T> {
   response: T | null;
   error: AxiosError | null;
   loading: boolean;
}

export const useAxios = <T>(axiosParams: AxiosRequestConfig): UseAxiosResponse<T> => {
   const [response, setResponse] = useState<T | null>(null);
   const [error, setError] = useState<AxiosError | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   const fetchData = async (params: AxiosRequestConfig) => {
      try {
         const result = await axios.request<T>(params);
         setResponse(result.data);
      } catch (err: AxiosError | unknown) {
         if (axios.isAxiosError(err)) {
            setError(err);
         }
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchData(axiosParams);
   }, []);

   return { response, error, loading };
};
