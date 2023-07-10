/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';

const useDebounce = () => {
   const timeout = useRef<NodeJS.Timeout | null>(null);

   const debounce = (func: (...args: any[]) => void, wait: number) => {
      return (...args: any[]) => {
         if (timeout.current) {
            clearTimeout(timeout.current);
         }
         timeout.current = setTimeout(() => func(...args), wait);
      };
   };

   useEffect(() => {
      return () => {
         if (timeout.current) {
            clearTimeout(timeout.current);
         }
      };
   }, []);

   return { debounce };
};

export default useDebounce;
