type PermissionsProps = {
   COMA: string;
};

const DEFAULT_VALUE = null;

const PERMISSIONS = {
   COMA: import.meta.env.VITE_APP_PERMISSIONS_COMA || DEFAULT_VALUE,
} as PermissionsProps;

export default PERMISSIONS;
