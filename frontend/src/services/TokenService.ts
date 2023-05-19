class TokenService {
   getLocalRefreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');
      return refreshToken ? JSON.parse(refreshToken) : null;
   }

   getLocalAccessToken() {
      const accessToken = localStorage.getItem('accessToken');
      return accessToken ? JSON.parse(accessToken) : null;
   }
}

export default new TokenService();
