import Button from 'components/Button';
import Logo from 'components/Logo';
import OtpInput from 'components/OtpInput';
import { useAuth } from 'hooks/useAuth';
import { FC, useState, FormEvent } from 'react';

const account_verify: FC = () => {
   const { user } = useAuth();
   const email = user?.email;
   const [otp, setOtp] = useState<string>('');
   const [issubmitting, setIssubmitting] = useState<boolean>(false);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (otp.length < 6) return;
      setIssubmitting(true);
   };

   return (
      <div className="py-20 px-4">
         <div className="container mx-auto">
            <div className="max-w-sm mx-auto md:max-w-lg">
               <div className="w-full">
                  <div className="text-gray-800 dark:text-gray-100 border dark:border-gray-600 dark:bg-night-200 py-8 rounded text-center flex flex-col justify-center">
                     <div className="m-auto mb-4">
                        <Logo noRedirect noText />
                     </div>
                     <h1 className="text-2xl font-semibold">Email Doğrulama</h1>
                     <div className="flex flex-col mb-4">
                        <span className="text-sm font-semibold uppercase ">
                           Aramıza Hoş geldin. Hesabını doğrulamak için
                        </span>
                        <span className="font-bold text-indigo-500 dark:text-indigo-400 my-2">
                           {email}
                        </span>
                        <span className="text-sm font-semibold uppercase ">
                           adresine gönderilen kodu giriniz.
                        </span>
                     </div>
                     <div className="flex justify-center items-center">
                        <form onSubmit={handleSubmit}>
                           <OtpInput
                              value={otp}
                              onChange={(value) => {
                                 setOtp(value);
                              }}
                           />
                           <div className="mt-4 mx-2">
                              <Button text={'Doğrula'} type="submit" disabled={issubmitting} />
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default account_verify;
