import { TestBed } from '@angular/core/testing';

import { CookiePreferencesModalService } from './cookie-preferences-modal.service';

describe('CookiePreferencesModalService', () => {
  let service: CookiePreferencesModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiePreferencesModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
