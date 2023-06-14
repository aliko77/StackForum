import Button from 'components/Button';
import { Field } from 'components/Field';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';
import { Toast } from 'utils';
import { object, string } from 'yup';

const validationSchema = object({
   password: string().required('Bu alan zorunlu.'),
   new_email: string().email('Geçersiz email.').required('Bu alan zorunlu.'),
});

const initialValues = {
   password: '',
   new_email: '',
};

const Email: FC = () => {
   const { changeEmail, errors } = useUser();

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">Email Ayarları</p>
            </div>
            <div className="content px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-800">
               <Formik
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={async (values): Promise<void> => {
                     const status = await changeEmail(values);
                     status &&
                        Toast.fire({
                           title: 'Başarıyla değiştirildi.',
                           icon: 'success',
                           timer: 2000,
                        });
                  }}
               >
                  {({
                     errors: formikErrors,
                     handleSubmit,
                     handleChange,
                     values,
                     handleBlur,
                     isSubmitting,
                  }) => (
                     <Form noValidate onSubmit={handleSubmit}>
                        <fieldset id="change_email">
                           <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                 Email Değişikliği
                              </p>
                           </legend>
                           {errors && <FormErrors errors={errors} />}
                           {isSubmitting && <LoadSpinner />}
                           <div className="content space-y-2">
                              <div>
                                 <Field
                                    autoComplete="on"
                                    label="Mevcut Şifre"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Mevcut şifrenizi giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    errorMessage={formikErrors.password}
                                 />
                              </div>
                              <div>
                                 <Field
                                    label="Yeni Email"
                                    type="text"
                                    id="new_email"
                                    name="new_email"
                                    placeholder="Yeni e-mail adresinizi giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.new_email}
                                    errorMessage={formikErrors.new_email}
                                 />
                              </div>
                           </div>
                        </fieldset>
                        <div className="w-full max-w-xs mt-4">
                           <Button type="submit" disabled={isSubmitting}>
                              Değiştir
                           </Button>
                        </div>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Email;
