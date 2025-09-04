import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cyber-stats-card',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, TranslateModule],
  template: `
    <div class="flex flex-col space-y-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="w-4/5 text-sm font-medium text-[#23044899]">{{ label | translate }}</span>
        <div class="flex w-1/5 justify-end">
          <div class="rounded-full p-2" [ngClass]="getIconBgClass()">
            <svg-icon [src]="iconPath" [svgClass]="'h-5 w-5 ' + getIconColorClass()"></svg-icon>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between space-x-2">
        <span class="text-primary text-5xl font-medium">{{ value }}</span>
        <div
          class="text-primary -mb-2 flex items-center justify-end rounded-3xl p-0.5 text-center text-xs font-medium"
          [ngClass]="'px-2 py-1 ' + getTagBgClass()">
          <span class="text-center">
            @if (inProgress){
            {{ 'cyber-dashboard.IN_PROGRESS' | translate }}
            } @else {
            {{ 'cyber-dashboard.THIS_MONTH' | translate }}

            }
          </span>
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
export class CyberStatsCardComponent implements OnInit {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() inProgress: boolean = false;
  @Input() icon: 'submit' | 'offer' | 'reject' | 'accept' = 'submit';

  iconPath: string = '';

  ngOnInit(): void {
    this.iconPath = this.getIconPath();
  }

  getIconPath(): string {
    switch (this.icon) {
      case 'submit':
        return 'assets/icons/internal/cyber-1.svg';
      case 'offer':
        return 'assets/icons/internal/cyber-2.svg';
      case 'reject':
        return 'assets/icons/internal/cyber-3.svg';
      case 'accept':
        return 'assets/icons/internal/cyber-4.svg';
      default:
        return '';
    }
  }

  getIconColorClass(): string {
    switch (this.icon) {
      case 'submit':
        return 'text-[#00A0621A]';
      case 'offer':
        return 'text-[#F47E3F1A]';
      case 'reject':
        return 'text-[#508DD21A]';
      case 'accept':
        return 'text-[#F4C4001A]';
      default:
        return 'text-gray-500';
    }
  }

  getIconBgClass(): string {
    switch (this.icon) {
      case 'submit':
        return 'bg-[#00A0621A]';
      case 'offer':
        return 'bg-[#F47E3F1A]';
      case 'reject':
        return 'bg-[#508DD21A]';
      case 'accept':
        return 'bg-[#F4C4001A]';
      default:
        return 'bg-gray-500';
    }
  }

  getTagBgClass(): string {
    switch (this.icon) {
      case 'submit':
        return 'bg-[#FFE474]';
      case 'offer':
        return 'bg-[#BAF4DF]';
      case 'reject':
        return 'bg-[#FFCC92]';
      case 'accept':
        return 'bg-[#FFBCB7]';
      default:
        return 'bg-gray-500';
    }
  }
}
