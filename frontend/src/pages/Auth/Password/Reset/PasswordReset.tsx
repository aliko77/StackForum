import { axiosService } from 'api/axios';
import { AxiosError } from 'axios';
import { Alert } from 'components/Alert';
import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { Logo } from 'components/Logo';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { object, string, ref } from 'yup';

const PasswordReset: FC = () => {
   const { uid, token } = useParams();
   const [errors, setErrors] = useState<string[] | null>(null);
   const [message, setMessage] = useState<string | null>(null);

   const validationSchema = object({
      password: string()
         .required('*')
         .min(8, 'Şifreniz en az 8 karakter olmalıdır.')
         .max(128, 'En fazla 128 karakter.'),
      confirm_password: string()
         .required('*')
         .oneOf([ref('password')], 'Şifreler eşleşmiyor.'),
   });

   return (
      <div className="mx-auto w-full p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo noRedirect />
         </div>
         <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white border rounded-lg dark:border dark:bg-night-900 dark:border-night-700">
            <div>
               <div className="mb-6">
                  <h1 className="text-2xl text-zinc-800 dark:text-gray-100 font-semibold text-left">
                     Şifre Değişikliği
                  </h1>
               </div>
               <Formik
                  initialValues={{ password: '', confirm_password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                     setMessage(null);
                     setErrors(null);
                     try {
                        const { data } = await axiosService.post('auth/password/reset/', {
                           uid: uid,
                           token: token,
                           password: values.password,
                           confirm_password: values.confirm_password,
                        });
                        if (data.status) {
                           setMessage('Şifreniz değiştirildi.');
                        } else {
                           throw new Error();
                        }
                     } catch (error: unknown) {
                        if (error instanceof AxiosError) {
                           setErrors(error.response?.data);
                        }
                     }
                  }}
               >
                  {({
                     values,
                     errors: formikErrors,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     isSubmitting,
                  }) => (
                     <div>
                        {errors && <FormErrors errors={errors} />}
                        {message && <Alert text={message} />}
                        {isSubmitting && <LoadSpinner />}
                        <form noValidate className="w-full space-y-4" onSubmit={handleSubmit}>
                           <div>
                              <Field
                                 id="password"
                                 type="password"
                                 name="password"
                                 placeholder="Yeni şifre"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.password}
                                 errorMessage={formikErrors.password}
                              />
                           </div>
                           <div>
                              <Field
                                 id="confirm_password"
                                 type="password"
                                 name="confirm_password"
                                 placeholder="Şifreyi onayla"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.confirm_password}
                                 errorMessage={formikErrors.confirm_password}
                              />
                           </div>
                           <div>
                              <Button text="Kaydet" type="submit" disabled={isSubmitting} />
                           </div>
                        </form>
                     </div>
                  )}
               </Formik>
               <div className="mt-4 text-sm text-gray-600 items-center flex justify-end">
                  <p className="dark:text-gray-200 dark:hover:text-indigo-500 hover:text-indigo-500 cursor-pointer">
                     Bir sorun mu var?
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PasswordReset;
