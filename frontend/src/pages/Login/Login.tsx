import Button from 'components/Button';
import Field from 'components/Field';
import Logo from 'components/Logo';
import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from 'hooks/useAuth';
import LoadSpinner from 'components/LoadSpinner';
import { FC } from 'react';
import FormMessages from 'components/FormMessages';

interface ILoginFormProp {
   email: string;
   password: string;
}

const InitialState: ILoginFormProp = {
   email: '',
   password: '',
};

const validationSchema = Yup.object({
   email: Yup.string().email('*').required('*'),
   password: Yup.string().required('*'),
});

const Login: FC = () => {
   const { login, message } = useAuth();

   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo noText noRedirect />
         </div>
         <div className="border rounded p-3 pt-5 bg-white dark:text-gray-100 dark:bg-night-200 dark:border-gray-500">
            <Formik
               validationSchema={validationSchema}
               initialValues={InitialState}
               onSubmit={async (values) => {
                  await login(values.email, values.password);
               }}
            >
               {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
               }) => (
                  <div>
                     {message && <FormMessages errors={message} />}
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
                              {errors.email && touched.email && errors.email}
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
                              {errors.password && touched.password && errors.password}
                           </p>
                        </div>
                        <div className="flex justify-end">
                           <NavLink
                              to="/forgot-password"
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
