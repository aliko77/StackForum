import { ReactNode } from 'react';

export interface IChildrenProp {
   children: ReactNode | ReactNode[];
}
export interface ILoginFuncProp {
   (email: string, password: string): Promise<void>;
}

export interface IVerifyFuncProp {
   (vcode: string, email: string | undefined): Promise<void>;
}

export interface IRegisterFuncProp {
   (
      email: string,
      password: string,
      confirm_password: string,
      first_name: string,
      last_name: string,
   ): Promise<void>;
}

export interface IUser {
   id: number;
   email: string;
   first_name: string;
   last_name: string;
   is_active: boolean;
   is_verified: boolean;
   last_login: Date;
   date_joined: Date;
   profile: { [key: string]: string };
}

export interface IRegisterErrorType {
   [key: string]: string[];
}
