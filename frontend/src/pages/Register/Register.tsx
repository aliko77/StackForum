import { FC, useState } from 'react';
import { Formik } from 'formik';
import { object, string, ref } from 'yup';
import { AxiosError } from 'axios';
import { Logo } from 'components/Logo';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { NavLink } from 'react-router-dom';
import { Alert } from 'components/Alert';
import useUser from 'hooks/useUser';

type RegisterFormProps = {
   username: string;
   email: string;
   password: string;
   confirmPassword: string;
};

const validationSchema = object({
   username: string()
      .required('*')
      .matches(
         /^(?!.*[-_.]{2})[a-zA-Z0-9_.çÇğĞıİöÖşŞüÜ-]+$/,
         'Sadece "_" ve "." işaretlerine izin verilmektedir ve ard arda kullanılamaz.',
      )
      .min(3, 'En az 3 haneli olmalı.')
      .max(32, 'En fazla 32 haneli olmalı.'),
   email: string().email('*').required('*').lowercase(),
   password: string()
      .required('*')
      .min(8, 'Şifreniz en az 8 karakter olmalıdır.')
      .max(128, 'En fazla 128 karakter.'),
   confirmPassword: string()
      .required('*')
      .oneOf([ref('password')], 'Şifreler eşleşmiyor.'),
});

const initialValues: RegisterFormProps = {
   username: '',
   email: '',
   password: '',
   confirmPassword: '',
};

const Register: FC = () => {
   const { register } = useUser();
   const [message, setMessage] = useState<null | string>(null);
   const [errors, setErrors] = useState<null | string[]>(null);

   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo />
         </div>
         <div className="border rounded-sm px-3 pt-3 bg-white dark:text-gray-100 dark:bg-night-200 dark:border-gray-500">
            <div className="flex justify-center mb-3">
               <h1 className="font-semibold font-mono dark:text-gray-100 text-rose-600">
                  Kayıt Ol
               </h1>
            </div>
            <hr className="mb-3" />
            <Formik
               validationSchema={validationSchema}
               initialValues={initialValues}
               onSubmit={async (values: RegisterFormProps, { resetForm }): Promise<void> => {
                  setErrors(null);
                  try {
                     const status = await register(
                        values.username,
                        values.email,
                        values.password,
                        values.confirmPassword,
                     );
                     if (status) {
                        setMessage('Başarıyla kayıt oldunuz.');
                        resetForm();
                     } else setErrors(['Bir hata oluştu.']);
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
                     {message && <Alert text={message} />}
                     {isSubmitting && <LoadSpinner />}
                     <form noValidate onSubmit={handleSubmit} className="space-y-4">
                        <div>
                           <Field
                              id="username"
                              type="text"
                              name="username"
                              placeholder="Kullanıcı adı"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                              errorMessage={formikErrors.username}
                           />
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
                              autoComplete="on"
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
                              autoComplete="on"
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
