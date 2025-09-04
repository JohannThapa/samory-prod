import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FaqCategory } from 'src/app/core/models/layout.model';

@Component({
  selector: 'app-faq-accordion',
  imports: [CommonModule],
  templateUrl: './faq-accordion.component.html',
  styleUrl: './faq-accordion.component.css',
})
export class FaqAccordionComponent {
  @Input({ required: true }) categories: FaqCategory[] = [];

  openedQuestion: string | null = null;

  toggle(question: string) {
    this.openedQuestion = this.openedQuestion === question ? null : question;
  }
}
