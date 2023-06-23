import { Alert } from 'components/Alert';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { Logo } from 'components/Logo';
import { OtpInput } from 'components/OtpInput';
import { useAuth } from 'hooks/useAuth';
import { FC, useState, MouseEventHandler } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from 'hooks/useUser';
import { Toast } from 'utils';

const AuthVerify: FC = () => {
   const { user } = useAuth();
   const { accountVerify, accountVerifyResend, errors } = useUser();
   const [vcode, setVcode] = useState<string>('');
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
   const [message, setMessage] = useState<null | string>(null);

   if (user?.is_verified) {
      return <Navigate to="/" />;
   }

   const handleVerify = async (value: string) => {
      if (value.length != 6) return;
      setMessage(null);
      setIsSubmitting(true);

      const status = await accountVerify({ email: user?.email, vcode: value });
      if (status) {
         await Toast.fire({
            title: 'Hesabınız Doğrulandı',
            icon: 'success',
         });
      }
      setIsSubmitting(false);
   };

   const handleChange = (value: string) => {
      setVcode(value);
      handleVerify(value);
   };

   const handleResend: MouseEventHandler<HTMLButtonElement> = async () => {
      setMessage(null);
      setIsSubmitting(true);
      const status = await accountVerifyResend();
      if (status) {
         setMessage('Kod tekrar gönderildi.');
      }
      setIsSubmitting(false);
   };

   return (
      <div className="py-20 px-4">
         <div className="container mx-auto">
            <div className="max-w-sm mx-auto md:max-w-lg">
               <div className="w-full">
                  <div className="text-gray-800 dark:text-gray-100 border dark:border-gray-600 dark:bg-night-900 rounded-sm text-center flex flex-col justify-center">
                     <div className="my-4">
                        <Logo noRedirect />
                     </div>
                     <h1 className="text-2xl font-semibold">Hesap Doğrulama</h1>
                     <div className="flex flex-col my-2">
                        <span className="text-sm font-semibold uppercase">
                           <div>Hesabını Doğrulamak İçin</div>
                        </span>
                        <span className="font-bold text-secondary-500 dark:text-primary-400 my-2">
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
                     <div>
                        <OtpInput value={vcode} onChange={handleChange} />
                     </div>
                     <div className="text-right my-4 px-2">
                        <button
                           className="underline text-sm text-secondary-500 hover:text-secondary-700 dark:text-primary-500 dark:hover:text-primary-600"
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
      </div>
   );
};

export default AuthVerify;
