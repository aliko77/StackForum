import axiosService from 'api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setLogout, setUser, setAuthTokens } from 'store/slices/authSlice';

export interface LoginProp {
   email: string;
   password: string;
}

const useAuth = () => {
   const dispatch = useDispatch();

   const { user, refreshToken, token } = useSelector((state: RootState) => state.auth);

   const login = async (data: LoginProp) => {
      try {
         const authResult = await axiosService.post('/auth/login/', data);
         console.log(authResult);
         const resultData = authResult.data;
         dispatch(
            setAuthTokens({
               accessToken: resultData.access,
               refreshToken: resultData.refresh,
            }),
         );
         dispatch(setUser(resultData.user));
      } catch (error) {
         console.log(error);
      }
   };

   const logout = () => {
      dispatch(setLogout());
   };

   return { user, token, refreshToken, login, logout };
};

export default useAuth;
