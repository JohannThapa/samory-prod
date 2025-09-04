import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FeatureList } from 'src/app/core/models/layout.model';

@Component({
  selector: 'app-two-col-feature-box',
  imports: [CommonModule, AngularSvgIconModule, NgOptimizedImage],
  templateUrl: './two-col-feature-box.component.html',
  styleUrl: './two-col-feature-box.component.css',
})
export class TwoColFeatureBoxComponent {
  @Input({ required: true }) left!: FeatureList;
  @Input({ required: true }) right!: FeatureList;
  @Input() dense = false;
}
