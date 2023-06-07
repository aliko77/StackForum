import { FC } from 'react';
import ControlPanelLayout from 'layouts/ControlPanel';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import useUser from 'hooks/useUser';
import { Toast } from 'utils';
import { FormErrors } from 'components/FormErrors';

const Blocked: FC = () => {
   const { blockUserByUsername, errors } = useUser();

   const validationSchema = object({
      username: string().required('Bu alan zorunludur.'),
   });

   const initialValues = {
      username: '',
   };

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Engellenen Kullanıcılar
               </p>
            </div>
            <div className="content px-4 py-4 bg-gray-200 dark:bg-night-200">
               {errors && (
                  <div>
                     <FormErrors errors={errors} />
                  </div>
               )}
               <div className="mb-8">
                  <Formik
                     validationSchema={validationSchema}
                     initialValues={initialValues}
                     onSubmit={async (values): Promise<void> => {
                        const status = await blockUserByUsername(values);
                        status &&
                           Toast.fire({
                              title: 'Kullanıcı bloklandı.',
                              icon: 'success',
                              timer: 2000,
                           });
                     }}
                  >
                     {({
                        handleSubmit,
                        values,
                        handleChange,
                        handleBlur,
                        errors: formikErrors,
                     }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                           <fieldset id="block_user">
                              <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                 <p className="font-medium text-gray-900 dark:text-gray-100">
                                    Kullanıcıyı Blokla
                                 </p>
                              </legend>
                              <div className="ml-4">
                                 <Field
                                    label="Kullanıcı"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Kullanıcı adı giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    errorMessage={formikErrors.username}
                                 />
                                 <div className="mt-4">
                                    <div className="w-full sm:max-w-[8rem]">
                                       <Button type="submit" text="Blokla" />
                                    </div>
                                 </div>
                              </div>
                           </fieldset>
                        </Form>
                     )}
                  </Formik>
               </div>
               <div id="blocked_users">
                  <div className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">Bloklananlar</p>
                  </div>
                  <div className="content ml-4">
                     <p className="text-gray-900 dark:text-gray-100">#</p>
                  </div>
               </div>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Blocked;
