import Cookies from 'universal-cookie';

const cookies = new Cookies();

class TokenService {
   getCookieRefreshToken() {
      const refreshToken = cookies.get<string>('refreshToken');
      return refreshToken;
   }

   getCookieAccessToken() {
      const accessToken = cookies.get<string>('accessToken');
      return accessToken;
   }
}

export default new TokenService();
