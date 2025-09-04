import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CookiePreferencesModalService } from 'src/app/core/services/cookie-preferences-modal.service';
import { CookieService } from 'src/app/core/services/cookie.service';
import { CookiePreferences } from 'src/app/core/models/cookie.model';
import { ToggleSwitchComponent } from 'src/app/shared/switches/toggle-switch/toggle-switch.component';

@Component({
  selector: 'app-cookie-preferences-modal',
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, AngularSvgIconModule, ToggleSwitchComponent],
  templateUrl: './cookie-preferences-modal.component.html',
  styleUrl: './cookie-preferences-modal.component.css',
  standalone: true,
})
export class CookiePreferencesModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  cookieForm: FormGroup;
  private destroy$ = new Subject<void>();

  isAnalyticsExpanded = false;
  isPreferencesExpanded = false;
  isMarketingExpanded = false;

  constructor(
    private cookieService: CookieService,
    private modalService: CookiePreferencesModalService,
    private fb: FormBuilder,
  ) {
    this.cookieForm = this.fb.group({
      analytics: [false],
      preferences: [false],
      marketing: [false],
    });
  }

  ngOnInit(): void {
    this.modalService.modalState$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.isOpen = state;
      if (this.isOpen) {
        // Load latest preferences when the modal opens
        this.cookieService.preferences$.pipe(takeUntil(this.destroy$)).subscribe((prefs) => {
          this.cookieForm.patchValue(prefs, { emitEvent: false });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSection(section: 'analytics' | 'preferences' | 'marketing') {
    switch (section) {
      case 'analytics':
        this.isAnalyticsExpanded = !this.isAnalyticsExpanded;
        break;
      case 'preferences':
        this.isPreferencesExpanded = !this.isPreferencesExpanded;
        break;
      case 'marketing':
        this.isMarketingExpanded = !this.isMarketingExpanded;
        break;
    }
  }

  savePreferences() {
    const preferences: CookiePreferences = this.cookieForm.value;
    this.cookieService.savePreferences(preferences);
    this.close();
  }

  acceptAll() {
    this.cookieService.acceptAll();
    this.close();
  }

  rejectAll() {
    this.cookieService.rejectAll();
    this.close();
  }

  close() {
    this.modalService.close();
  }
}
