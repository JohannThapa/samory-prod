import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitchComponent } from 'src/app/modules/home/components/language-switch/language-switch.component';

@Component({
  selector: 'app-auth-nav',
  imports: [CommonModule, LanguageSwitchComponent, TranslateModule, RouterLink],
  templateUrl: './auth-nav.component.html',
  styleUrl: './auth-nav.component.css',
})
export class AuthNavComponent {}
