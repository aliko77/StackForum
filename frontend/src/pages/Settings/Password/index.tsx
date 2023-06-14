import Button from 'components/Button';
import { Field } from 'components/Field';
import { FormErrors } from 'components/FormErrors';
import { Form, Formik } from 'formik';
import useUser from 'hooks/useUser';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';
import { Toast } from 'utils';
import { object, ref, string } from 'yup';

const validationSchema = object({
   password: string().required('Bu alan zorunlu.'),
   new_password: string()
      .required('Bu alan zorunlu.')
      .min(8, 'Şifreniz en az 8 karakter olmalıdır.')
      .max(128, 'En fazla 128 karakter.'),
   new_confirm_password: string()
      .required('Bu alan zorunlu.')
      .oneOf([ref('new_password')], 'Yeni şifreler eşleşmiyor.'),
});

const initialValues = {
   password: '',
   new_password: '',
   new_confirm_password: '',
};

const Password: FC = () => {
   const { changePassword, errors } = useUser();

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">Şifre Ayarları</p>
            </div>
            <div className="content px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-800">
               <Formik
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={async (values): Promise<void> => {
                     const status = await changePassword(values);
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
                        <fieldset id="change_password">
                           <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                 Şifre Değişikliği
                              </p>
                           </legend>
                           {errors && <FormErrors errors={errors} />}
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
                                    autoComplete="on"
                                    label="Yeni Şifre"
                                    type="password"
                                    id="new_password"
                                    name="new_password"
                                    placeholder="Yeni şifrenizi giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.new_password}
                                    errorMessage={formikErrors.new_password}
                                 />
                              </div>
                              <div>
                                 <Field
                                    autoComplete="on"
                                    label="Yeni Şifreyi Onayla"
                                    type="password"
                                    id="new_confirm_password"
                                    name="new_confirm_password"
                                    placeholder="Yeni şifrenizi onaylayın."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.new_confirm_password}
                                    errorMessage={formikErrors.new_confirm_password}
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

export default Password;
