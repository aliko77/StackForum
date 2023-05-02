import axiosService from 'api/axios';
import { useLocalStorage } from './useLocalStorage';

interface SignInProp {
   email: string;
   password: string;
}

const useAuth = () => {
   const [user, setUser] = useLocalStorage('user', null);

   const signIn = async (data: SignInProp) => {
      try {
         const authResult = await axiosService.post('/auth/login/', data);
         const userObj = { ...authResult.data?.user };
         userObj.token = authResult.data?.access;
         userObj.refresh = authResult.data?.refresh;
         setUser(userObj);
         console.log(userObj);
      } catch (error) {
         console.log(error);
      }
   };

   const signOut = () => {
      setUser(null);
   };

   return { user, signIn, signOut };
};

export default useAuth;
