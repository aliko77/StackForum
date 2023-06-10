import { Field } from 'components/Field';
import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'components/Button';
import { FormErrors } from 'components/FormErrors';
import { object, string, date } from 'yup';
import { Label } from 'components/Label';
import { useAuth } from 'hooks/useAuth';
import { ProfileProps } from 'types';
import useUser from 'hooks/useUser';
import { Toast } from 'utils';
import { NavLink } from 'react-router-dom';

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
   const { user } = useAuth();
   const { updateProfile, errors } = useUser();

   const initialValues: ProfileProps = {
      dob: user?.profile?.dob,
      dob_privacy: user?.profile?.dob_privacy,
      city: user?.profile?.city,
      twitter_url: user?.profile?.twitter_url,
      github_url: user?.profile?.github_url,
      email_secondary: user?.profile?.email_secondary,
      phone_number: user?.profile?.phone_number,
      profession: user?.profile?.profession,
      hobbies: user?.profile?.hobbies,
      about: user?.profile?.about,
   };

   return (
      <ControlPanelLayout>
         <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={async (values): Promise<void> => {
               const status = await updateProfile(values);
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
               <>
                  <Form noValidate onSubmit={handleSubmit}>
                     <div className="w-full mb-4">
                        <div className="bg-night-200 dark:bg-night-300 p-2 rounded-t">
                           <p className="text-base font-semibold tracking-wide text-gray-100">
                              Zorunlu Bilgiler
                           </p>
                        </div>
                        {errors && <FormErrors errors={errors} />}
                        <div className="px-4 py-4 bg-gray-200 dark:bg-night-200">
                           <div className="mb-4">
                              <fieldset id="email-password">
                                 <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                       Şifre Değişikliği
                                    </p>
                                 </legend>
                                 <div className="ml-4">
                                    <p className="text-gray-700 dark:text-gray-300">
                                       Şifrenizi değiştirmek için{' '}
                                       <NavLink to="/ayarlar/sifre/">
                                          <span className="underline text-gray-900 dark:text-gray-100">
                                             tıklayın.
                                          </span>
                                       </NavLink>
                                    </p>
                                 </div>
                              </fieldset>
                           </div>
                           <div className="mb-4">
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
                           </div>
                           <div className="mb-4">
                              <fieldset id="dob">
                                 <legend className="w-full">
                                    <div className="mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                       <p className="font-medium text-gray-900 dark:text-gray-100">
                                          Doğum Günü
                                       </p>
                                    </div>
                                 </legend>
                                 <div className="mb-4">
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
                                 <div className="mb-4">
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
                           </div>
                           <div className="mb-4">
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
                        </div>
                     </div>
                     <div className="w-full">
                        <div className="bg-night-200 dark:bg-night-300 p-2 rounded-t">
                           <p className="text-base font-semibold tracking-wide text-gray-100">
                              Genel Bilgiler - Bu bilgiler diğer forum üyeleri ile paylaşılır.
                           </p>
                        </div>
                        <div className="px-4 py-4 bg-gray-200 dark:bg-night-200">
                           <div className="mb-4">
                              <fieldset id="social-accounts">
                                 <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                       Sosyal Medya Hesapları
                                    </p>
                                 </legend>
                                 <div className="ml-4">
                                    <div className="grid gap-6 md:grid-cols-2">
                                       <Field
                                          label="Twitter URL"
                                          type="text"
                                          id="twitter_url"
                                          name="twitter_url"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.twitter_url}
                                          errorMessage={formikErrors.twitter_url}
                                       />
                                       <Field
                                          label="Github URL"
                                          type="text"
                                          id="github_url"
                                          name="github_url"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.github_url}
                                          errorMessage={formikErrors.github_url}
                                       />
                                    </div>
                                 </div>
                              </fieldset>
                           </div>
                           <div className="mb-4">
                              <fieldset id="personal_information">
                                 <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                       Kişisel Bilgiler
                                    </p>
                                 </legend>
                                 <div className="ml-4">
                                    <div className="mb-4">
                                       <Field
                                          label="İletişim Maili"
                                          type="text"
                                          id="email_secondary"
                                          name="email_secondary"
                                          placeholder="email@mail.com"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.email_secondary}
                                       />
                                    </div>
                                    <div className="mb-4">
                                       <Field
                                          label="Meslek"
                                          type="text"
                                          id="profession"
                                          name="profession"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.profession}
                                       />
                                    </div>
                                    <div className="mb-4">
                                       <Field
                                          label="Telefon Numarası"
                                          type="text"
                                          id="phone_number"
                                          name="phone_number"
                                          placeholder="555 555 55 55"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.phone_number}
                                       />
                                    </div>
                                    <div className="mb-4">
                                       <Field
                                          label="Hobileriniz"
                                          type="text"
                                          id="hobbies"
                                          name="hobbies"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.hobbies}
                                       />
                                    </div>
                                    <div>
                                       <Label htmlFor="about">Hakkımda</Label>
                                       <textarea
                                          id="about"
                                          name="about"
                                          rows={4}
                                          className="block w-full p-1.5 outline-none disabled:bg-gray-300 disabled:dark:bg-gray-800 bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 rounded-sm focus:ring-rose-500 focus:border-rose-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 placeholder:text-sm"
                                          placeholder="..."
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.about}
                                       ></textarea>
                                    </div>
                                 </div>
                              </fieldset>
                           </div>
                        </div>
                     </div>
                     <div className="w-full max-w-xs mx-auto mt-4 float-right">
                        <Button type="submit" text="Kaydet" disabled={isSubmitting} />
                     </div>
                  </Form>
               </>
            )}
         </Formik>
      </ControlPanelLayout>
   );
};

export default ProfilEdit;
