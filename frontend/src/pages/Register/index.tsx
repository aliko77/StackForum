import { FC, useEffect } from 'react';
import { Formik } from 'formik';
import { object, string, ref } from 'yup';
import { Logo } from 'components/Logo';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import Button from 'components/Button';
import { Field } from 'components/Field';
import { NavLink, useNavigate } from 'react-router-dom';
import useUser from 'hooks/useUser';
import { useAuth } from 'hooks/useAuth';

type RegisterFormProps = {
   username: string;
   email: string;
   password: string;
   confirm_password: string;
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
   confirm_password: string()
      .required('*')
      .oneOf([ref('password')], 'Şifreler eşleşmiyor.'),
});

const initialValues: RegisterFormProps = {
   username: '',
   email: '',
   password: '',
   confirm_password: '',
};

const Register: FC = () => {
   const { accessToken, user } = useAuth();
   const { register, errors } = useUser();
   const navigate = useNavigate();

   useEffect(() => {
      if (accessToken || user) {
         navigate('/');
      }
   }, []);

   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo />
         </div>
         <div className="border rounded-sm px-3 pt-3 bg-white dark:text-gray-100 dark:bg-night-900 dark:border-gray-500">
            <div className="mb-3">
               <h1 className="font-semibold text-secondary-500 dark:text-primary-400">Kayıt Ol</h1>
            </div>
            <Formik
               validationSchema={validationSchema}
               initialValues={initialValues}
               onSubmit={async (values: RegisterFormProps): Promise<void> => {
                  const status = await register(values);
                  if (status) {
                     navigate('/login/?registered');
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
                              id="confirm_password"
                              type="password"
                              name="confirm_password"
                              placeholder="Şifreyi onayla"
                              autoComplete="on"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirm_password}
                              errorMessage={formikErrors.confirm_password}
                           />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                           Kayıt Ol
                        </Button>
                     </form>
                  </div>
               )}
            </Formik>
            <p className="text-end text-sm text-gray-500 dark:text-gray-400 my-2">
               Bir hesabın var mı ?
               <NavLink
                  to="/login/"
                  className="ml-1 font-medium text-secondary-500 hover:underline dark:text-primary-400"
               >
                  Giriş yap
               </NavLink>
            </p>
         </div>
      </div>
   );
};

export default Register;
