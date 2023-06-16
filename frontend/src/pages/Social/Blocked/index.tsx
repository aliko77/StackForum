import { FC, MouseEvent, useEffect, useState } from 'react';
import ControlPanelLayout from 'layouts/ControlPanel';
import { Field } from 'components/Field';
import Button from 'components/Button';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import useUser from 'hooks/useUser';
import { Toast } from 'utils';
import { FormErrors } from 'components/FormErrors';
import { BlockedUsersProps } from 'types';
import { LoadSpinner } from 'components/LoadSpinner';
import { Avatar } from 'components/Profile';
import classNames from 'classnames';

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
      const retrieveBlockedUsers = async () => {
         const blocked_users = await getBlockedUsers();
         setRecords(blocked_users);
         setReady(true);
      };
      retrieveBlockedUsers();
   }, []);

   const handleUnBlock = async (event: MouseEvent<HTMLSpanElement>) => {
      const target = event.currentTarget.dataset.blocked_user;
      if (!target) return;
      const data = await unBlockUserByUsername({ username: target });
      if (typeof data === 'object') {
         setRecords((prevRecords) => prevRecords.filter((record) => record.username !== target));
         await Toast.fire({
            title: `Kullanıcın engeli kaldırıldı.`,
            text: data.username,
            icon: 'success',
            timer: 2000,
         });
      }
   };

   return (
      <ControlPanelLayout>
         <div className="bg-night-900 p-2 rounded-t">
            <p className="text-base font-semibold tracking-wide text-gray-100">
               Engellenen Kullanıcılar
            </p>
         </div>
         <div className="p-4 bg-gray-200 dark:bg-night-800">
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
                        await Toast.fire({
                           title: `Kullanıcı bloklandı.`,
                           text: data.username,
                           icon: 'success',
                           timer: 2000,
                        });
                     }
                  }}
               >
                  {({ handleSubmit, values, handleChange, handleBlur, errors: formikErrors }) => (
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
                                    <Button type="submit">Blokla</Button>
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
               <div>
                  {!ready && (
                     <div>
                        <LoadSpinner />
                     </div>
                  )}
                  <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-violet-400">
                        <tr>
                           <th scope="col" className="p-3">
                              Kullanıcı
                           </th>
                           <th scope="col" className="p-3">
                              Etkileşimler
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {records.length == 0 && (
                           <tr className="border-b bg-gray-200 dark:bg-night-900 dark:border-gray-700">
                              <th
                                 scope="row"
                                 className="p-3 font-medium text-gray-900 dark:text-gray-100"
                              >
                                 #
                              </th>
                              <td className="p-3">#</td>
                           </tr>
                        )}
                        {records.map((record, index) => (
                           <tr
                              key={index}
                              className={classNames('border-b', 'dark:border-b-gray-700', {
                                 'bg-gray-200 dark:bg-night-900': index % 2 == 0,
                                 'bg-gray-100 dark:bg-night-700': index % 2 != 0,
                              })}
                           >
                              <td
                                 scope="row"
                                 className="p-3 font-medium text-gray-900 dark:text-gray-100"
                              >
                                 <div className="flex items-center space-x-3">
                                    <div className="min-w-max">
                                       <Avatar
                                          width="2.5rem"
                                          height="2.5rem"
                                          path={record.avatar}
                                       />
                                    </div>
                                    <div className="max-w-xs overflow-hidden text-ellipsis">
                                       <span>{record.username}</span>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-3">
                                 <span
                                    data-blocked_user={record.username}
                                    onClick={handleUnBlock}
                                    className="cursor-pointer font-medium text-rose-600 dark:text-violet-500 hover:underline"
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
      </ControlPanelLayout>
   );
};

export default Blocked;
