import { FC, useEffect, useState, MouseEvent } from 'react';
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
import { parseDateTimeToString } from 'utils';

const Blocked: FC = () => {
   const { blockUserByUsername, unBlockUserByUsername, getBlockedUsers, errors } = useUser();
   const [ready, setReady] = useState<boolean>(false);
   const [records, setRecords] = useState<BlockedUsersProps>([]);

   const validationSchema = object({
      username: string().required('Bu alan zorunludur.'),
   });

   const initialValues = {
      username: '',
   };

   useEffect(() => {
      const fetchBlockedUsers = async () => {
         const blocked_users = await getBlockedUsers();
         setRecords(blocked_users);
         setReady(true);
      };
      fetchBlockedUsers();
   }, []);

   const handleUnBlock = async (event: MouseEvent<HTMLSpanElement>) => {
      const target = event.currentTarget.dataset.blocked_user;
      if (!target) return;
      const data = await unBlockUserByUsername({ username: target });
      if (typeof data === 'object') {
         setRecords((prevRecords) => prevRecords.filter((record) => record.username !== target));
         Toast.fire({
            title: `Kullanıcın engeli kaldırıldı.`,
            text: data.username,
            icon: 'success',
            timer: 2000,
         });
      }
   };

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
                     onSubmit={async (values, { resetForm }): Promise<void> => {
                        const data = await blockUserByUsername(values);
                        if (typeof data === 'object') {
                           resetForm();
                           setRecords([data, ...records]);
                           Toast.fire({
                              title: `Kullanıcı bloklandı.`,
                              text: data.username,
                              icon: 'success',
                              timer: 2000,
                           });
                        }
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
                  <div className="w-full border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">Bloklananlar</p>
                  </div>
                  <div className="content">
                     <div>
                        {!ready && (
                           <div>
                              <LoadSpinner />
                           </div>
                        )}
                        <div className="relative overflow-x-auto shadow-md">
                           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-night-300 dark:text-indigo-400">
                                 <tr>
                                    <th scope="col" className="px-6 py-3">
                                       Kullanıcı
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                       Tarih
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                       Etkileşimler
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {records.length == 0 && (
                                    <tr className="border-b bg-gray-200 dark:bg-gray-900 dark:border-gray-700">
                                       <th
                                          scope="row"
                                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-100"
                                       >
                                          #
                                       </th>
                                       <td className="px-6 py-4">#</td>
                                       <td className="px-6 py-4">#</td>
                                    </tr>
                                 )}
                                 {records.map((record, index) => (
                                    <tr
                                       key={index}
                                       className={`border-b ${
                                          index % 2 == 0
                                             ? 'bg-gray-200 dark:bg-gray-900'
                                             : 'bg-gray-100 dark:bg-gray-800'
                                       } dark:border-gray-700`}
                                    >
                                       <th
                                          scope="row"
                                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-100"
                                       >
                                          {record.username}
                                       </th>
                                       <td className="px-6 py-4">
                                          {parseDateTimeToString(record.blocked_at)}
                                       </td>
                                       <td className="px-6 py-4">
                                          <span
                                             data-blocked_user={record.username}
                                             onClick={handleUnBlock}
                                             className="cursor-pointer font-medium text-indigo-700 dark:text-indigo-500 hover:underline"
                                          >
                                             Kaldır
                                          </span>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Blocked;
