import { useAuth } from 'hooks/useAuth';
import { FC } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';

export const LogoutButton: FC = () => {
   const { logout } = useAuth();

   return (
      <button onClick={logout} className="flex justify-center items-center" title="Çıkış yap">
         <div className="text-zinc-500 hover:text-secondary-500 dark:text-zinc-400 dark:hover:text-primary-500">
            <AiOutlineLogout size="24px" />
         </div>
      </button>
   );
};
