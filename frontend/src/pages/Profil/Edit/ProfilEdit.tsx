import { Field } from 'components/Field';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';

import { Formik, Form } from 'formik';
import { Button } from 'components/Button';

interface FormProp {
   [key: string]: string;
}

const ProfilEdit: FC = () => {
   const initialValues: FormProp = {};

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Zorunlu Bilgiler
               </p>
            </div>
            <Formik
               initialValues={initialValues}
               onSubmit={(values, actions) => {
                  console.log(values);
                  actions.setSubmitting(false);
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
                  <Form>
                     <div className="content px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-200">
                        <fieldset id="email-password">
                           <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                 Email & Şifre
                              </p>
                           </legend>
                           <div className="content ml-4">
                              <p className="text-gray-900 dark:text-gray-100">
                                 Email ve şifre değiştirmek için{' '}
                                 <span className="underline">tıklayın.</span>
                              </p>
                           </div>
                        </fieldset>
                        <fieldset id="username">
                           <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                 Kullanıcı Adı
                              </p>
                           </legend>
                           <div className="ml-4">
                              <Field
                                 label="Kullanıcı Adı"
                                 type="text"
                                 id="username"
                                 name="username"
                                 placeholder="Kullanıcı adını giriniz."
                                 required
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.first_name}
                                 errorMessage={formikErrors.}
                              />
                           </div>
                        </fieldset>
                        <fieldset id="b-day">
                           <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                 Doğum Günü
                              </p>
                           </legend>
                           <div className="ml-4">
                              <Field
                                 label="Doğum Tarihi"
                                 type="date"
                                 id="b-day"
                                 name="b-day"
                                 placeholder="Doğum gününüzü giriniz."
                              />
                           </div>
                        </fieldset>
                     </div>
                     <div className="w-full max-w-xs mx-auto mt-4 float-right">
                        <Button type="submit" text="Kaydet" />
                     </div>
                  </Form>
               )}
            </Formik>
         </div>
      </ControlPanelLayout>
   );
};

export default ProfilEdit;
