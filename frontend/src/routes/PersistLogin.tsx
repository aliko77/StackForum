import { useState, useEffect } from 'react';
import { useRefreshToken } from 'hooks/useRefreshToken';
import { useAuth } from 'hooks/useAuth';
import { IReactChildren } from 'types';
import useUser from 'hooks/useUser';
import { PageLoading } from 'components/PageLoading';

export const PersistLogin = ({ children }: IReactChildren) => {
   const refresh = useRefreshToken();
   const { accessToken } = useAuth();
   const [loading, setLoading] = useState(true);
   const [userLoaded, setUserLoaded] = useState(false);
   const getUser = useUser();

   useEffect(() => {
      let isMounted = true;

      async function verifyRefreshToken() {
         try {
            const data = await refresh();
            data.code && data.code === 'token_not_valid' && setUserLoaded(true);
         } finally {
            isMounted && setLoading(false);
         }
      }

      !accessToken ? verifyRefreshToken() : setLoading(false);

      return () => {
         isMounted = false;
      };
   }, []);

   useEffect(() => {
      if (accessToken && !userLoaded) {
         getUser();
         setUserLoaded(true);
      }
   }, [accessToken]);

   return <>{userLoaded && !loading ? children : <PageLoading />}</>;
};
