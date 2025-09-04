import { Injectable } from '@angular/core';
import { LS_CURRENT_USER } from '../constants/auth';
import { User } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class UserStorageService {
  get(): User | null {
    const raw = localStorage.getItem(LS_CURRENT_USER);
    return raw ? (JSON.parse(raw) as User) : null;
  }
  set(user: User): void {
    localStorage.setItem(LS_CURRENT_USER, JSON.stringify(user));
  }
  clear(): void {
    localStorage.removeItem(LS_CURRENT_USER);
  }
}
