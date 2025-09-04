import { Component } from '@angular/core';
import { FaqHeaderComponent } from './components/faq-header/faq-header.component';
import { CommonModule } from '@angular/common';
import { FaqAccordionComponent } from './components/faq-accordion/faq-accordion.component';
import { FaqBottomBannerComponent } from './components/faq-bottom-banner/faq-bottom-banner.component';
import { FaqCategory } from 'src/app/core/models/layout.model';
import { SubsContainerComponent } from '../index/components/subs-container/subs-container.component';

@Component({
  selector: 'app-faq',
  imports: [CommonModule, FaqHeaderComponent, FaqAccordionComponent, FaqBottomBannerComponent, SubsContainerComponent],

  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  faqCategories: FaqCategory[] = [
    {
      title: 'Cyber Diagnostic Requests',
      items: [
        {
          question: 'How do I request a cybersecurity diagnostic?',
          answer:
            'You must first register your organization. Once logged in, go to "Request Diagnostic" in your dashboard and provide details.',
        },
        { question: 'Is the diagnostic really free?', answer: 'Yes, all diagnostics are completely free.' },
        {
          question: 'How long does it take to be assigned a Cyber Helper?',
          answer: 'Usually within 48 hours depending on workload.',
        },
      ],
    },
    {
      title: 'Cyber Helpers',
      items: [
        {
          question: 'Who can register as a Cyber Helper?',
          answer: 'Any cybersecurity professional meeting our requirements.',
        },
        { question: 'Do Cyber Helpers get paid?', answer: 'Currently Cyber Helpers volunteer their time.' },
        {
          question: 'How do I manage my diagnostics?',
          answer: 'Diagnostics are managed directly from your dashboard.',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          question: 'Who can see my diagnostic request?',
          answer: 'Only your assigned Cyber Helper and administrators.',
        },
        { question: 'How is my data protected?', answer: 'We use strong encryption, access controls, and audits.' },
        {
          question: 'What is a partner association?',
          answer: 'Trusted organizations working with us to support cybersecurity.',
        },
      ],
    },
  ];
}
