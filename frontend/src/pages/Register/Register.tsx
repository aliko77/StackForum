import {FC} from 'react';
import Logo from 'components/Logo';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Alert, {eColors} from 'components/Alert';
import {useAuth} from 'hooks/useAuth';
import LoadSpinner from 'components/LoadSpinner';
import Field from 'components/Field';
import Button from 'components/Button';

interface IRegisterFormProp {
   email: string;
   password: string;
   confirmPassword: string;
   name: string;
   surname: string;
}

const initialValues: IRegisterFormProp = {
   email: '',
   password: '',
   confirmPassword: '',
   name: '',
   surname: '',
};

const validationSchema = Yup.object({
   email: Yup.string().email('*').required('*'),
   confirmPassword: Yup.string().required('*'),
   password: Yup.string().required('*'),
   name: Yup.string().trim().required('*'),
   surname: Yup.string().trim().required('*'),
});

const Register: FC = () => {
   const {error} = useAuth();
   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo noText/>
         </div>
         <div
            className="border rounded p-3 bg-white dark:text-gray-100 dark:bg-night-200 dark:border-gray-500">
            <div className="flex justify-center mb-3">
               <h1 className="font-semibold font-mono dark:text-gray-100 text-rose-600">
                  Kayıt Ol
               </h1>
            </div>
            <hr className="mb-3"/>
            <Formik
               validationSchema={validationSchema}
               initialValues={initialValues}
               onSubmit={async (values: IRegisterFormProp): Promise<void> => {
                  console.log(values);
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
                     {error && <Alert text={error} color={eColors.Indigo}/>}
                     {isSubmitting && <LoadSpinner/>}
                     <form noValidate onSubmit={handleSubmit} className="space-y-3">
                        <div>
                           <div className="flex space-x-3">
                              <div>
                                 <Field
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="İsim"
                                 />
                                 <p className="text-red-500 dark:text-red-400 text-sm ml-1">
                                    {errors.name && touched.name && errors.name}
                                 </p>
                              </div>
                              <div>
                                 <Field
                                    id="surname"
                                    type="text"
                                    name="surname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.surname}
                                    placeholder="Soyisim"
                                 />
                                 <p className="text-red-500 dark:text-red-400 text-sm ml-1">
                                    {errors.surname && touched.surname && errors.surname}
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
                        <Button text={'Kayıt ol'} type="submit" disabled={isSubmitting}/>
                     </form>
                  </div>
               )}
            </Formik>
         </div>
      </div>
   );
};

export default Register;
