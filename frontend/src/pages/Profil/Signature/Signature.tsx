import { Button } from 'components/Button';
import { FormErrors } from 'components/FormErrors';
import { Form, Formik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { Toast } from 'utils';
import { object, string } from 'yup';
import useUser from 'hooks/useUser';
import ControlPanelLayout from 'layouts/ControlPanel';
import { Textarea } from 'components/Textarea';

export const Signature: FC = () => {
   const { user } = useAuth();
   const { errors, updateSignature } = useUser();

   const validationSchema = object({
      signature: string().max(120),
   });

   const initialValues = {
      signature: user?.profile?.signature,
   };

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">İmza Ayarları</p>
            </div>
            <div className="content px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-200">
               <Formik
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={async (values): Promise<void> => {
                     const status = await updateSignature(values);
                     status &&
                        Toast.fire({
                           title: 'Başarıyla kaydedildi.',
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
                     <Form noValidate onSubmit={handleSubmit} className="space-y-4">
                        <fieldset id="change_signature">
                           <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                 İmza Değişikliği
                              </p>
                           </legend>
                           {errors && <FormErrors errors={errors} />}
                           <div className="content space-y-2">
                              <div>
                                 <Textarea
                                    id="signature"
                                    name="signature"
                                    rows={10}
                                    placeholder='İmzanı düzenle...'
                                    defaultValue={values.signature}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorMessage={formikErrors.signature}
                                 />
                              </div>
                           </div>
                        </fieldset>
                        <div className="w-full max-w-xs">
                           <Button type="submit" text="Kaydet" disabled={isSubmitting} />
                        </div>
                        <div id="signature-info">
                           <div className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                 İmza Hakkında
                              </p>
                           </div>
                           <div className="content ml-2">
                              <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside dark:text-gray-400">
                                 <li>Maksimum 120 Karakter.</li>
                                 <li>Maksimum 3 Satır.</li>
                                 <li>Maksimum 1 Link.</li>
                              </ul>
                           </div>
                        </div>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Signature;
