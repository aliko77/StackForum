import classNames from 'classnames';
import Button from 'components/Button';
import { Field } from 'components/Field';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { Form, Formik } from 'formik';
import { useTopicTags } from 'hooks/useTopicTags';
import AdminPanel from 'layouts/AdminPanel';
import { FC, useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { TopicTagProps } from 'types';
import { Toast } from 'utils';
import { object, string } from 'yup';
const TopicTags: FC = () => {
   const { errors, isLoading, getTopicTags, addTopicTag } = useTopicTags();
   const [records, setRecords] = useState<TopicTagProps[]>([]);

   const validationSchema = object({
      name: string().required('Bu alan zorunludur.'),
      description: string().required('Bu alan zorunludur.'),
   });

   useEffect(() => {
      const retrieveTopicTags = async () => {
         const topics = await getTopicTags();
         setRecords(topics);
      };
      retrieveTopicTags();
   }, []);

   return (
      <AdminPanel>
         <div className="bg-night-900 p-2 rounded-t">
            <p className="text-base font-semibold tracking-wide text-gray-100">Konu Etiketleri</p>
         </div>
         <div className="p-4 bg-gray-200 dark:bg-night-800">
            {errors && (
               <div>
                  <FormErrors errors={errors} />
               </div>
            )}
            <div className="mb-4">
               <div>
                  <Formik
                     initialValues={{ name: '', description: '' }}
                     validationSchema={validationSchema}
                     onSubmit={async (values, { resetForm }) => {
                        const data = await addTopicTag(values);
                        if (typeof data === 'object') {
                           resetForm();
                           setRecords([data, ...records]);
                           Toast.fire({
                              title: `Etiket Eklendi`,
                              icon: 'success',
                              timer: 2000,
                           });
                        }
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
                           <fieldset id="topic-tags ">
                              <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                 <p className="font-medium text-gray-900 dark:text-gray-100">
                                    Yeni Etiket Ekle
                                 </p>
                              </legend>
                              <div className="ml-4">
                                 <div className="mb-3">
                                    <Field
                                       label="İsim"
                                       type="text"
                                       id="name"
                                       name="name"
                                       placeholder="Etiketi giriniz."
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.name}
                                       errorMessage={formikErrors.name}
                                    />
                                 </div>
                                 <div className="mb-3">
                                    <Field
                                       label="Açıklama"
                                       type="text"
                                       id="description"
                                       name="description"
                                       placeholder="Açıklamayı giriniz."
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.description}
                                       errorMessage={formikErrors.description}
                                    />
                                 </div>
                                 <div className="mt-3">
                                    <div className="w-full sm:max-w-[8rem]">
                                       <Button type="submit">Ekle</Button>
                                    </div>
                                 </div>
                              </div>
                           </fieldset>
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>
            <div id="topic-tags" className="overflow-auto">
               <div className="w-full border-b pb-1 border-gray-400 dark:border-gray-500">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Konu Etiketleri</p>
               </div>
               <div>
                  {isLoading && (
                     <div className="mt-4">
                        <LoadSpinner />
                     </div>
                  )}
                  <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-primary-400">
                        <tr>
                           <th scope="col" className="p-3">
                              Etiket
                           </th>
                           <th className="p-3">Açıklama</th>
                           <th className="p-3">Oluşturan</th>
                           <th className="p-3">Etkileşimler</th>
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
                              <td className="p-3">#</td>
                              <td className="p-3">#</td>
                           </tr>
                        )}
                        {records.map((record, index) => (
                           <tr
                              key={index}
                              className={classNames('border-b', 'dark:border-b-gray-700', {
                                 'bg-gray-100 dark:bg-night-900': index % 2 == 0,
                                 'bg-gray-50 dark:bg-night-700': index % 2 != 0,
                              })}
                           >
                              <td
                                 scope="row"
                                 className="p-3 font-medium text-gray-900 dark:text-gray-100"
                              >
                                 <div className="max-w-xs overflow-hidden text-ellipsis">
                                    <span>{record.name}</span>
                                 </div>
                              </td>
                              <td
                                 scope="row"
                                 className="p-3 font-medium text-gray-900 dark:text-gray-100"
                              >
                                 <div className="max-w-xs overflow-hidden text-ellipsis">
                                    <span>{record.description}</span>
                                 </div>
                              </td>
                              <td
                                 scope="row"
                                 className="p-3 font-medium text-gray-900 dark:text-gray-100"
                              >
                                 <div className="max-w-xs overflow-hidden text-ellipsis">
                                    <span>{record.creator}</span>
                                 </div>
                              </td>
                              <td className="p-3">
                                 <NavLink to={`/admin/konu-etiketleri/${record.id}`}>
                                    <button
                                       title="Düzenle"
                                       className="bg-white dark:bg-night-800 border border-gray-400 dark:border-gray-600 shadow p-1 rounded cursor-pointer font-medium text-secondary-600 dark:text-primary-500 hover:underline"
                                    >
                                       <AiOutlineEdit size="20px" />
                                    </button>
                                 </NavLink>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </AdminPanel>
   );
};

export default TopicTags;
export { TopicTagDetail } from './detail';
