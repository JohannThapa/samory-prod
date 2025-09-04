import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-diagnostic-header',
  template: `
    <div class="mb-2 mt-4 ml-8 flex justify-between">
      <div class="inline-block">
        <h3 class="text-primary text-2xl font-bold">Explore Diagnostic Opportunities</h3>
        <div class="space-x-1 text-base font-[400] text-[#230448CC]">
          <span>Browse current cybersecurity requests submitted by organizations and apply to help them.</span>
        </div>
      </div>
      <div class="inline-block space-x-4"></div>
    </div>
  `,
  imports: [],
})
export class DiagnosticHeaderComponent implements OnInit {
  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setFallbackLang('en');
    this.translate.use(savedLang);
  }

  ngOnInit(): void {}
}
