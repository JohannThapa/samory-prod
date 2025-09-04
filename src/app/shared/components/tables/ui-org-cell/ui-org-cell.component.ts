import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-org-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex min-w-0 items-center gap-3">
      @if(avatar && avatar !== ''){
      <img [src]="avatar" alt="" class="h-8 w-8 rounded-full object-cover ring-1 ring-violet-100" />
      }

      <div class="min-w-0">
        <div class="truncate text-[14px] font-medium text-[#230448CC]">{{ primary }}</div>
        <div *ngIf="secondary" class="truncate text-[12px] text-[#7C6EAA]">{{ secondary }}</div>
      </div>
    </div>
  `,
})
export class UiOrgCellComponent {
  @Input() avatar: string | null = null;
  @Input() primary = '';
  @Input() secondary?: string;
}
