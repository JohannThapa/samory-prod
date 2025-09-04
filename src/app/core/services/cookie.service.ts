import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookiePreferences } from '../models/cookie.model';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private readonly STORAGE_KEY = 'cookiePreferences';
  private preferencesSubject = new BehaviorSubject<CookiePreferences>(this.getPreferencesFromStorage());

  public preferences$: Observable<CookiePreferences> = this.preferencesSubject.asObservable();

  private getPreferencesFromStorage(): CookiePreferences {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : { analytics: false, preferences: false, marketing: false };
  }

  savePreferences(preferences: CookiePreferences) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
    this.preferencesSubject.next(preferences);
  }

  acceptAll() {
    const newPrefs = { analytics: true, preferences: true, marketing: true };
    this.savePreferences(newPrefs);
  }

  rejectAll() {
    const newPrefs = { analytics: false, preferences: false, marketing: false };
    this.savePreferences(newPrefs);
  }

  hasUserSetPreferences(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }
}
