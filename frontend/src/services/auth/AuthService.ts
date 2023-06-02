import { axiosService } from 'api/axios';
// import { UserProps, KeyValue } from 'types';

interface RegisterProps {
   (username: string, email: string, password: string, confirm_password: string): Promise<boolean>;
}

// interface VerifyFunctionProps {
//    (vcode: string, email: string | undefined): Promise<KeyValue>;
// }

class AuthService {
   register: RegisterProps = async (username, email, password, confirm_password) => {
      const { status } = await axiosService.post('/auth/register/', {
         username: username,
         email: email,
         password: password,
         confirm_password: confirm_password,
      });
      return status === 201 ? true : false;
   };

   // verify: VerifyFunctionProps = async (vcode, email) => {
   //    const response = await axiosService.post('/user/verify/', {
   //       activation_code: vcode,
   //       email: email,
   //    });
   //    const { status } = response.data;

   //    if (typeof status === 'boolean') {
   //       this.setUser((prevState) => {
   //          if (!prevState) return undefined;
   //          return {
   //             ...prevState,
   //             is_verified: status,
   //          };
   //       });
   //    }
   //    return status;
   // };
}

export default new AuthService();
