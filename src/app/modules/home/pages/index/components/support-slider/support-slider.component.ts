import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageCarouselComponent } from 'src/app/shared/components/sliders/image-carousel/image-carousel.component';

@Component({
  selector: 'app-support-slider',
  imports: [CommonModule, ImageCarouselComponent],
  templateUrl: './support-slider.component.html',
  styleUrl: './support-slider.component.css',
})
export class SupportSliderComponent {}
