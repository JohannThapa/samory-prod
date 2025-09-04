import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-access-conf-card',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './access-conf-card.component.html',
  styleUrl: './access-conf-card.component.css',
})
export class AccessConfCardComponent {
  @Input() iconSrc = '';
  @Input() title = '';
  @Input() description = '';
}
