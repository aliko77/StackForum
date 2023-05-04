/**
 * @namespace authSlice
 * @name AccountResponse
 */
export interface AccountResponse {
   id: number;
   email: string;
   is_active: boolean;
   is_staff: boolean;
   is_superuser: boolean;
   is_verified: boolean;
   last_login: Date;
}

export interface AuthResponse {
   isAuth: boolean;
   token?: string | null;
   refreshToken?: string | null;
   user?: AccountResponse | null;
}

/**
 * @namespace appSlice
 * @name Theme
 */
export enum Theme {
   Light = 'light',
   Dark = 'dark',
}

/**
 * @namespace appSlice
 * @name Language
 */
export enum Language {
   EN = 'en',
   TR = 'tr',
}

/**
 * @namespace appSlice
 * @name AppResponse
 */
export interface AppResponse {
   theme: Theme;
   language: Language;
}

/**
 * @name ReactChildrenResponse
 */
export interface ReactChildrenResponse {
   children: React.ReactNode | React.ReactNode[];
}
