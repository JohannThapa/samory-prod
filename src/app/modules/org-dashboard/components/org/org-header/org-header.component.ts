import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-org-header',
  templateUrl: './org-header.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class OrgHeaderComponent implements OnInit {
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setFallbackLang('en');
    this.translate.use(savedLang);
  }

  ngOnInit(): void {}
}
