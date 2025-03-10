import { FC, useEffect, useState, MouseEvent } from 'react';
import ControlPanelLayout from 'layouts/ControlPanel';
import { Field } from 'components/Field';
import Button from 'components/Button';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import useUser from 'hooks/useUser';
import { Toast } from 'utils';
import { FormErrors } from 'components/FormErrors';
import { FriendsProps } from 'types';
import { LoadSpinner } from 'components/LoadSpinner';
import { Avatar } from 'components/Profile';
import classNames from 'classnames';

const Friend: FC = () => {
   const { removeFriendByUsername, addFriendByUsername, getUserFriends, errors } = useUser();
   const [ready, setReady] = useState<boolean>(false);
   const [records, setRecords] = useState<FriendsProps>([]);

   const validationSchema = object({
      username: string().required('Bu alan zorunludur.'),
   });

   const initialValues = {
      username: '',
   };

   useEffect(() => {
      const retrieveUserFriends = async () => {
         const friends = await getUserFriends();
         setRecords(friends);
         setReady(true);
      };
      retrieveUserFriends();
   }, []);

   const handleUnBlock = async (event: MouseEvent<HTMLSpanElement>) => {
      const target = event.currentTarget.dataset.blocked_user;
      if (!target) return;
      const data = await removeFriendByUsername({ username: target });
      if (typeof data === 'object') {
         setRecords((prevRecords) => prevRecords.filter((record) => record.username !== target));
         Toast.fire({
            title: `Arkadaş listenizden çıkarıldı.`,
            text: data.username,
            icon: 'success',
            timer: 2000,
         });
      }
   };

   return (
      <ControlPanelLayout>
         <div className="bg-night-900 p-2 rounded-t">
            <p className="text-base font-semibold tracking-wide text-gray-100">Arkadaşlar</p>
         </div>
         <div className="p-4 bg-gray-200 dark:bg-night-800">
            {errors && (
               <div>
                  <FormErrors errors={errors} />
               </div>
            )}
            <div>
               <Formik
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={async (values, { resetForm }): Promise<void> => {
                     const data = await addFriendByUsername(values);
                     if (typeof data === 'object') {
                        resetForm();
                        setRecords([data, ...records]);
                        Toast.fire({
                           title: `Arkadaş Eklendi`,
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
                                 Arkadaş Ekle
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
                                    <Button type="submit">Arkadaş Ekle</Button>
                                 </div>
                              </div>
                           </div>
                        </fieldset>
                     </Form>
                  )}
               </Formik>
            </div>
            <div id="friend-info" className="my-8">
               <div className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                     Arkadaşlık Hakkında
                  </p>
               </div>
               <div className="ml-2">
                  <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside dark:text-gray-400">
                     <li>Arkadaşınız hakkında bildirimler alabilirsiniz.</li>
                     <li>Arkadaşınız, sizi kendi listesine eklememiş olabilir.</li>
                  </ul>
               </div>
            </div>
            <div id="friends" className="overflow-auto">
               <div className="w-full border-b pb-1 border-gray-400 dark:border-gray-500">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Arkadaşlar</p>
               </div>
               <div>
                  {!ready && (
                     <div>
                        <LoadSpinner />
                     </div>
                  )}
                  <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-primary-400">
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
                                    className="cursor-pointer font-medium text-secondary-600 dark:text-primary-500 hover:underline"
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

export default Friend;
