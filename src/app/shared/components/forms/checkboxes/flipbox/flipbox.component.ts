import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flipbox-checkbox',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label class="flipBox mx-auto my-4 block cursor-pointer text-left" [class.opacity-50]="isDisabled()">
      <input type="checkbox" [checked]="isChecked()" [disabled]="isDisabled()" (change)="onCheckboxChange($event)" />
      <span class="pl-5 text-base font-medium">{{ label() }}</span>
      <div class="flipBox_boxOuter duration-250 absolute left-0 top-1/2 h-4 w-4 origin-top transition-[height]">
        <div class="flipBox_box absolute left-1/2 top-1/2 h-full w-4 translate-x-[-50%] translate-y-[-50%]">
          <div class="absolute w-4 shadow-[0_0_0.25em_#0007_inset]" [class.bg-green-500]="isChecked()"></div>
          <div class="absolute w-4 shadow-[0_0_0.25em_#0007_inset]" [class.bg-green-500]="isChecked()"></div>
          <div class="absolute w-4 shadow-[0_0_0.25em_#0007_inset]" [class.bg-green-500]="isChecked()"></div>
          <div class="absolute w-4 shadow-[0_0_0.25em_#0007_inset]" [class.bg-green-500]="isChecked()"></div>
          <div
            class="rotate-x-90 absolute top-0 h-4 w-4 origin-top translate-y-[-0.5em] bg-green-500"
            [class.bg-green-500]="isChecked()"></div>
          <div
            class="rotate-x-90 absolute bottom-0 h-4 w-4 origin-bottom translate-y-[0.5em] bg-white"
            [class.bg-white]="!isChecked()"></div>
        </div>
      </div>
      <div
        class="flipBox_shadow translate-z-[-1px] absolute left-0 top-1/2 h-4 w-4 translate-y-[-50%] bg-[#0007] blur-[0.2em]"></div>
    </label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FlipboxComponent),
      multi: true,
    },
  ],
  styleUrl: './flipbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipboxComponent implements ControlValueAccessor {
  label = input<string>('');

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
