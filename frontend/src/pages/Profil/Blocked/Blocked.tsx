import { FC, useEffect, useState } from 'react';
import ControlPanelLayout from 'layouts/ControlPanel';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import useUser from 'hooks/useUser';
import { Toast } from 'utils';
import { FormErrors } from 'components/FormErrors';
import { BlockedUsersProps } from 'types';
import { LoadSpinner } from 'components/LoadSpinner';

const Blocked: FC = () => {
   const { blockUserByUsername, getBlockedUsers, errors } = useUser();
   const [ready, setReady] = useState<boolean>(false);
   const [records, setRecords] = useState<BlockedUsersProps>([]);

   const validationSchema = object({
      username: string().required('Bu alan zorunludur.'),
   });

   const initialValues = {
      username: '',
   };

   useEffect(() => {
      const fetchBlockesdsers = async () => {
         const blocked_users = await getBlockedUsers();
         console.log(blocked_users);

         setRecords(blocked_users);
         setReady(true);
      };
      fetchBlockesdsers();
   }, []);

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Engellenen Kullanıcılar
               </p>
            </div>
            <div className="content p-4 bg-gray-200 dark:bg-night-200">
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
                        const data = await blockUserByUsername(values);
                        typeof data === 'object' &&
                           Toast.fire({
                              title: `Kullanıcı bloklandı. [${data.username}]`,
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
                  <div className="content">
                     <div>
                        {!ready && (
                           <div>
                              <LoadSpinner />
                           </div>
                        )}
                        {records.map((record, index) => (
                           <div key={index}>
                              <div className="flex">
                                 <div className="w-full border-b border-gray-400 dark:border-gray-600 p-2">
                                    <span>{record.username}</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Blocked;
