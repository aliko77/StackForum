import { LogoutButton } from 'components/LogoutButton';
import { Popover } from 'components/Popover';
import { useAuth } from 'hooks/useAuth';
import { parseDateTimeToString } from 'utils';

export const HeaderPopOver = () => {
   const { user } = useAuth();
   const s_lastlogin = user?.last_login ? parseDateTimeToString(user.last_login) : 'Bilinmiyor.';
   return (
      <Popover button="Hi">
         <span>Selam</span>
      </Popover>
   );
};
