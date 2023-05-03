export interface AccountResponse {
   user: {
      id: number;
      email: string;
      is_active: boolean;
      is_staff: boolean;
      is_superuser: boolean;
      is_verified: boolean;
      last_login: Date;
   };
   accessToken: string;
   refreshToken: string;
}
