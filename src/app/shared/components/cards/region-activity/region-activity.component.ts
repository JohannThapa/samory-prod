import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-activity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-gray-900">Login Activity By Region</h2>

      <div class="mb-4 aspect-video w-full overflow-hidden rounded-lg">
        <img src="assets/images/worldmap.png" alt="World Map" class="h-full w-full object-cover" />
      </div>

      <ul class="space-y-3">
        <li *ngFor="let region of regions" class="flex items-center justify-between">
          <div class="text-sm text-gray-500">{{ region.name }}</div>
          <div class="mx-4 h-1 flex-1 rounded-full bg-gray-200">
            <div class="h-full rounded-full bg-blue-600" [style.width.%]="region.percentage"></div>
          </div>
          <div class="text-sm font-medium text-gray-900">{{ region.percentage }}%</div>
        </li>
      </ul>
    </div>
  `,
})
export class RegionActivityComponent {
  @Input() regions: any[] = [];
}
