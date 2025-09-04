import { Component, Input, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChipInputComponent } from 'src/app/shared/components/forms/chip-input/chip-input.component';

@Component({
  selector: 'app-wizard-step4',
  styleUrl: './step4-experience.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule, ChipInputComponent],
  template: `
    <div class="mx-auto" [formGroup]="group">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-[color:var(--brand-deep)]">Share Your Experience</h2>
        <button
          type="button"
          class="rounded-lg bg-[#F8F4FE] py-2 px-6 text-sm text-indigo-700 transition-colors hover:bg-indigo-100">
          Skip
        </button>
      </div>

      <div class="grid gap-5">
        <label class="block">
          <span class="mb-2 block text-sm font-medium text-gray-700">Short bio / Introduction</span>
          <textarea
            class="input h-32 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="bio"
            placeholder="Write some intro about you"></textarea>
        </label>

        <label class="block">
          <span class="mb-2 block text-sm font-medium text-gray-700">LinkedIn Profile</span>
          <input
            class="input w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            formControlName="linkedinProfile"
            placeholder="https://www.linkedin.com/in/username" />
          <p
            class="mt-1 text-xs text-red-500"
            *ngIf="group.get('linkedinProfile')?.touched && group.get('linkedinProfile')?.invalid">
            Please enter a valid LinkedIn URL.
          </p>
        </label>

        <div class="grid gap-5 sm:grid-cols-2">
          <label class="block">
            <span class="mb-2 block text-sm font-medium text-gray-700">Spoken Languages</span>
            <ng-select
              [items]="languages"
              [multiple]="true"
              placeholder="Select Languages"
              formControlName="languages"
              [searchable]="true"
              class="ng-select-custom">
            </ng-select>
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-medium text-gray-700">Years of Experience</span>
            <ng-select
              [items]="years"
              placeholder="Select Years of Experience"
              formControlName="yearsOfExperience"
              [searchable]="false"
              class="ng-select-custom">
            </ng-select>
          </label>
        </div>

        <label class="block">
          <span class="mb-2 block text-sm font-medium text-gray-700">Expertise</span>
          <app-chip-input formControlName="expertise" [options]="expertiseOptions" placeholder="Select or Add">
          </app-chip-input>
          <div class="mt-2 flex flex-wrap gap-2">
            <span
              *ngFor="let tag of group.value.expertise; let i = index"
              class="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
              {{ tag }}
              <button type="button" class="text-emerald-900" (click)="removeChip(i)">×</button>
            </span>
          </div>
        </label>

        <label class="block">
          <span class="mb-2 block text-sm font-medium text-gray-700">Availability</span>
          <ng-select
            [items]="availabilityOptions"
            placeholder="Select availability"
            formControlName="availability"
            class="ng-select-custom">
          </ng-select>
        </label>
      </div>
    </div>
  `,
})
export class Step4ExperienceComponent {
  @Input({ required: true }) group!: FormGroup;

  years = Array.from({ length: 41 }, (_, i) => i); // 0..40
  chipInput = signal<any>('');

  addChip() {
    const val = this.chipInput().trim();
    if (!val) return;
    const arr = this.group.get('expertise')!;
    const current = (arr.value as string[]) ?? [];
    if (!current.includes(val)) {
      arr.setValue([...current, val]);
      arr.markAsDirty();
    }
    this.chipInput.set('');
  }

  removeChip(i: number) {
    const arr = this.group.get('expertise')!;
    const current = (arr.value as string[]) ?? [];
    current.splice(i, 1);
    arr.setValue([...current]);
    arr.markAsDirty();
  }

  languages = [
    'Afrikaans',
    'Arabic',
    'English',
    'French',
    'Mandarin',
    'Spanish',
    'German',
    'Russian',
    'Japanese',
    'Korean',
    'Portuguese',
  ];
  expertiseOptions = [
    'Phishing',
    'Malware',
    'Awareness Training',
    'Network Security',
    'Incident Response',
    'Threat Intelligence',
    'Penetration Testing',
  ];
  availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Full-time'];
}
