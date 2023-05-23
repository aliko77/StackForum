import { useState, useEffect } from 'react';
import { useRefreshToken } from 'hooks/useRefreshToken';
import { useAuth } from 'hooks/useAuth';
import { IReactChildren } from 'types';
import useUser from 'hooks/useUser';

export const PersistLogin = ({ children }: IReactChildren) => {
   const refresh = useRefreshToken();
   const { accessToken } = useAuth();
   const [loading, setLoading] = useState(true);
   const getUser = useUser();

   useEffect(() => {
      let isMounted = true;

      async function verifyUser() {
         try {
            await refresh();
            getUser();
         } catch {
            console.debug('Bir hata oluştu.');
         } finally {
            isMounted && setLoading(false);
         }
      }

      !accessToken ? verifyUser() : setLoading(false);

      return () => {
         isMounted = false;
      };
   }, []);

   return <>{!loading && children}</>;
};
