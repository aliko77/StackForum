import ControlPanelLayout from 'layouts/ControlPanel';
import { FC, useState } from 'react';
import Button from 'components/Button';
import { SelectMenu, CustomDropdownOption } from 'components/SelectMenu';
import { boolean, object, string } from 'yup';
import { Toast } from 'utils';
import useUser from 'hooks/useUser';
import { useAuth } from 'hooks/useAuth';

const choices_ShareInfo: CustomDropdownOption<string>[] = [
   {
      label: 'Herkes',
      value: 'public',
   },
   {
      label: 'Kayıtlı Üyeler',
      value: 'registered',
   },
];

const choices_FriendRequests: CustomDropdownOption<boolean>[] = [
   {
      label: 'Evet',
      value: true,
   },
   {
      label: 'Hayır',
      value: false,
   },
];

const choices_AllowMessages: CustomDropdownOption<string>[] = [
   {
      label: 'Herkes',
      value: 'public',
   },
   {
      label: 'Kayıtlı Üyeler',
      value: 'registered',
   },
   {
      label: 'Arkadaşlarım',
      value: 'friends',
   },
];

const validationSchema = object({
   share_info: string()
      .required('*')
      .oneOf(choices_ShareInfo.map((o) => o.value)),
   allow_friend_requests: boolean()
      .required('*')
      .oneOf(choices_FriendRequests.map((o) => o.value)),
   allow_messages: string()
      .required('*')
      .oneOf(choices_AllowMessages.map((o) => o.value)),
});

const Customize: FC = () => {
   const { user } = useAuth();
   const [shareInfo, setShareInfo] = useState<string>(user?.profile?.share_info ?? 'public');
   const [friendRequests, setFriendRequests] = useState<boolean>(
      user?.profile?.allow_friend_requests ?? true,
   );
   const [allowMessages, setAllowMessages] = useState<string>(
      user?.profile?.allow_messages ?? 'public',
   );
   const { updateProfile } = useUser();

   const handleSubmit = async () => {
      const values = {
         share_info: shareInfo,
         allow_friend_requests: friendRequests,
         allow_messages: allowMessages,
      };
      try {
         await validationSchema.validate(values);
         const status = await updateProfile(values);
         status &&
            Toast.fire({
               title: 'Başarıyla kaydedildi.',
               icon: 'success',
               timer: 2000,
            });
      } catch (error) {
         await Toast.fire({
            title: 'Bir hata oluştu.',
            icon: 'error',
         });
      }
   };

   return (
      <ControlPanelLayout>
         <div className="w-full">
            <div className="bg-night-900 p-2 rounded-t">
               <p className="text-base font-semibold tracking-wide text-gray-100">
                  Profilinizi Özelleştirin
               </p>
            </div>
            <div className="px-4 py-4 space-y-8 bg-gray-200 dark:bg-night-800">
               <fieldset id="private">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">
                        Profil Gizliliği
                     </p>
                  </legend>
                  <div className="ml-4">
                     <p className="text-gray-900 dark:text-gray-300 text-sm">
                        Profilinizin kimler tarafından ziyaret edilebileceğini ayarlayın.
                     </p>
                     <div className="mt-4 w-72">
                        <SelectMenu
                           onChange={(value) => {
                              setShareInfo(value);
                           }}
                           options={choices_ShareInfo}
                           value={shareInfo}
                        />
                     </div>
                  </div>
               </fieldset>
               <fieldset id="allow_friend_requests">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">
                        Arkadaşlık İstekleri
                     </p>
                  </legend>
                  <div className="ml-4">
                     <div className="mb-2">
                        <span className="text-gray-800 dark:text-gray-300 text-sm">
                           Kullanıcılar sizinle arkadaşlık/bağlantı kurup kuramayacağını ayarlayın.
                        </span>
                     </div>
                     <div className="w-72">
                        <SelectMenu
                           onChange={(value) => {
                              setFriendRequests(value);
                           }}
                           options={choices_FriendRequests}
                           value={friendRequests}
                        />
                     </div>
                  </div>
               </fieldset>
               <fieldset id="allow_messages">
                  <legend className="w-full mb-2 border-b pb-1 border-gray-400 dark:border-gray-500">
                     <p className="font-medium text-gray-900 dark:text-gray-100">Mesaj Ayarları</p>
                  </legend>
                  <div className="ml-4 mb-4">
                     <div className="mb-2">
                        <span className="text-gray-800 dark:text-gray-300 text-sm">
                           Kimlerin size mesaj gönderebileceğini ayarlayın.
                        </span>
                     </div>
                     <div className="w-72">
                        <SelectMenu
                           onChange={(value) => {
                              setAllowMessages(value);
                           }}
                           options={choices_AllowMessages}
                           value={allowMessages}
                        />
                     </div>
                  </div>
               </fieldset>
               <div className="w-full max-w-xs mx-auto mt-4 float-right">
                  <Button onClick={handleSubmit}>Kaydet</Button>
               </div>
            </div>
         </div>
      </ControlPanelLayout>
   );
};

export default Customize;
