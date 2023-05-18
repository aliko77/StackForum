import Button from 'components/Button';
import Field from 'components/Field';
import Logo from 'components/Logo';
import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import { object, string } from 'yup';
import { useAuth } from 'hooks/useAuth';
import LoadSpinner from 'components/LoadSpinner';
import { FC, useState } from 'react';
import Alert, { eColors } from 'components/Alert/Alert';
import { AxiosError } from 'axios';

interface ILoginFormProp {
   email: string;
   password: string;
}

const InitialState: ILoginFormProp = {
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
         <div className="border rounded p-3 pt-5 bg-white dark:text-gray-100 dark:bg-night-200 dark:border-gray-500">
            <Formik
               validationSchema={validationSchema}
               initialValues={InitialState}
               onSubmit={async (values) => {
                  setMessage(null);
                  await login(values.email, values.password).catch((error: AxiosError) => {
                     const responseData = error.response?.data as { detail: string };
                     const responseMessage = responseData?.detail
                        ? 'Email veya şifre yanlış.'
                        : 'Bir hata oluştu. Lütfen tekrar deneyin.';
                     setMessage(responseMessage);
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
                     {message && <Alert color={eColors.Rose} text={message} />}
                     {isSubmitting && <LoadSpinner />}
                     <form noValidate onSubmit={handleSubmit} className="space-y-3">
                        <div>
                           <Field
                              id="email"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              placeholder="Email"
                           />
                           <p className="text-red-500 dark:text-red-400 text-sm ml-1">
                              {formikErrors.email && touched.email && formikErrors.email}
                           </p>
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
                           />
                           <p className="text-red-500 dark:text-red-400 text-sm ml-1">
                              {formikErrors.password && touched.password && formikErrors.password}
                           </p>
                        </div>
                        <div className="flex justify-end">
                           <NavLink
                              to="/auth/password/reset"
                              className="text-sm font-medium text-rose-400 hover:underline dark:text-indigo-500"
                           >
                              Şifreni mi unuttun?
                           </NavLink>
                        </div>
                        <Button text={'Giriş yap'} type="submit" disabled={isSubmitting} />
                     </form>
                  </div>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default Login;
