import { ReactNode } from 'react';

export type ReactChildrenProps = {
   children: ReactNode | ReactNode[];
};

export type KeyValue = {
   [key: string]: unknown;
};

export type ProfileProps = {
   dob?: string;
   dob_privacy?: string;
   city?: string;
   twitter_url?: string;
   github_url?: string;
   email_secondary?: string;
   phone_number?: string;
   profession?: string;
   hobbies?: string;
   about?: string;
   status?: string;
   avatar?: string;
};

export type UserProps = {
   id: number;
   email: string;
   username: string;
   is_active: boolean;
   is_verified: boolean;
   last_login: string;
   date_joined: string;
   profile?: ProfileProps;
};
