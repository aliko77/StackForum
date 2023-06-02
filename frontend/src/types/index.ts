import { ReactNode } from 'react';

export interface ReactChildrenProps {
   children: ReactNode | ReactNode[];
}

export interface KeyValue {
   [key: string]: unknown;
}

export interface UserProps {
   id: number;
   email: string;
   username: string;
   is_active: boolean;
   is_verified: boolean;
   last_login: string;
   date_joined: string;
   profile?: { [key: string]: string };
}
