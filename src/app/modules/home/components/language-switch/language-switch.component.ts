import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switch',
  imports: [CommonModule, NgClass],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.css',
})
export class LanguageSwitchComponent implements OnInit {
  @Input() isHomePage: boolean = false;
  activeLang: string = 'en';

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.activeLang = this.translateService.getCurrentLang() || 'en';
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.activeLang = lang;
  }
}
