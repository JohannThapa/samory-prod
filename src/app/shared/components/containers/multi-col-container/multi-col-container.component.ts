import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FeatureList } from 'src/app/core/models/layout.model';

@Component({
  selector: 'app-multi-col-container',
  imports: [CommonModule, AngularSvgIconModule, NgOptimizedImage],
  templateUrl: './multi-col-container.component.html',
  styleUrl: './multi-col-container.component.css',
})
export class MultiColContainerComponent {
  @Input({ required: true }) features!: FeatureList[];
}
