export interface AccountResponse {
    user: {
        id: BigInt;
        email: string;
        is_active: boolean;
        is_staff: boolean;
        is_superuser: boolean;
        is_verified: boolean;
        last_login: Date;
    };
    access: string;
    refresh: string;
}
