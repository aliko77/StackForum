import ControlPanelLayout from 'layouts/ControlPanel';
import { FC } from 'react';
import { Avatar as AvatarImage } from 'components/Profile/Avatar';
import { useAuth } from 'hooks/useAuth';
import { Button } from 'components/Button';
import { Toast } from 'utils';
import useUser from 'hooks/useUser';

const EditAvatar: FC = () => {
   const { user } = useAuth();
   const { updateProfileAvatar } = useUser();

   const handleRemoveAvatar = async () => {
      const url = user?.profile?.avatar;
      const fileName = url && url.substring(url.lastIndexOf('/') + 1);
      if (fileName && fileName === 'default.jpg') {
         Toast.fire({
            title: 'Avatarınız zaten varsayılan.',
            icon: 'info',
         });
         return;
      }
      const status = await updateProfileAvatar({ remove_avatar: true });
      if (status) {
         Toast.fire({
            title: 'Başarıyla kaldırıldı.',
            icon: 'success',
         });
      } else {
         Toast.fire({
            title: 'Bir hata oluştu.',
            icon: 'error',
         });
      }
   };

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="title bg-night-200 dark:bg-night-300 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Avatarını Düzenle
               </p>
            </div>
            <div className="content px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-200">
               <fieldset id="avatar">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">Avatar</p>
                  </legend>
                  <div className="content">
                     <div>
                        <AvatarImage path={user?.profile?.avatar} height="6rem" width="6rem" />
                     </div>
                     <div className="mt-4">
                        <div className="flex justify-start space-x-4">
                           <div>
                              <Button
                                 onClick={handleRemoveAvatar}
                                 text="Kaldır"
                                 color="indigo"
                                 dark="rose"
                              >
                                 <div className="ml-2">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       strokeWidth={1.5}
                                       stroke="currentColor"
                                       className="w-5 h-5"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                       />
                                    </svg>
                                 </div>
                              </Button>
                           </div>
                           <div>
                              <Button text="Yükle">
                                 <div className="ml-2">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       strokeWidth={1.5}
                                       stroke="currentColor"
                                       className="w-5 h-5"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                       />
                                    </svg>
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
                  <div className="content ml-2">
                     <ul className="max-w-md space-y-1 text-sm text-gray-600 list-disc list-inside dark:text-gray-400">
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

export default EditAvatar;
