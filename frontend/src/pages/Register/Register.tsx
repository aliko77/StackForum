import { FC } from 'react';
import Logo from 'components/Logo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert, { eColors } from 'components/Alert';
import { useAuth } from 'hooks/useAuth';
import LoadSpinner from 'components/LoadSpinner';
import Field from 'components/Field';
import Button from 'components/Button';

interface IRegisterFormProp {
   email: string;
   password: string;
   confirmPassword: string;
   first_name: string;
   last_name: string;
}

const initialValues: IRegisterFormProp = {
   email: '',
   password: '',
   confirmPassword: '',
   first_name: '',
   last_name: '',
};

const validationSchema = Yup.object({
   email: Yup.string().email('*').required('*'),
   confirmPassword: Yup.string().required('*'),
   password: Yup.string().required('*'),
   first_name: Yup.string().trim().required('*'),
   last_name: Yup.string().trim().required('*'),
});

const Register: FC = () => {
   const { error, register } = useAuth();
   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo noText />
         </div>
         <div className="border rounded p-3 bg-white dark:text-gray-100 dark:bg-night-200 dark:border-gray-500">
            <div className="flex justify-center mb-3">
               <h1 className="font-semibold font-mono dark:text-gray-100 text-rose-600">
                  Kayıt Ol
               </h1>
            </div>
            <hr className="mb-3" />
            <Formik
               validationSchema={validationSchema}
               initialValues={initialValues}
               onSubmit={async (values: IRegisterFormProp): Promise<void> => {
                  await register(
                     values.email,
                     values.password,
                     values.confirmPassword,
                     values.first_name,
                     values.last_name,
                  );
               }}
            >
               {({
                  errors,
                  isSubmitting,
                  handleSubmit,
                  handleChange,
                  values,
                  handleBlur,
                  touched,
               }) => (
                  <div>
                     {error && <Alert text={error} color={eColors.Indigo} />}
                     {isSubmitting && <LoadSpinner />}
                     <form noValidate onSubmit={handleSubmit} className="space-y-3">
                        <div>
                           <div className="flex space-x-3">
                              <div>
                                 <Field
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first_name}
                                    placeholder="İsim"
                                 />
                                 <p className="text-red-500 dark:text-red-400 text-sm ml-1">
                                    {errors.first_name && touched.first_name && errors.first_name}
                                 </p>
                              </div>
                              <div>
                                 <Field
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last_name}
                                    placeholder="Soyisim"
                                 />
                                 <p className="text-red-500 dark:text-red-400 text-sm ml-1">
                                    {errors.last_name && touched.last_name && errors.last_name}
                                 </p>
                              </div>
                           </div>
                        </div>
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
                        <div>
                           <Field
                              id="confirmPassword"
                              type="password"
                              name="confirmPassword"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmPassword}
                              placeholder="Şifreyi onayla"
                           />
                           <p className="text-red-500 dark:text-red-400 text-sm ml-1">
                              {errors.confirmPassword &&
                                 touched.confirmPassword &&
                                 errors.confirmPassword}
                           </p>
                        </div>
                        <Button text={'Kayıt ol'} type="submit" disabled={isSubmitting} />
                     </form>
                  </div>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default Register;
