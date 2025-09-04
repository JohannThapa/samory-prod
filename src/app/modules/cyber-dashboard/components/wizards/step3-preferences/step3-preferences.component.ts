import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnimatedCheckboxComponent } from 'src/app/shared/components/forms/checkboxes/animated-checkbox/animated-checkbox.component';

enum checkboxVariant {
  PATH = 'path',
  BOUNCE = 'bounce',
}
@Component({
  selector: 'app-wizard-step3',
  standalone: true,
  imports: [ReactiveFormsModule, AnimatedCheckboxComponent, CommonModule],
  styleUrl: './step3-preferences.component.css',
  template: `
    <div class="mx-auto" [formGroup]="group">
      <div class="mb-6 flex items-center justify-between border-b pb-4">
        <h2 class="text-xl font-semibold text-green-600">Preferences</h2>
        <button type="button" class="text-primary rounded-sm bg-[#F8F4FE] py-2 px-6 text-sm" (click)="skip()">
          Skip
        </button>
      </div>

      <div class="grid gap-2 sm:grid-cols-1">
        @for (item of preferences(); track item.formControlName) {
        <div>
          <div class="flex items-center justify-between border-b py-2 last:border-b-0">
            <div class="flex w-full items-center gap-3">
              <app-animated-checkbox
                [label]="item.label"
                [variant]="item.variant"
                [formControlName]="item.formControlName">
              </app-animated-checkbox>
            </div>
            <button
              type="button"
              class="text-primary ml-4 cursor-pointer rounded-full p-2 transition-all duration-300 hover:bg-gray-100"
              (click)="toggleExpanded(item.formControlName)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-primary h-6 w-6 transform transition-transform duration-300"
                [ngClass]="{ 'rotate-180': expandedState()[item.formControlName] }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div @expandCollapse class="overflow-hidden" *ngIf="expandedState()[item.formControlName]">
            <div class="text-primary rounded-b-md border-t border-gray-200 bg-gray-50 px-6 py-2 text-sm italic">
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  animations: [
    trigger('expandCollapse', [
      state(
        'void',
        style({
          height: '0',
          opacity: '0',
          transform: 'translateX(20px)',
        }),
      ),
      state(
        '*',
        style({
          height: '*',
          opacity: '1',
          transform: 'translateX(0)',
        }),
      ),
      transition('void => *', [animate('300ms ease-in')]),
      transition('* => void', [animate('300ms ease-out')]),
    ]),
  ],
})
export class Step3PreferencesComponent implements OnInit {
  @Input({ required: true }) group!: FormGroup;
  @Output() onSkip = new EventEmitter<Event>();

  expandedState: WritableSignal<{ [key: string]: boolean }> = signal({});
  variantEnum = checkboxVariant;

  preferences = signal([
    {
      label: 'Receive emails about diagnostics',
      variant: this.variantEnum.PATH,
      formControlName: 'receiveEmails',
      description: 'Opt-in to receive important emails regarding system diagnostics and performance reports.',
    },
    {
      label: 'Receive SMS notifications',
      variant: this.variantEnum.PATH,
      formControlName: 'receiveSms',
      description: 'Get notified via SMS for critical alerts and updates related to your account.',
    },
    {
      label: 'Can be mobilized as cyber reservist',
      variant: this.variantEnum.PATH,
      formControlName: 'canBeMobilized',
      description: 'By enabling this option, you agree to be considered for mobilization in cybersecurity initiatives.',
    },
    {
      label: 'Can be contacted directly by organizations',
      variant: this.variantEnum.BOUNCE,
      formControlName: 'canBeContacted',
      description:
        'Allow verified organizations to contact you directly for collaborative projects or job opportunities.',
    },
    {
      label: 'Ghost mode (hide profile temporarily)',
      variant: this.variantEnum.BOUNCE,
      formControlName: 'ghostMode',
      description:
        'Hide your public profile temporarily. You will still receive notifications but will not be visible to others.',
    },
  ]);

  ngOnInit() {
    const expanded: { [key: string]: boolean } = {};
    this.preferences().forEach((pref) => {
      expanded[pref.formControlName] = false;
    });
    this.expandedState.set(expanded);
  }

  toggleExpanded(formControlName: string) {
    this.expandedState.update((state) => {
      state[formControlName] = !state[formControlName];
      return { ...state };
    });
  }

  skip(): void {
    this.onSkip.emit();
  }
}
