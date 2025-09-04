import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  imports: [CommonModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.css',
})
export class SectionCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() pad = 'py-14';
}
