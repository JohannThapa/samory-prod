import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cyber-header',
  templateUrl: './cyber-header.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class CyberHeaderComponent implements OnInit {
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setFallbackLang('en');
    this.translate.use(savedLang);
  }

  ngOnInit(): void {}
}
