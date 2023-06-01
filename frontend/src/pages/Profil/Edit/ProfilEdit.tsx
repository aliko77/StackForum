import { Field } from 'components/Field';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC, useState } from 'react';

import { Formik, Form } from 'formik';
import { Button } from 'components/Button';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { object, string, date } from 'yup';
import { differenceInYears } from 'date-fns';

interface FormProp {
   username: string;
   dob: Date;
}

const initialValues: FormProp = {
   username: '',
   dob: new Date(),
};

const validationSchema = object({
   username: string().required('Bu alan zorunludur.').min(3).max(32),
   dob: date()
      .typeError('Değer bir tarih olmalıdır (YYYY-AA-GG)')
      .required('Bu alan zorunludur.')
      .test('dob', '15 Yaşından küçükler kayıt olamaz.', function (value) {
         return differenceInYears(new Date(), new Date(value)) >= 18;
      }),
});

const ProfilEdit: FC = () => {
   const [errors, setErrors] = useState<null | string[]>(null);

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Zorunlu Bilgiler
               </p>
            </div>
            <Formik
               validationSchema={validationSchema}
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
                  <>
                     {errors && <FormErrors errors={errors} />}
                     {isSubmitting && <LoadSpinner />}
                     <Form noValidate onSubmit={handleSubmit}>
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
                                    placeholder="Kullanıcı adınızı giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    errorMessage={formikErrors.username}
                                 />
                              </div>
                           </fieldset>
                           <fieldset id="dob">
                              <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                 <p className="font-medium text-gray-900 dark:text-gray-100">
                                    Doğum Günü
                                 </p>
                              </legend>
                              <div className="ml-4">
                                 <Field
                                    label="Doğum Tarihi"
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    placeholder="Doğum tarihinizi giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dob.toString()}
                                 />
                              </div>
                           </fieldset>
                        </div>
                        <div className="w-full max-w-xs mx-auto mt-4 float-right">
                           <Button type="submit" text="Kaydet" />
                        </div>
                     </Form>
                  </>
               )}
            </Formik>
         </div>
      </ControlPanelLayout>
   );
};

export default ProfilEdit;
