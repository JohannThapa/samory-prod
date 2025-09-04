import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CookiePreferencesModalService } from 'src/app/core/services/cookie-preferences-modal.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CookiePreferencesModalComponent } from './components/cookie-preferences-modal/cookie-preferences-modal.component';

@Component({
  selector: 'app-cookies-policy',
  imports: [CommonModule, TranslateModule, ButtonComponent, AngularSvgIconModule, CookiePreferencesModalComponent],
  templateUrl: './cookies-policy.component.html',
  styleUrl: './cookies-policy.component.css',
})
export class CookiesPolicyComponent {
  constructor(private modalService: CookiePreferencesModalService) {}
  openManageCookies() {
    this.modalService.open();
  }
}
