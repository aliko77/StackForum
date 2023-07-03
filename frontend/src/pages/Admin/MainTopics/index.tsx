import Button from 'components/Button';
import { Field } from 'components/Field';
import { FormErrors } from 'components/FormErrors';
import { Form, Formik } from 'formik';
import { useMainTopics } from 'hooks/Admin/useMainTopics';
import AdminPanel from 'layouts/AdminPanel';
import { FC, useState } from 'react';
import { Toast } from 'utils';
import { object, string } from 'yup';

const MainTopics: FC = () => {
   const { errors, loading } = useMainTopics();
   const [topics, setTopics] = useState<object>({});

   const validationSchema = object({
      topic_header: string().required('Bu alan zorunludur.'),
   });

   const initialValues = {
      topic_header: '',
   };

   return (
      <>
         <AdminPanel>
            <div className="bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Ana Konu Başlıkları
               </p>
            </div>
            <div className="p-4 bg-gray-200 dark:bg-night-800">
               {errors && (
                  <div>
                     <FormErrors errors={errors} />
                  </div>
               )}
               <div>
                  <Formik
                     initialValues={initialValues}
                     validationSchema={validationSchema}
                     onSubmit={async (values, { resetForm }) => {
                        console.log(values);

                        resetForm();
                        Toast.fire({
                           title: `Konu Başlığı Eklendi`,
                           icon: 'success',
                           timer: 2000,
                        });
                     }}
                  >
                     {({
                        values,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        errors: formikErrors,
                     }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                           <fieldset id="main-topics">
                              <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                 <p className="font-medium text-gray-900 dark:text-gray-100">
                                    Yeni Konu Başlığı Ekle
                                 </p>
                              </legend>
                              <div className="ml-4">
                                 <Field
                                    label="Konu Başlığı"
                                    type="text"
                                    id="topic_header"
                                    name="topic_header"
                                    placeholder="Konu başlığını giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.topic_header}
                                    errorMessage={formikErrors.topic_header}
                                 />
                                 <div className="mt-4">
                                    <div className="w-full sm:max-w-[8rem]">
                                       <Button type="submit">Kaydet</Button>
                                    </div>
                                 </div>
                              </div>
                           </fieldset>
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>
         </AdminPanel>
      </>
   );
};

export default MainTopics;
