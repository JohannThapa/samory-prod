import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wizard-step1',
  standalone: true,
  styleUrl: './step1-basic-info.component.css',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mx-auto" [formGroup]="group">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-success text-xl font-semibold">Basic Information</h2>
        <button
          type="button"
          class="text-primary rounded-sm bg-[#F8F4FE] py-2 px-6 text-sm"
          [disabled]="group.invalid"
          (click)="skip()">
          Skip
        </button>
      </div>

      <div class="grid gap-5">
        <label class="block">
          <span class=" text-primary text-sm font-semibold">Full Name *</span>
          <input class="input bg-[#F8F4FE] text-sm" formControlName="fullName" placeholder="Fatoumata Keita" />
          @if (group.get('fullName')?.invalid && group.get('fullName')?.touched) {
          <div class="mt-1 text-sm text-red-500">
            @if(group.get('fullName')?.errors?.['required']){
            <span *ngIf="group.get('fullName')?.errors?.['required']">Full Name is required.</span>
            } @else if (group.get('fullName')?.errors?.['pattern']) {
            <span>Full Name should not contain numbers or special characters.</span>
            }
          </div>
          }
        </label>

        <label class="block">
          <span class="text-primary text-sm font-semibold">Address</span>
          <input class="input" formControlName="address" placeholder="Enter your complete address" />
        </label>

        <label class="block">
          <span class="text-primary text-sm font-semibold">Phone Number</span>
          <input class="input" formControlName="phoneNumber" placeholder="e.g., 4620000000" />
          @if (group.get('phoneNumber')?.invalid && group.get('phoneNumber')?.touched) {
          <div class="mt-1 text-sm text-red-500">
            @if (group.get('phoneNumber')?.errors?.['pattern']) {
            <span>Phone number must be between 8 and 15 digits.</span>
            }
          </div>
          }
        </label>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Step1BasicInfoComponent {
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) currentStep!: number;
  @Output() onSkip = new EventEmitter<Event>();

  skip(): void {
    this.onSkip.emit();
  }
}
