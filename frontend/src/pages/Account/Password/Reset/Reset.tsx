import Alert from 'components/Alert/Alert';
import Button from 'components/Button/Button';
import Field from 'components/Field';
import FormErrors from 'components/FormErrors/FormErrors';
import LoadSpinner from 'components/LoadSpinner/LoadSpinner';
import { Formik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { object, string } from 'yup';

const ResetPassword: FC = () => {
   const [errors, setErrors] = useState<string[] | null>(null);
   const [message, setMessage] = useState<string | null>(null);
   const { resetPassword } = useAuth();

   const validationSchema = object({
      email: string().email('*').required('*'),
   });

   return (
      <div className="m-auto p-4">
         <div className="p-8 flex w-full border dark:border-night-200 max-w-lg items-center justify-center space-y-4 antialiased bg-white dark:bg-night-200 rounded dark:text-gray-200">
            <div>
               <div className='mb-4'>
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
               </div>
               <Formik
                  initialValues={{ email: '' }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                     setMessage(null);
                     setErrors(null);
                     await resetPassword(values.email)
                        .then(() => {
                           setMessage('Sıfırlama maili gönderildi.');
                        })
                        .catch(() => {
                           setErrors(['Bir hata oluştu. Lütfen tekrar deneyiniz']);
                        });
                  }}
               >
                  {({
                     values,
                     errors: formikErrors,
                     touched,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     isSubmitting,
                  }) => (
                     <div>
                        {errors && <FormErrors errors={errors} />}
                        {message && <Alert text={message} />}
                        {isSubmitting && <LoadSpinner />}
                        <form noValidate className="w-full" onSubmit={handleSubmit}>
                           <Field
                              id="email"
                              type="email"
                              name="email"
                              placeholder="Email adresi"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                           />
                           <p className="text-red-500 dak:text-red-400 text-sm ml-1">
                              {formikErrors.email && touched.email && formikErrors.email}
                           </p>
                           <div className="mt-4">
                              <Button text="Gönder" type="submit" disabled={isSubmitting} />
                           </div>
                        </form>
                     </div>
                  )}
               </Formik>
               <div className="mt-4 text-sm text-gray-600 items-center flex justify-between">
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
