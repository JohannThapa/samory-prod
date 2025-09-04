import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, NgIf, AngularSvgIconModule],
  template: `
    <div class="flex flex-col space-y-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="w-4/5 text-sm font-medium text-[#23044899]">{{ label }}</span>
        <div class="flex w-1/5 justify-end">
          <div class="rounded-full p-2" [ngClass]="getIconBgClass()">
            <svg-icon [src]="iconPath" [svgClass]="'h-5 w-5 ' + getIconColorClass()"></svg-icon>
          </div>
        </div>
      </div>
      <div class="flex items-end space-x-2">
        <span class="text-primary text-5xl font-medium">{{ value }}</span>
        <div
          class="mb-2 flex items-center rounded-md p-0.5 text-xs font-semibold"
          [ngClass]="{ 'bg-[#2BD70029] text-green-500 ': isPositive, 'bg-[#ED635829] text-red-500 ': !isPositive }">
          <svg
            *ngIf="isPositive"
            class="mr-0.5 h-2 w-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          <svg
            *ngIf="!isPositive"
            class="mr-0.5 h-2 w-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          <span>{{ percentage | number : '1.0-2' }}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class StatsCardComponent implements OnInit {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() percentage: number = 0;
  @Input() isPositive: boolean = true;
  @Input() icon: 'users' | 'orgs' | 'cyber' | 'reports' = 'users';

  iconPath: string = '';

  ngOnInit(): void {
    this.iconPath = this.getIconPath();
  }

  getIconPath(): string {
    switch (this.icon) {
      case 'users':
        return 'assets/icons/internal/dash-users.svg';
      case 'orgs':
        return 'assets/icons/internal/dash_building.svg';
      case 'cyber':
        return 'assets/icons/internal/dash-helper.svg';
      case 'reports':
        return 'assets/icons/internal/dash-report.svg';
      default:
        return '';
    }
  }

  getIconColorClass(): string {
    switch (this.icon) {
      case 'users':
        return 'text-green-500';
      case 'orgs':
        return 'text-sky-500';
      case 'cyber':
        return 'text-rose-500';
      case 'reports':
        return 'text-amber-500';
      default:
        return 'text-gray-500';
    }
  }

  getIconBgClass(): string {
    switch (this.icon) {
      case 'users':
        return 'bg-green-100';
      case 'orgs':
        return 'bg-sky-100';
      case 'cyber':
        return 'bg-rose-100';
      case 'reports':
        return 'bg-amber-100';
      default:
        return 'bg-gray-100';
    }
  }
}
