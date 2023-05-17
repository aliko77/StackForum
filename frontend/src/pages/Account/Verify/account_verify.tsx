import axiosService from 'api/axios';
import { AxiosError } from 'axios';
import Alert from 'components/Alert';
import Button from 'components/Button';
import FormErrors from 'components/FormErrors';
import LoadSpinner from 'components/LoadSpinner';
import Logo from 'components/Logo';
import OtpInput from 'components/OtpInput';
import { useAuth } from 'hooks/useAuth';
import { FC, useState, FormEvent, MouseEventHandler } from 'react';
import { Navigate } from 'react-router-dom';

const account_verify: FC = () => {
   const { user, verify } = useAuth();
   const [vcode, setVcode] = useState<string>('');
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
   const [errors, setErrors] = useState<null | string[]>(null);
   const [message, setMessage] = useState<null | string>(null);
   const [nr, setNr] = useState<boolean>(false);

   if (!nr && user?.is_verified) {
      return <Navigate to={'/'} />;
   }

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setErrors(null);
      setMessage(null);
      setIsSubmitting(true);
      await verify(vcode, user?.email)
         .then(() => {
            setNr(true);
            setMessage('Başarıyla doğrulandı.');
         })
         .catch((error: AxiosError) => {
            const responseErrors = error.response?.data as string[];
            setErrors(
               responseErrors ? responseErrors : ['Bir hata oluştu. Lütfen tekrar deneyiniz.'],
            );
         })
         .finally(() => {
            setIsSubmitting(false);
         });
   };

   const handleResend: MouseEventHandler<HTMLButtonElement> = async () => {
      setErrors(null);
      setMessage(null);
      setIsSubmitting(true);
      if (user?.is_verified) return;
      await axiosService
         .post('/account/verify-resend/', {
            email: user?.email,
         })
         .then(({ data }) => {
            if (data.status) {
               setMessage('Kod tekrar gönderildi.');
            } else {
               setErrors(() => [...[], 'Bir hata oluştu. Lütfen tekrar deneyiniz.']);
            }
         })
         .catch(() => {
            setErrors(() => [...[], 'Bir hata oluştu. Lütfen tekrar deneyiniz.']);
         })
         .finally(() => {
            setIsSubmitting(false);
         });
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
                     <h1 className="text-2xl font-semibold">Hesap Doğrulama</h1>
                     <div className="flex flex-col my-2">
                        <span className="text-sm font-semibold uppercase">
                           <div>
                              <span>Hoşgeldin.</span>
                           </div>
                           <div>
                              <span>Doğrulamak için</span>
                           </div>
                        </span>
                        <span className="font-bold text-indigo-500 dark:text-indigo-400 my-2">
                           {user?.email}
                        </span>
                        <span className="text-sm font-semibold uppercase ">
                           adresine gönderilen kodu giriniz.
                        </span>
                     </div>
                     <div className="my-4">
                        <hr />
                     </div>
                     <div className="mx-4">
                        {errors && <FormErrors errors={errors} />}
                        {message && <Alert text={message} />}
                        {isSubmitting && <LoadSpinner />}
                     </div>
                     <div className="flex justify-center items-center">
                        <form onSubmit={handleSubmit}>
                           <OtpInput
                              value={vcode}
                              onChange={(value) => {
                                 setVcode(value);
                              }}
                           />
                           <div className="mt-4 mx-2">
                              <Button text={'Doğrula'} type="submit" disabled={isSubmitting} />
                           </div>
                        </form>
                     </div>
                  </div>
                  <div className="text-right">
                     <button
                        className="underline text-sm text-indigo-500 hover:text-indigo-600"
                        onClick={handleResend}
                        disabled={isSubmitting}
                     >
                        Maili tekrar gönder.
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default account_verify;
