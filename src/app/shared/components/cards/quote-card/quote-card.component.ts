import { Component, Input } from '@angular/core';
import { AuthorCardComponent } from '../author-card/author-card.component';

@Component({
  selector: 'app-quote-card',
  imports: [AuthorCardComponent],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.css',
})
export class QuoteCardComponent {
  @Input() message: string = '';
  @Input() authorName: string = '';
  @Input() authorTitle: string = '';
  @Input() authorAvatar: string = '';
}
