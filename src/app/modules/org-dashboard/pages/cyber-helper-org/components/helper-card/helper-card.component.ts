import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Helper } from 'src/app/core/constants/mock-org/helper';

@Component({
  selector: 'app-helper-cyber-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="mx-auto flex max-w-sm flex-col space-y-6 rounded-[2rem] border border-gray-200 bg-gray-50 p-3 font-sans shadow-md">
      <div class="flex w-full items-start justify-between">
        <img
          [src]="helper.avatarUrl"
          alt="Avatar"
          class="w-18 h-18 rounded-full border-2 border-white object-cover shadow-lg" />

        <div class="mr-8 flex flex-col text-left">
          <h3 class="text-primary text-lg font-bold">{{ helper.name }}</h3>
          <p class="text-success text-sm font-medium italic">{{ helper.title }}</p>
          <div class="text-primary mt-1 flex items-center text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-success mr-1 h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd" />
            </svg>
            <span>{{ helper.region }}</span>
          </div>
        </div>
      </div>

      <div class="mt-4 grid w-full grid-cols-3 gap-y-2 gap-x-2 text-center">
        <div class="flex flex-col items-center justify-center">
          <span class="text-primary text-sm font-medium">{{ helper.available ? 'Yes' : 'No' }}</span>
          <span class="text-[13px] text-gray-500">Availability</span>
        </div>
        <div class="flex flex-col items-center justify-center border-l border-r border-gray-300 px-2">
          <span class="text-primary text-sm font-medium">{{ helper.yearsExperience }} years</span>
          <span class="text-[13px] text-gray-500">Experience</span>
        </div>
        <div class="flex flex-col items-center justify-center">
          <span class="text-primary text-sm font-medium">{{ helper.languages.join(', ') }}</span>
          <span class="text-[13px] text-gray-500">Language</span>
        </div>
      </div>

      <div class="mt-2 flex w-full flex-wrap justify-start gap-1">
        @for (exp of helper.expertise; track $index) {
        <span class="rounded-3xl bg-gray-200 px-2 py-2 text-xs font-semibold text-gray-700">{{ exp }}</span>
        }
      </div>

      <div class="mt-2 flex w-full space-x-4">
        <button
          class="flex flex-1 items-center justify-center rounded-xl border border-green-700 bg-green-700 py-2 text-base font-semibold text-white transition-colors hover:border-green-600 hover:bg-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Message
        </button>
        <button
          class="flex-1 rounded-xl border border-green-700 bg-white py-2 text-base font-semibold text-green-700 shadow-md transition-colors hover:bg-gray-100 hover:text-green-600">
          View Profile
        </button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelperCyberCardComponent {
  @Input({ required: true }) helper!: Helper;
}
