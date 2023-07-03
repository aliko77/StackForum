import { useState } from 'react';

export const useMainTopics = () => {
   const [errors, setErrors] = useState<null | string[]>(null);
   const [loading, setLoading] = useState<boolean>(false);

   return {
      errors,
      loading,
   };
};
