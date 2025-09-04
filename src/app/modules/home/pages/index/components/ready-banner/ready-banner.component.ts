import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-ready-banner',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './ready-banner.component.html',
  styleUrl: './ready-banner.component.css',
})
export class ReadyBannerComponent {}
