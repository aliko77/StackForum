import { FC, useRef, useState } from 'react';
import Logo from 'components/logo';
import Label from 'components/label';
import TextInput from 'components/text-input';
import Button from 'components/button';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth, { LoginProp } from 'hooks/useAuth';
import { t } from 'i18next';

const validationSchema = Yup.object({
   email: Yup.string().email('Geçersiz e-mail adresi').required('*'),
   password: Yup.string().required('*'),
});

const INITIAL_VALUES = {
   email: '',
   password: '',
};

const Login: FC = () => {
   const errRef = useRef<HTMLParagraphElement>(null);
   const [errMsg, setErrMsg] = useState<string | null>(null);
   const { login } = useAuth();

   const { handleSubmit, handleChange, values, errors } = useFormik<LoginProp>({
      initialValues: INITIAL_VALUES,
      validationSchema,
      onSubmit: async (values: LoginProp) => {
         try {
            await login(values);
         } catch (error: any) {
            console.log(error);
            setErrMsg(error);
         }
      },
   });

   return (
      <div className="mx-auto w-full max-w-sm p-3 sm:my-20 my-10">
         <div className="flex items-center justify-center mb-4">
            <Logo noText />
         </div>
         <div className="border rounded p-3 bg-white dark:text-gray-100 dark:bg-night-e dark:border-gray-500">
            {errMsg && <p ref={errRef}>{errMsg}</p>}
            <div>
               {}
               <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                     <Label htmlFor="email" value="Email" />
                     <TextInput
                        id={'email'}
                        type={'email'}
                        placeholder={'name@stack.com'}
                        required={true}
                        onChange={handleChange}
                        value={values.email}
                        autoComplete="on"
                     />
                     <span className="text-red-500 text-sm">{errors.email ?? null}</span>
                  </div>
                  <div className="mb-3">
                     <Label htmlFor="password" value="Şifre" />
                     <TextInput
                        id={'password'}
                        type={'password'}
                        placeholder={'•••••••••'}
                        required={true}
                        onChange={handleChange}
                        value={values.password}
                     />
                     <span className="text-red-500 text-sm">{errors.password ?? null}</span>
                  </div>
                  <div className="flex justify-end mb-3">
                     <NavLink
                        to="/forgot-password"
                        className="text-sm font-medium text-rose-400 hover:underline dark:text-indigo-500"
                     >
                        Şifreni mi unuttun?
                     </NavLink>
                  </div>
                  <div>
                     <Button
                        text={'Giriş yap'}
                        sClass="w-full bg-rose-500 hover:bg-rose-600 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        type="submit"
                     />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
