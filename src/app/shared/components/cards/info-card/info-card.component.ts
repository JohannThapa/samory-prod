import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-info-card',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css',
})
export class InfoCardComponent {
  @Input() iconPath: string | any;
  @Input() value: string | undefined;
  @Input() description: string | undefined;
  @Input() isPrimary = false;
}
