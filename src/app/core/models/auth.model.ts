import { AppRole } from '../enums/roles.enum';
import { UserType } from '../enums/user.enum';

export type RegisterUserType = 'super-admin' | 'admin' | 'organization' | 'cyber-helper' | 'root';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  organizationName?: string;
  rootKey?: string;
  roles?: AppRole[];
  type?: UserType;
}

export interface RegisterPayload {
  email: string;
  password: string;
  phone?: string;
  address?: string;
  fullName: string;
  organizationName?: string;
  rootKey?: string;
}
export interface RegisterSuccessResponse {
  message: string;
  userId: string;
  email: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginSuccessResponseBE {
  code: number;
  message: string;
  data: string;
  totalElements?: number;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
}

export interface JwtPayload {
  sub: string;
  id: number | string;
  fullName: string;
  phone?: string;
  address?: string;
  organizationName?: string;
  type?: string;
  roles?: string[];
  uuid?: string;
  iat?: number;
  exp?: number;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  email: string;
}
