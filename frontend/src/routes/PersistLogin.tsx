import { useState, useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { ReactChildrenProps } from 'types';
import useUser from 'hooks/useUser';
import { PageLoading } from 'components/PageLoading';
import { useRefreshToken } from 'hooks/useRefreshToken';

export const PersistLogin = ({ children }: ReactChildrenProps) => {
   const refresh = useRefreshToken();
   const { accessToken } = useAuth();
   const [isLoading, setIsLoading] = useState(true);
   const [userLoaded, setUserLoaded] = useState(false);
   const { getUser } = useUser();

   useEffect(() => {
      let isMounted = true;

      async function TokenCheck() {
         try {
            const data = await refresh();
            data?.code && setUserLoaded(true);
         } finally {
            isMounted && setIsLoading(false);
         }
      }

      !accessToken ? TokenCheck() : setIsLoading(false);

      return () => {
         isMounted = false;
      };
   }, []);

   useEffect(() => {
      async function _getUser() {
         await getUser();
         setUserLoaded(true);
      }
      accessToken && !userLoaded && _getUser();
   }, [accessToken]);

   return <>{userLoaded && !isLoading ? children : <PageLoading />}</>;
};
