import axiosService from 'api/axios';
import { LoginProp } from 'hooks/useAuth';
import { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import { setAuthTokens, setLogout, setUser } from 'store/slices/authSlice';
import { ReactChildrenResponse } from 'types';
import { AuthResponse } from 'types';

const AuthContext = createContext<AuthResponse>({
   isAuth: false,
});

export default AuthContext;

export const AuthProvider = ({ children }: ReactChildrenResponse) => {
   const { refreshToken, token, user, isAuth } = useSelector((state: RootState) => state.auth);
   const [loading, setLoading] = useState<boolean>(true);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const login = async (data: LoginProp) => {
      try {
         const authResult = await axiosService.post('/auth/login/', data);
         const resultData = authResult.data;
         dispatch(
            setAuthTokens({
               accessToken: resultData.access,
               refreshToken: resultData.refresh,
            }),
         );
         dispatch(setUser(resultData.user));
         return { success: true };
      } catch (error: any) {
         throw new Error(error);
      }
   };

   const logout = () => {
      dispatch(setLogout());
   };

   const contextData: AuthResponse = {
      user: user,
      token: token,
      refreshToken: refreshToken,
      login: login,
      logout: logout,
   };

   return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
