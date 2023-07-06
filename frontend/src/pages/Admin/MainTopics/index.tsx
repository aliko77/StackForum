import classNames from 'classnames';
import Button from 'components/Button';
import { Field } from 'components/Field';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { Form, Formik } from 'formik';
import { useMainTopics } from 'hooks/Admin/useMainTopics';
import AdminPanel from 'layouts/AdminPanel';
import { FC, useEffect, useState } from 'react';
import { TagNameProps } from 'types/Admin';
import { Toast } from 'utils';
import { object, string } from 'yup';

const MainTopics: FC = () => {
   const { errors, isLoading, getMainTopicsHeaders } = useMainTopics();
   const [records, setRecords] = useState<TagNameProps[]>([]);

   const validationSchema = object({
      tag_name: string().required('Bu alan zorunludur.'),
   });

   useEffect(() => {
      const retrieveMainTopics = async () => {
         const topics = await getMainTopicsHeaders();
         setRecords(topics);
      };
      retrieveMainTopics();
   }, []);

   return (
      <>
         <AdminPanel>
            <div className="bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Konu Etiketleri
               </p>
            </div>
            <div className="p-4 bg-gray-200 dark:bg-night-800">
               {errors && (
                  <div>
                     <FormErrors errors={errors} />
                  </div>
               )}
               <div className="mb-4">
                  <Formik
                     initialValues={{ tag_name: '' }}
                     validationSchema={validationSchema}
                     onSubmit={async (values, { resetForm }) => {
                        console.log(values);

                        resetForm();
                        Toast.fire({
                           title: `Etiket Eklendi`,
                           icon: 'success',
                           timer: 2000,
                        });
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
                           <fieldset id="main-topics">
                              <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                                 <p className="font-medium text-gray-900 dark:text-gray-100">
                                    Yeni Etiket Ekle
                                 </p>
                              </legend>
                              <div className="ml-4">
                                 <Field
                                    label="Etiket"
                                    type="text"
                                    id="tag_name"
                                    name="tag_name"
                                    placeholder="Etiketi giriniz."
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.tag_name}
                                    errorMessage={formikErrors.tag_name}
                                 />
                                 <div className="mt-4">
                                    <div className="w-full sm:max-w-[8rem]">
                                       <Button type="submit">Kaydet</Button>
                                    </div>
                                 </div>
                              </div>
                           </fieldset>
                        </Form>
                     )}
                  </Formik>
               </div>
               <div id="main-topics" className="overflow-auto">
                  <div className="w-full border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">Konu Başlıkları</p>
                  </div>
                  <div>
                     {!isLoading && (
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
                                    <div className="max-w-xs overflow-hidden text-ellipsis">
                                       <span>{record.name}</span>
                                    </div>
                                 </td>
                                 <td
                                    scope="row"
                                    className="p-3 font-medium text-gray-900 dark:text-gray-100"
                                 >
                                    <div className="max-w-xs overflow-hidden text-ellipsis">
                                       <span>{record.creator.username}</span>
                                    </div>
                                 </td>
                                 <td className="p-3">
                                    <span
                                       data-topic_header={record.name}
                                       // onClick={handleUnBlock}
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
         </AdminPanel>
      </>
   );
};

export default MainTopics;
