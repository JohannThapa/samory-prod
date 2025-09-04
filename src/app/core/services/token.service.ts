import { Injectable } from '@angular/core';
import { LS_AUTH_TOKEN } from '../constants/auth';
import { JwtPayload, User } from '../models/auth.model';
import { UserType } from '../enums/user.enum';
import { AppRole } from '../enums/roles.enum';

@Injectable({ providedIn: 'root' })
export class TokenService {
  get(): string | null {
    return localStorage.getItem(LS_AUTH_TOKEN);
  }

  set(token: string): void {
    localStorage.setItem(LS_AUTH_TOKEN, token);
  }

  clear(): void {
    localStorage.removeItem(LS_AUTH_TOKEN);
  }

  isExpired(token = this.get()): boolean {
    try {
      if (!token) return true;
      const payload = this.decode(token);
      if (!payload?.exp) return false;
      return Date.now() >= payload.exp * 1000;
    } catch {
      return false;
    }
  }

  private b64UrlDecode(input: string): string {
    const b64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4 === 2 ? '==' : b64.length % 4 === 3 ? '=' : '';
    return atob(b64 + pad);
  }

  decode(token = this.get()): JwtPayload | null {
    try {
      if (!token) return null;
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const json = this.b64UrlDecode(parts[1]);
      return JSON.parse(json) as JwtPayload;
    } catch {
      return null;
    }
  }

  private normalizeType(raw?: string): UserType | undefined {
    if (!raw) return undefined;
    const t = raw.replace(/-/g, '_').toUpperCase();
    if (t === UserType.ORGANIZATION) return UserType.ORGANIZATION;
    if (t === UserType.CYBER_HELPER) return UserType.CYBER_HELPER;
    return undefined;
  }

  private mapRoles(raw?: string[]): AppRole[] | undefined {
    if (!raw?.length) return undefined;
    const set = new Set<AppRole>();
    for (const r of raw) {
      switch (r) {
        case AppRole.USER:
          set.add(AppRole.USER);
          break;
        case AppRole.ORGANIZATION:
          set.add(AppRole.ORGANIZATION);
          break;
        case AppRole.CYBER_HELPER:
          set.add(AppRole.CYBER_HELPER);
          break;
        case AppRole.ADMIN:
          set.add(AppRole.ADMIN);
          break;
        case AppRole.SUPER_ADMIN:
          set.add(AppRole.SUPER_ADMIN);
          break;
        default:
          break;
      }
    }
    return Array.from(set);
  }
  userFromToken(token = this.get()): User | null {
    const payload = this.decode(token);
    if (!payload) return null;

    return {
      id: String(payload.id ?? payload.uuid ?? ''),
      email: payload.sub,
      fullName: payload.fullName,
      phone: payload.phone,
      address: payload.address,
      organizationName: payload.organizationName,
      roles: this.mapRoles(payload.roles),
      type: this.normalizeType(payload.type),
    };
  }
}
