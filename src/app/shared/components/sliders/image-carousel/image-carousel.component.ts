import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';

export interface Logo {
  src: string;
  name: string;
}

export interface CarouselConfig extends SwiperOptions {
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  centeredSlides?: boolean;
  autoplay?: any;
  loop?: boolean;
  navigation?: boolean;
  pagination?: any;
  breakpoints?: { [key: string]: { slidesPerView: number; spaceBetween?: number } };
}

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageCarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @Input() logos: Logo[] = [];

  @Input() config: CarouselConfig = {};

  constructor() {
    this.config = {
      modules: [Autoplay],
      slidesPerView: 5,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      loop: true,
      navigation: false,
      pagination: { clickable: true },
      breakpoints: {
        '640': { slidesPerView: 2 },
        '768': { slidesPerView: 4 },
        '1024': { slidesPerView: 5 },
      },
    };
  }

  ngOnInit() {}

  ngAfterViewInit() {
    Object.assign(this.swiperContainer.nativeElement, { ...this.config, ...this.config });
    this.swiperContainer.nativeElement.initialize();
  }
}
