import { NgFor, NgClass, CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-wizard-stepper',
  standalone: true,
  imports: [CommonModule, NgClass],
  styleUrl: './wizard-stepper.component.css',
  template: `
    <div class="mx-auto mt-12 mb-8 text-center">
      <h1 class="text-[46px] font-bold text-[color:var(--brand-deep)]">Welcome, {{ fullName }}</h1>
      <p class="mt-2 text-sm font-semibold text-[color:var(--brand-accent)]">
        Let's Complete your Cyber Helper Profile
      </p>
    </div>

    <div class="mx-auto mb-10 flex max-w-full items-center justify-center gap-6 text-base md:max-w-6xl">
      <ng-container *ngFor="let s of steps; let i = index">
        <div class="flex items-center gap-3">
          <div
            [ngClass]="{
              'badge-green': current() > i + 1,
              'flex h-6 w-6 items-center justify-center rounded-full border-2': true,
              'border-[color:var(--brand-accent)] text-[color:var(--brand-accent)]': current() >= i + 1,
              'border-[0.88px] border-[#230448] text-gray-400': current() < i + 1
            }">
            <ng-container *ngIf="current() > i + 1; else num">{{ i + 1 }}</ng-container>
            <ng-template #num>{{ i + 1 }}</ng-template>
          </div>
          <span
            [ngClass]="{
              'font-medium text-[color:var(--brand-deep)]': current() === i + 1,
              'text-gray-500': current() !== i + 1
            }">
            {{ s }}
          </span>
        </div>
        <div *ngIf="i < steps.length - 1" class="h-[2px] w-20 bg-[#23044866]"></div>
      </ng-container>
    </div>
  `,
})
export class WizardStepperComponent {
  @Input({ required: true }) current = signal(1);
  fullName: string | undefined = '';
  steps = ['Basic Information', 'Upload Profile Photo', 'Preferences', 'Experience & Skills'];
  constructor(private auth: AuthService) {
    this.fullName = this.auth.user()?.fullName;
  }
}
