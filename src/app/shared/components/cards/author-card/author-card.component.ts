import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-author-card',
  imports: [CommonModule],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css',
})
export class AuthorCardComponent {
  @Input() avatarUrl: string = '';
  @Input() name: string = '';
  @Input() title: string = '';
}
