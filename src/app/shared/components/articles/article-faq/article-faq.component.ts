import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-article-faq',
  imports: [CommonModule, TranslateModule],
  templateUrl: './article-faq.component.html',
  styleUrl: './article-faq.component.css',
  animations: [
    trigger('collapse', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          visibility: 'hidden',
        }),
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ArticleFaqComponent {
  @Input() faqs: { question: string; answer: string }[] | null = null;
  openIndex: number | null = 0;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
