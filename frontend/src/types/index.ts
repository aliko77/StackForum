import { ReactNode } from 'react';

export type ReactChildrenProps = {
   children: ReactNode | ReactNode[];
};

export type KeyValue = {
   [key: string]: unknown;
};

export type UserProps = {
   id: string;
   email: string;
   username: string;
   is_active: boolean;
   is_verified: boolean;
   last_login: string;
   date_joined: string;
   profile?: ProfileProps;
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
   signature?: string;
   share_info?: string;
   allow_friend_requests?: boolean;
   allow_messages?: string;
};

export type LoginRecordsProps = {
   ip_address: string;
   login_time: string;
   browser: string;
   device: string;
   os: string;
}[];

export type BlockedUsersProps = {
   username: string;
   avatar: string;
   blocked_at: string;
}[];

export type FriendsProps = {
   username: string;
   avatar: string;
   friendship_at: string;
}[];
