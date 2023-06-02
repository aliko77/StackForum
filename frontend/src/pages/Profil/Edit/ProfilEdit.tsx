import { Field } from 'components/Field';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC, useState } from 'react';

import { Formik, Form } from 'formik';
import { Button } from 'components/Button';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { object, string, date } from 'yup';
import { Label } from 'components/Label';
import { useAuth } from 'hooks/useAuth';

interface FormProp {
   dob: string | undefined;
   dob_privacy: string | undefined;
   city: string | undefined;
}

const validationSchema = object({
   dob: date()
      .required('Bu alan zorunludur.')
      .test('date', '15 Yaşından küçükseniz devam edemezsiniz.', (value) => {
         const currentDate = new Date();
         const minDate = new Date();
         const maxDate = new Date();
         minDate.setFullYear(currentDate.getFullYear() - 90);
         maxDate.setFullYear(currentDate.getFullYear() - 15);
         return value >= minDate && value <= maxDate;
      }),
   dob_privacy: string().required('Bu alan zorunludur.').trim(),
   city: string().required('Bu alan zorunludur.'),
});

const ProfilEdit: FC = () => {
   const { user, updateProfile } = useAuth();
   const [errors, setErrors] = useState<null | string[]>(null);

   const initialValues: FormProp = {
      dob: new Date(user?.profile?.dob ?? '1001-01-01').toISOString().split('T')[0],
      dob_privacy: user?.profile?.dob_privacy,
      city: user?.profile?.city,
   };

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
               onSubmit={async (values): Promise<void> => {
                  setErrors(null);
                  updateProfile(values);
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
                                    readOnly
                                    disabled
                                    label="Kullanıcı Adı"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Kullanıcı adınızı giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={user?.username}
                                 />
                              </div>
                           </fieldset>
                           <fieldset id="dob">
                              <legend className="w-full">
                                 <div className="mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                       Doğum Günü
                                    </p>
                                 </div>
                              </legend>
                              <div className="ml-4 mb-4">
                                 <Field
                                    label="Doğum Tarihi"
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    placeholder="Doğum tarihinizi giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dob}
                                    errorMessage={formikErrors.dob}
                                 />
                              </div>
                              <div className="ml-4">
                                 <Label htmlFor="dob_privacy">Gizlilik</Label>
                                 <select
                                    id="dob_privacy"
                                    className="w-full outline-none text-sm p-1.5 bg-gray-50 dark:bg-gray-700 border rounded-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-rose-500 focus:border-rose-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dob_privacy}
                                 >
                                    <option value="none">Yaşı ve doğum tarihini gösterme</option>
                                    <option value="age">Sadece yaşı göster</option>
                                    <option value="month_day">Sadece ay ve günü göster</option>
                                    <option value="show">Yaşı ve doğum tarihini göster</option>
                                 </select>
                              </div>
                           </fieldset>
                           <fieldset id="city">
                              <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                 <p className="font-medium text-gray-900 dark:text-gray-100">
                                    Şehir
                                 </p>
                              </legend>
                              <div className="ml-4">
                                 <Field
                                    label="Bulunduğunuz Şehri / Bölgeyi yazınız."
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="İstanbul/Avrupa"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    errorMessage={formikErrors.city}
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
