import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ListCardItem } from 'src/app/core/models/card.model';

@Component({
  selector: 'app-card-ui-list',
  imports: [CommonModule, NgOptimizedImage, AngularSvgIconModule],
  template: `
    <div class="card p-5 rounded-2xl shadow-sm border border-gray-200 w-full {{ cardClass }}">
      <div class="mb-6 flex items-start justify-between">
        <div class="flex-1">
          <h2 class="text-primary text-lg font-semibold">{{ title }}</h2>
          @if (subtitle.length > 0) {
          <p class="mt-1 text-sm text-gray-500">{{ subtitle }}</p>
          }
        </div>
        @if (ctaLabel.length > 0) {
        <button
          (click)="ctaClick.emit()"
          class="ml-4 rounded-lg py-2 px-4 text-sm font-semibold text-[#6650F8] transition-colors hover:text-[#4F3BB2] focus:outline-none focus:ring-2 focus:ring-violet-500">
          {{ ctaLabel }}
        </button>
        } @else {
        <div class="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#F8F4FE]">
          <svg-icon [src]="'assets/icons/internal/top-right.svg'" svgClass="w-4 h-4 text-muted-foreground"> </svg-icon>
        </div>
        }
      </div>

      <ul>
        @for (item of items; track item.id) {
        <li class="flex items-center gap-4 border-b border-gray-100 py-4 last:border-b-0">
          @if (item.image){
          <div
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
            [ngClass]="item.iconColor ? 'bg-violet-50' : 'bg-gray-100'">
            <img
              [ngSrc]="item.image"
              width="40"
              height="40"
              alt="{{ item.primary }}"
              class="h-10 w-10 rounded-full object-cover" />
          </div>

          } @else if (item.icon){
          <div
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
            [ngClass]="item.iconBgColor ? item.iconBgColor : 'bg-gray-400'">
            <span class="material-symbols-outlined h-5 w-5" [ngClass]="item.iconColor || 'text-primary'">
              <svg-icon
                [src]="item.icon"
                [svgClass]="
                  'h-5 w-5 transform transition-transform ' + (item.iconColor ? item.iconColor : ' text-primary')
                ">
              </svg-icon>
            </span>
          </div>
          }

          <div class="relative flex-grow">
            <div class="flex items-center">
              <span class="text-primary mr-2 text-sm font-semibold">{{ item.primary }}</span>
              @if (item.meta) {
              <span class="absolute right-0 text-xs text-gray-400">{{ item.meta }}</span>
              }
            </div>
            <p class="text-xs text-gray-500">{{ item.secondary }}</p>
          </div>
        </li>
        } @if (!items || items.length === 0) {
        <li class="py-6 text-center text-gray-500">No items to display.</li>
        }
      </ul>
    </div>
  `,
  styleUrl: './card-ui-list.component.css',
})
export class CardUiListComponent {
  @Input({ required: true }) items: ListCardItem[] = [];
  @Input() title = '';
  @Input() subtitle = '';
  @Input() ctaLabel = '';
  @Input() cardClass = '';

  @Output() ctaClick = new EventEmitter<void>();
}
