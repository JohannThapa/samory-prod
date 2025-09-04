import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-governance-feature-card',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './governance-feature-card.component.html',
  styleUrl: './governance-feature-card.component.css',
})
export class GovernanceFeatureCardComponent {
  @Input() iconSrc = '';
  @Input() title = '';
  @Input() description = '';
}
