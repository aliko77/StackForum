import Button from 'components/Button';
import { Field } from 'components/Field';
import { FormErrors } from 'components/FormErrors';
import { LoadSpinner } from 'components/LoadSpinner';
import { Form, Formik } from 'formik';
import { useTopicTags } from 'hooks/useTopicTags';
import AdminPanel from 'layouts/AdminPanel';
import PageNotFound from 'pages/PageNotFound';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { TopicTagProps } from 'types';
import { Toast } from 'utils';
import { object, string } from 'yup';

export const TopicTagDetail = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const { getTopicTag, editTopicTag, destroyTopicTag, errors, isLoading } = useTopicTags();
   const [tagDetail, setTagDetail] = useState<TopicTagProps | undefined | null>(null);
   const [initialValues, setInitialValues] = useState<{
      id: number | undefined;
      name: string | undefined;
      description: string | undefined;
   }>({
      id: 0,
      name: '',
      description: '',
   });

   useEffect(() => {
      const retrieveTopicTags = async () => {
         if (id) {
            const topic = await getTopicTag(id);
            setTagDetail(topic);
            setInitialValues({
               id: topic?.id,
               name: topic?.name,
               description: topic?.description,
            });
         }
      };
      retrieveTopicTags();
   }, []);

   const validationSchema = object({
      name: string().required('Bu alan zorunludur.'),
      description: string().required('Bu alan zorunludur.'),
   });

   let removeTagClickCount = 0;
   let removeTagTimeout: NodeJS.Timeout | null = null;
   const handleRemoveTag = async (tag: TopicTagProps) => {
      if (removeTagClickCount === 0) {
         Toast.fire({
            title: `Kaldırmak için tekrar tıklayın`,
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000,
         });
      }
      removeTagClickCount++;

      if (removeTagClickCount === 2) {
         if (removeTagTimeout) {
            clearTimeout(removeTagTimeout);
            removeTagTimeout = null;
         }
         removeTagClickCount = 0;
         const status = await destroyTopicTag(tag);

         if (status) {
            navigate('/admin/konu-etiketleri');
            Toast.fire({
               title: `Etiket Kaldırıldı`,
               icon: 'success',
               timer: 2000,
            });
         }
      } else {
         removeTagTimeout = setTimeout(() => {
            removeTagClickCount = 0;
            removeTagTimeout = null;
         }, 2000);
      }
   };

   return (
      <AdminPanel>
         {isLoading && <LoadSpinner />}
         {tagDetail ? (
            <>
               <div className="bg-night-900 p-2 rounded-t flex space-x-2 items-center">
                  <div className="border rounded-full p-0.5">
                     <NavLink to={'/admin/konu-etiketleri'}>
                        <MdArrowBack className="text-gray-100" size="20px" />
                     </NavLink>
                  </div>
                  <p className="text-base font-semibold tracking-wide text-gray-100">
                     Etiketi Düzenle [ {tagDetail?.name} - {tagDetail?.id}]
                  </p>
               </div>
               <div className="p-4 bg-gray-200 dark:bg-night-800">
                  {errors && (
                     <div>
                        <FormErrors errors={errors} />
                     </div>
                  )}
                  <Formik
                     enableReinitialize={true}
                     initialValues={initialValues}
                     validationSchema={validationSchema}
                     onSubmit={async (values) => {
                        if (tagDetail) {
                           const status = await editTopicTag(tagDetail.id, values);
                           if (status) {
                              Toast.fire({
                                 title: `Etiket Düzenlendi`,
                                 icon: 'success',
                                 timer: 2000,
                              });
                           }
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
                                       label="ID"
                                       type="text"
                                       id="id"
                                       name="id"
                                       readOnly
                                       disabled
                                       placeholder="ID"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.id}
                                       errorMessage={formikErrors.id}
                                    />
                                 </div>
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
                                 <div className="mt-3 w-full flex justify-between">
                                    <div className="w-full sm:max-w-[8rem]">
                                       <Button type="submit">Kaydet</Button>
                                    </div>
                                    <div>
                                       <Button
                                          type="button"
                                          color="purple"
                                          onClick={() => handleRemoveTag(tagDetail)}
                                       >
                                          <AiFillDelete size="18px" />
                                          Kaldır
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           </fieldset>
                        </Form>
                     )}
                  </Formik>
               </div>
            </>
         ) : !isLoading && tagDetail === undefined ? (
            <PageNotFound />
         ) : null}
      </AdminPanel>
   );
};
