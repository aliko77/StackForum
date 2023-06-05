import { Button } from 'components/Button';
import { FormErrors } from 'components/FormErrors';
import { Form, Formik } from 'formik';
import { useAuth } from 'hooks/useAuth';
import useUser from 'hooks/useUser';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';
import { Toast } from 'utils';
import { object, string } from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const validationSchema = object({
   signature: string().required('Bu alan zorunlu.').max(120),
});

export const Signature: FC = () => {
   const { user } = useAuth();
   const { errors } = useUser();

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
                     console.log(values);

                     const status = true;
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
                     <Form noValidate onSubmit={handleSubmit}>
                        <fieldset id="change_signature">
                           <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                 İmza Değişikliği
                              </p>
                           </legend>
                           {errors && <FormErrors errors={errors} />}
                           <div className="content space-y-2">
                              <div>
                                 <ReactQuill
                                    id="signature"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.signature}
                                    theme="snow"
                                 />
                              </div>
                           </div>
                        </fieldset>
                        <div className="w-full max-w-xs mt-4">
                           <Button type="submit" text="Kaydet" disabled={isSubmitting} />
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
