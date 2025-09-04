import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePreferencesModalComponent } from './cookie-preferences-modal.component';

describe('CookiePreferencesModalComponent', () => {
  let component: CookiePreferencesModalComponent;
  let fixture: ComponentFixture<CookiePreferencesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiePreferencesModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiePreferencesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
