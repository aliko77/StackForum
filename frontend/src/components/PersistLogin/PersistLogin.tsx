import { useState, useEffect } from 'react';
import { useRefreshToken } from 'hooks/useRefreshToken';
import { useAuth } from 'hooks/useAuth';
import { IReactChildren } from 'types';
import { useAxiosPrivate } from 'hooks/useAxiosPrivate';

export const PersistLogin = ({ children }: IReactChildren) => {
   const refresh = useRefreshToken();
   const { accessToken, setUser, refreshToken } = useAuth();
   const [loading, setLoading] = useState(true);
   const axiosPrivate = useAxiosPrivate();

   useEffect(() => {
      let isMounted = true;

      async function verifyUser() {
         try {
            await refresh();
            const { data } = await axiosPrivate.get('/user/');
            setUser(data);
         } catch {
            console.log('Bir hata oluştu.');
         } finally {
            isMounted && setLoading(false);
         }
      }

      !accessToken && refreshToken ? verifyUser() : setLoading(false);

      return () => {
         isMounted = false;
      };
   }, []);

   return <>{!loading && children}</>;
};
