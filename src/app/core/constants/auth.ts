export const LS_AUTH_TOKEN = 'authToken';
export const LS_CURRENT_USER = 'currentUser';

export const PUBLIC_REGISTER_PATH = '/api/v1/public/auth';
export const AUTH_PATH = '/api/v1/auth';

export const REGISTER_ENDPOINTS = {
  'super-admin': `${PUBLIC_REGISTER_PATH}/register-sadmin`,
  root: `${PUBLIC_REGISTER_PATH}/500`,
  admin: `${PUBLIC_REGISTER_PATH}/register-admin`,
  organization: `${PUBLIC_REGISTER_PATH}/register-organization`,
  'cyber-helper': `${PUBLIC_REGISTER_PATH}/register-cyber-helper`,
} as const;

export const LOGIN_ENDPOINT = `${PUBLIC_REGISTER_PATH}/login`;
export const CONFIRM_ACCOUNT_ENDPOINT = '/api/v1/public/auth/confirm-account';
export const RESEND_CONFIRM_MAIL_ENDPOINT = '/api/v1/public/auth/resend-confirm-mail';
export const FORGOT_PASSWORD_ENDPOINT = '/api/v1/public/auth/password-forgot';
export const RESET_PASSWORD_ENDPOINT = '/api/v1/public/auth/reset-password';
