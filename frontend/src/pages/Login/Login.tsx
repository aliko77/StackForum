import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { object, string } from 'yup';
import { useAuth } from 'hooks/useAuth';
import { FC, useState } from 'react';
import { AxiosError } from 'axios';
import { Logo } from 'components/Logo';
import { Alert, eColors } from 'components/Alert';
import { LoadSpinner } from 'components/LoadSpinner';
import { Button } from 'components/Button';
import { Field } from 'components/Field';

interface LoginProp {
   email: string;
   password: string;
}

const InitialState: LoginProp = {
   email: '',
   password: '',
};

const validationSchema = object({
   email: string().email('*').required('*'),
   password: string().required('*'),
});

const Login: FC = () => {
   const { login } = useAuth();
   const [message, setMessage] = useState<null | string>(null);

   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo noRedirect />
         </div>
         <div className="border rounded px-3 pt-5 bg-white dark:text-gray-100 dark:bg-night-200 dark:border-gray-500">
            <Formik
               validationSchema={validationSchema}
               initialValues={InitialState}
               onSubmit={async (values) => {
                  setMessage(null);
                  try {
                     await login(values.email, values.password);
                  } catch (error: unknown) {
                     if (error instanceof AxiosError) {
                        const responseData = error.response?.data;
                        const responseMessage = responseData?.detail
                           ? 'Email veya şifre yanlış.'
                           : 'Bir hata oluştu. Lütfen tekrar deneyin.';
                        setMessage(responseMessage);
                     } else setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
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
                     {message && <Alert color={eColors.Rose} text={message} />}
                     {isSubmitting && <LoadSpinner />}
                     <form noValidate onSubmit={handleSubmit} className="space-y-4">
                        <div>
                           <Field
                              id="email"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              placeholder="Email"
                              errorMessage={formikErrors.email}
                           />
                        </div>
                        <div>
                           <Field
                              id="password"
                              type="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              placeholder="Şifre"
                              autoComplete="on"
                              errorMessage={formikErrors.password}
                           />
                           <div className="flex justify-end mt-2">
                              <NavLink
                                 to="/auth/password/reset"
                                 className="text-sm font-medium text-rose-500 hover:underline dark:text-indigo-400"
                              >
                                 Şifreni mi unuttun?
                              </NavLink>
                           </div>
                        </div>
                        <Button text={'Giriş yap'} type="submit" disabled={isSubmitting} />
                     </form>
                  </div>
               )}
            </Formik>
            <p className="text-end text-sm text-gray-500 dark:text-gray-400 my-2">
               Hesabın yok mu ?
               <NavLink
                  to="/register"
                  className="ml-1 font-medium text-rose-500 hover:underline dark:text-indigo-400"
               >
                  Kayıt ol
               </NavLink>
            </p>
         </div>
      </div>
   );
};

export default Login;
