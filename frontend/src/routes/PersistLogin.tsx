import { useState, useEffect } from 'react';
import { useVerifyToken } from 'hooks/useVerifyToken';
import { useAuth } from 'hooks/useAuth';
import { IReactChildren } from 'types';
import useUser from 'hooks/useUser';
import { PageLoading } from 'components/PageLoading';

export const PersistLogin = ({ children }: IReactChildren) => {
   const verify = useVerifyToken();
   const { accessToken } = useAuth();
   const [loading, setLoading] = useState(true);
   const [userLoaded, setUserLoaded] = useState(false);
   const getUser = useUser();

   useEffect(() => {
      let isMounted = true;

      async function tokenVerify() {
         try {
            const data = await verify();
            !data && setUserLoaded(true);
         } finally {
            isMounted && setLoading(false);
         }
      }

      !accessToken ? tokenVerify() : setLoading(false);

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

   return <>{userLoaded && !loading ? children : <PageLoading />}</>;
};
