import { FC, useState } from 'react';
import { Formik } from 'formik';
import { object, string, ref } from 'yup';
import { useAuth } from 'hooks/useAuth';
import { AxiosError } from 'axios';
import { Logo } from 'components/Logo';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { NavLink } from 'react-router-dom';

interface RegisterFormProp {
   email: string;
   password: string;
   confirmPassword: string;
   first_name: string;
   last_name: string;
}

const initialValues: RegisterFormProp = {
   email: '',
   password: '',
   confirmPassword: '',
   first_name: '',
   last_name: '',
};

const validationSchema = object({
   email: string().email('*').required('*'),
   password: string()
      .required('*')
      .min(8, 'Şifreniz en az 8 karakter olmalıdır.')
      .max(128, 'En fazla 128 karakter.'),
   confirmPassword: string()
      .required('*')
      .oneOf([ref('password')], 'Şifreler eşleşmiyor.'),
   first_name: string().trim().required('*'),
   last_name: string().trim().required('*'),
});

const Register: FC = () => {
   const { register } = useAuth();
   const [errors, setErrors] = useState<null | string[]>(null);

   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo />
         </div>
         <div className="border rounded px-3 pt-3 bg-white dark:text-gray-100 dark:bg-night-200 dark:border-gray-500">
            <div className="flex justify-center mb-3">
               <h1 className="font-semibold font-mono dark:text-gray-100 text-rose-600">
                  Kayıt Ol
               </h1>
            </div>
            <hr className="mb-3" />
            <Formik
               validationSchema={validationSchema}
               initialValues={initialValues}
               onSubmit={async (values: RegisterFormProp): Promise<void> => {
                  setErrors(null);
                  try {
                     await register(
                        values.email,
                        values.password,
                        values.confirmPassword,
                        values.first_name,
                        values.last_name,
                     );
                  } catch (error: unknown) {
                     if (error instanceof AxiosError) {
                        const responseErrors = error.response?.data as string[];
                        setErrors(responseErrors);
                     } else setErrors(['Bir hata oluştu. Lütfen tekrar deneyiniz.']);
                  }
               }}
            >
               {({
                  errors: formikErrors,
                  isSubmitting,
                  handleSubmit,
                  handleChange,
                  values,
                  handleBlur,
               }) => (
                  <div>
                     {errors && <FormErrors errors={errors} />}
                     {isSubmitting && <LoadSpinner />}
                     <form noValidate onSubmit={handleSubmit} className="space-y-4">
                        <div>
                           <div className="flex space-x-3">
                              <div>
                                 <Field
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    placeholder="İsim"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.first_name}
                                    errorMessage={formikErrors.first_name}
                                 />
                              </div>
                              <div>
                                 <Field
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    placeholder="Soyisim"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.last_name}
                                    errorMessage={formikErrors.last_name}
                                 />
                              </div>
                           </div>
                        </div>
                        <div>
                           <Field
                              id="email"
                              type="email"
                              name="email"
                              placeholder="Email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              errorMessage={formikErrors.email}
                           />
                        </div>
                        <div>
                           <Field
                              id="password"
                              type="password"
                              name="password"
                              placeholder="Şifre"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              errorMessage={formikErrors.password}
                           />
                        </div>
                        <div>
                           <Field
                              id="confirmPassword"
                              type="password"
                              name="confirmPassword"
                              placeholder="Şifreyi onayla"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmPassword}
                              errorMessage={formikErrors.confirmPassword}
                           />
                        </div>
                        <Button text={'Kayıt ol'} type="submit" disabled={isSubmitting} />
                     </form>
                  </div>
               )}
            </Formik>
            <p className="text-end text-sm text-gray-500 dark:text-gray-400 my-2">
               Bir hesabın var mı ?
               <NavLink
                  to="/login"
                  className="ml-1 font-medium text-rose-500 hover:underline dark:text-indigo-400"
               >
                  Giriş yap
               </NavLink>
            </p>
         </div>
      </div>
   );
};

export default Register;
