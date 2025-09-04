import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-chip-input',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  template: `
    <ng-select
      [items]="options"
      [multiple]="true"
      [addTag]="true"
      [searchable]="true"
      [hideSelected]="true"
      [formControl]="control"
      [placeholder]="placeholder"
      class="ng-select-custom-tags">
    </ng-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipInputComponent),
      multi: true,
    },
  ],
  styleUrl: './chip-input.component.css',
})
export class ChipInputComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() placeholder: string = '';

  control = new FormControl<string[]>([]);

  private onChange = (value: string[] | null) => {};
  private onTouched = () => {};

  constructor() {
    this.control.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  writeValue(value: string[] | null): void {
    if (value) {
      this.control.setValue(value, { emitEvent: false });
    } else {
      this.control.reset(null, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: string[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
