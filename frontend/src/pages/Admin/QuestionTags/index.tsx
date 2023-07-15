/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import Button from 'components/Button';
import { Field } from 'components/Field';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import Pagination from 'components/Pagination';
import { Form, Formik } from 'formik';
import { useQuestionTags } from 'hooks/useQuestionTags';
import AdminPanel from 'layouts/AdminPanel';
import { FC, useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { QuestionTagProps } from 'types';
import { Toast } from 'utils';
import { object, string } from 'yup';

const QuestionTags: FC = () => {
   const { errors, isLoading, getQuestionTags, addQuestionTag } = useQuestionTags();
   const [orgResponse, setOrgResponse] = useState<{
      count: number;
      next: string | null;
      previous: string | null;
      results: QuestionTagProps[];
   }>();
   const [records, setRecords] = useState<QuestionTagProps[] | undefined>([]);
   const [itemOffset, setItemOffset] = useState<number>(0);
   const [pageCount, setPageCount] = useState<number>(0);
   const itemsPerPage = 5;

   const validationSchema = object({
      name: string().required('Bu alan zorunludur.'),
      description: string().required('Bu alan zorunludur.'),
   });

   const retrieveQuestionTags = async () => {
      const response = await getQuestionTags(itemsPerPage, itemOffset);
      response && setOrgResponse(response);
      response && setRecords(response.results);
   };

   useEffect(() => {
      retrieveQuestionTags();
   }, [itemOffset]);

   useEffect(() => {
      if (orgResponse && itemsPerPage > itemOffset) {
         const endOffset = itemOffset + itemsPerPage;
         const currentItems = orgResponse.results.slice(itemOffset, endOffset);
         setPageCount(Math.ceil(orgResponse.count / itemsPerPage));
         setRecords(currentItems);
      }
   }, [itemOffset, orgResponse]);

   const handlePageChange = ({ selected }: { selected: number }) => {
      if (orgResponse) {
         const pageCount = Math.ceil(orgResponse.count / itemsPerPage);
         const newOffset = selected * itemsPerPage;
         const isValidPage = newOffset < orgResponse.count;

         if (isValidPage) {
            setItemOffset(newOffset);
            setPageCount(pageCount);
         }
      }
   };

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
                        const data = await addQuestionTag(values);
                        if (typeof data === 'object' && records) {
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
                           <fieldset id="question-tags ">
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
            <div id="question-tags" className="overflow-auto">
               <div className="w-full border-b pb-1 border-gray-400 dark:border-gray-500">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Konu Etiketleri</p>
               </div>
               <div>
                  {isLoading && (
                     <div className="relative">
                        <div className="absolute left-1/2 top-1">
                           <LoadSpinner />
                        </div>
                     </div>
                  )}
                  <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 dark:text-gray-400">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-primary-400">
                        <tr>
                           <th className="p-3">ID</th>
                           <th scope="col" className="p-3">
                              Etiket
                           </th>
                           <th className="p-3">Açıklama</th>
                           <th className="p-3">Oluşturan</th>
                           <th className="p-3">Etkileşimler</th>
                        </tr>
                     </thead>
                     <tbody>
                        {records && records.length == 0 && (
                           <tr className="border-b bg-gray-200 dark:bg-night-900 dark:border-gray-700">
                              <td className="p-3">#</td>
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
                        {records &&
                           records.map((record, index) => (
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
                                       <span>{record.id}</span>
                                    </div>
                                 </td>
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
                  {records && records.length > 0 && (
                     <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
                  )}
               </div>
            </div>
         </div>
      </AdminPanel>
   );
};

export default QuestionTags;
export { QuestionTagDetail } from './detail';
