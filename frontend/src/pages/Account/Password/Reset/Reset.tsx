import Button from 'components/Button/Button';
import Field from 'components/Field';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const ResetPassword: FC = () => {
   return (
      <div className="m-auto p-4">
         <div className="p-8 flex w-full border dark:border-night-200 max-w-lg items-center justify-center space-y-4 antialiased bg-white dark:bg-night-200 rounded dark:text-gray-200">
            <div className="space-y-6">
               <h1 className="mb-6 text-3xl font-bold text-center">Endişelenmeyin</h1>
               <p className="text-center mx-12 hidden sm:block">
                  Parolanızı kurtarmanıza yardımcı olmak için buradayız. Kayıt olduğunuz da
                  kullandığınız mail adresini girin, size şifrenizi sıfırlamanız için talimatlar
                  gönderelim.
               </p>
               <p className="sm:hidden text-center break-words">
                  <span>Kayıt olduğunuz da kullandığınız mail adresini girin,</span>
                  <span>size şifrenizi sıfırlamanız için talimatlar gönderelim.</span>
               </p>
               <form className="space-y-6 w-full">
                  <Field id="email" type="email" name="email" placeholder="Email adresi" />
                  <div>
                     <Button text="Gönder" type="submit"></Button>
                  </div>
               </form>
               <div className="text-sm text-gray-600 items-center flex justify-between">
                  <NavLink to={'/login'}>
                     <p className="text-gray-800 dark:text-gray-200 cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-500 inline-flex items-center">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5 mr-2"
                           viewBox="0 0 20 20"
                           fill="currentColor"
                        >
                           <path
                              fillRule="evenodd"
                              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                              clipRule="evenodd"
                           />
                        </svg>
                        Geri
                     </p>
                  </NavLink>
                  <p className="dark:text-gray-200 dark:hover:text-indigo-500 hover:text-indigo-500 cursor-pointer">
                     Bir sorun mu var?
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ResetPassword;
