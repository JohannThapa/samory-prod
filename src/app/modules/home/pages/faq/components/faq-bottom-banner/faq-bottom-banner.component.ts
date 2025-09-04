import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-bottom-banner',
  imports: [CommonModule],
  templateUrl: './faq-bottom-banner.component.html',
  styleUrl: './faq-bottom-banner.component.css',
})
export class FaqBottomBannerComponent {
  @Input() linkHref = '#';
}
