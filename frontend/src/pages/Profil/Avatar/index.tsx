import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';
import { Avatar as AvatarImage } from 'components/Profile/Avatar';
import { useAuth } from 'hooks/useAuth';
import Button from 'components/Button';
import { Toast } from 'utils';
import useUser from 'hooks/useUser';
import { useState, useRef, ChangeEvent } from 'react';
import { FormErrors } from 'components/FormErrors';
import { HiOutlineTrash, HiArrowUpTray } from 'react-icons/hi2';

const Avatar: FC = () => {
   const { user } = useAuth();
   const { deleteAvatar, updateAvatar, errors } = useUser();
   const [uploadedImage, setUploadedImage] = useState<File | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleRemoveAvatar = async () => {
      if (uploadedImage) {
         setUploadedImage(null);
         return;
      }
      const url = user?.profile?.avatar;
      const fileName = url && url.substring(url.lastIndexOf('/') + 1);
      if (fileName && fileName === 'default.jpg') {
         Toast.fire({
            title: 'Avatarınız zaten varsayılan.',
            icon: 'info',
         });
         return;
      }
      const status = await deleteAvatar();
      if (status)
         Toast.fire({
            title: 'Başarıyla kaldırıldı.',
            icon: 'success',
         });
   };

   const handleUploadAvatar = async () => {
      if (!uploadedImage && fileInputRef.current) {
         fileInputRef.current.click();
         return;
      }
      if (uploadedImage) {
         const status = await updateAvatar(uploadedImage);
         if (status)
            Toast.fire({
               title: 'Başarıyla kaydedildi.',
               icon: 'success',
               timer: 2000,
            });
         setUploadedImage(null);
      }
   };

   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
         const maxSize = 3 * 1024 * 1024; // 3 MB
         if (file.size > maxSize) {
            Toast.fire({
               title: "3 MB' den fazla !",
               icon: 'warning',
            });
            return;
         }
         setUploadedImage(file);
      }
   };

   return (
      <ControlPanelLayout>
         <input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={handleFileChange}
            ref={fileInputRef}
            hidden
         />
         <div className="w-full">
            <div className="bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Avatarını Düzenle
               </p>
            </div>
            <div className="px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-800">
               <fieldset id="avatar">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">Avatar</p>
                  </legend>
                  {errors && <FormErrors errors={errors} />}
                  <div>
                     <div className="flex items-center space-x-4">
                        {!uploadedImage && (
                           <AvatarImage path={user?.profile?.avatar} height="6rem" width="6rem" />
                        )}
                        {uploadedImage && (
                           <div>
                              <AvatarImage
                                 path={URL.createObjectURL(uploadedImage)}
                                 height="6rem"
                                 width="6rem"
                              />
                           </div>
                        )}
                     </div>
                     <div className="mt-4">
                        <div className="flex justify-start space-x-4">
                           <div>
                              <Button onClick={handleRemoveAvatar}>
                                 <span>Kaldır</span>
                                 <div className="ml-2">
                                    <HiOutlineTrash size="20px" />
                                 </div>
                              </Button>
                           </div>
                           <div>
                              <Button onClick={handleUploadAvatar}>
                                 <span>{!uploadedImage ? 'Yükle' : 'Kaydet'}</span>
                                 <div className="ml-2">
                                    <HiArrowUpTray size="20px" />
                                 </div>
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>
               </fieldset>
               <div id="avatar-info">
                  <div className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">Avatar Hakkında</p>
                  </div>
                  <div className="ml-2">
                     <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside dark:text-gray-400">
                        <li>Mevcut avatar herkes tarafından görülmektedir.</li>
                        <li>Avatarınızı kaldırdığınızda varsayılan avatar gözükecektir.</li>
                        <li>Avatar ebatı maksimum 100x100 pixel ve 3.00 MB olmalıdır.</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Avatar;
