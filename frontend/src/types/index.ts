export interface IChildrenProp {
   children: React.ReactNode | React.ReactNode[];
}
export interface ILoginFuncProp {
   (email: string, password: string): Promise<void>;
}

export interface IUser {
   id: number;
   email: string;
   is_active: boolean;
   is_verified: boolean;
   last_login: Date;
   date_joined: Date;
}
