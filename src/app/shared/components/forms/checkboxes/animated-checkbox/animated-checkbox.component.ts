import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  input,
  Output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-animated-checkbox',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label class="relative flex cursor-pointer items-center space-x-2" [class]="'checkbox ' + variant()">
      <input type="checkbox" [checked]="isChecked()" [disabled]="isDisabled()" (change)="onCheckboxChange($event)" />

      <svg *ngIf="variant() === 'path'" viewBox="0 0 21 21">
        <path
          d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
      </svg>
      <svg *ngIf="variant() === 'bounce'" viewBox="0 0 21 21">
        <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
      </svg>
      <span class="text-primary ml-6 text-base font-medium">{{ label() }}</span>
    </label>
  `,
  styleUrl: './animated-checkbox.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnimatedCheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedCheckboxComponent implements ControlValueAccessor {
  label = input<string>('');
  variant = input<'path' | 'bounce'>('path');

  isChecked = signal<boolean>(false);
  isDisabled = signal<boolean>(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.isChecked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onCheckboxChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isChecked.set(isChecked);
    this.onChange(isChecked);
    this.onTouched();
  }
}
