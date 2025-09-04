import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-header',
  imports: [CommonModule],
  templateUrl: './faq-header.component.html',
  styleUrl: './faq-header.component.css',
})
export class FaqHeaderComponent {
  @Input() title = 'Frequently Asked Questions';
  @Input() subtitle =
    'Get answers to common questions about diagnostics, Cyber Helpers, privacy, and using the platform.';
  @Input() iconSrc = 'assets/illustrations/faq.png';
}
