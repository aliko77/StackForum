import { useState } from 'react';
import axios from 'axios';

export const useVerificationHook = () => {
   const [isVerified, setIsVerified] = useState(false);
   const [verificationCode, setVerificationCode] = useState('');

   const handleVerificationCodeChange = (event) => {
      setVerificationCode(event.target.value);
   };

   const handleVerificationSubmit = async () => {
      try {
         const response = await axios.post('/verify', { code: verificationCode });
         if (response.data.isValid) {
            setIsVerified(true);
         }
      } catch (error) {
         console.error('Verification error:', error);
      }
   };

   return {
      isVerified,
      handleVerificationCodeChange,
      handleVerificationSubmit,
   };
};
