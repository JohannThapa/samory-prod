import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DiagnosticRow } from 'src/app/core/models/cyber-dashboard.model';

@Component({
  selector: 'app-diagnostic-results',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-xl border border-[#23044833] bg-white py-6 shadow-sm">
      <div class="flex items-center justify-between border-b px-6 pb-4">
        <h3 class="text-primary text-xl font-semibold">Recent Requests</h3>
        <div *ngIf="rows" class="text-base text-[#230448B2]">{{ rows.length }} Results</div>
      </div>

      <div *ngIf="loading" class="py-12 text-center text-sm text-[#7C6EAA]">Loading results...</div>

      <div *ngIf="!loading">
        <ng-container *ngIf="rows && rows.length; else empty">
          <ul class="space-y-6 px-6 py-6">
            <li *ngFor="let r of rows" class="border-b border-[#23044833] pb-4 last:border-b-0">
              <article class="flex cursor-pointer flex-col gap-3 sm:flex-row sm:items-start" (click)="view(r)">
                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between">
                    <div class="min-w-0">
                      <div class="flex items-center space-x-2">
                        <h4 class="text-primary break-words text-[22px] font-semibold leading-6">{{ r.title }}</h4>
                        <span
                          class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold italic"
                          [ngClass]="statusClass(r.status)">
                          {{ r.status }}
                        </span>
                      </div>
                      <div class="mt-4 flex items-center gap-3 text-sm text-[#00A062]">
                        <img
                          [src]="r.orgAvatar || 'assets/icons/internal/building-48.png'"
                          class="h-5 w-5 rounded-full object-cover ring-1 ring-violet-100"
                          alt="avatar" />
                        <span class="text-base font-medium text-[#2A6C53]">{{ r.orgName }}</span>
                        <span class="text-[#7C6EAA]">|</span>
                        <div class="flex items-center space-x-2">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M14.7161 4.42014C12.1127 1.8593 7.89191 1.8593 5.28858 4.42014C4.67048 5.024 4.17933 5.74533 3.844 6.54173C3.50868 7.33813 3.33594 8.19352 3.33594 9.05764C3.33594 9.92175 3.50868 10.7771 3.844 11.5735C4.17933 12.3699 4.67048 13.0913 5.28858 13.6951L10.0019 18.3326L14.7161 13.6951C15.3342 13.0913 15.8253 12.3699 16.1606 11.5735C16.496 10.7771 16.6687 9.92175 16.6687 9.05764C16.6687 8.19352 16.496 7.33813 16.1606 6.54173C15.8253 5.74533 15.3342 5.024 14.7161 4.42014ZM10.0019 11.2493C9.44524 11.2493 8.92274 11.0326 8.52858 10.6393C8.13837 10.2483 7.91922 9.7184 7.91922 9.16597C7.91922 8.61354 8.13837 8.08368 8.52858 7.69264C8.92191 7.2993 9.44524 7.08264 10.0019 7.08264C10.5586 7.08264 11.0819 7.2993 11.4752 7.69264C11.8654 8.08368 12.0846 8.61354 12.0846 9.16597C12.0846 9.7184 11.8654 10.2483 11.4752 10.6393C11.0819 11.0326 10.5586 11.2493 10.0019 11.2493Z"
                              fill="#00A062" />
                          </svg>
                          <span class="text-base font-[400] text-[#230448CC]">
                            {{ r.location }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="ml-3 flex flex-col items-end">
                      <span class="text-sm text-[#230448]"
                        >Posted On: <span class="font-semibold italic text-[#00A062]">{{ r.postedOn }}</span></span
                      >
                    </div>
                  </div>

                  <p class="line-clamp-3 mt-3 text-base text-[#23044899]">{{ r.description }}</p>

                  <div class="my-3 flex flex-wrap gap-2">
                    <span
                      *ngFor="let tag of r.tags"
                      class="rounded-full border border-[#2304480D] bg-[#2304480D] px-3 py-1 text-sm text-[#000000CC]">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </article>
            </li>
          </ul>
        </ng-container>

        <ng-template #empty>
          <div class="py-12 text-center text-sm text-[#7C6EAA]">No results found. Try adjusting your filters.</div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrl: './diagnostic-results.component.css',
})
export class DiagnosticResultsComponent {
  @Input() rows: DiagnosticRow[] = [];
  @Input() loading = false;
  @Output() viewDetail = new EventEmitter<DiagnosticRow>();

  view(row: DiagnosticRow) {
    this.viewDetail.emit(row);
  }

  statusClass(status: string) {
    const s = (status || '').toLowerCase();
    if (s.includes('open')) return 'bg-[#22C55E1A] text-[#22C55ECC]';
    if (s.includes('progress')) return 'bg-amber-50 text-amber-700';
    if (s.includes('complete')) return 'bg-[#22C55E1A] text-[#22C55ECC]';
    if (s.includes('not')) return 'bg-rose-50 text-rose-700';
    return 'bg-gray-100 text-gray-700';
  }
}
