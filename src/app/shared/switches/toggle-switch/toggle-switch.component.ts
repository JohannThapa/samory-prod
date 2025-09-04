import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <input
      type="checkbox"
      [checked]="value"
      (change)="onChangeHandler($event)"
      (blur)="onTouched()"
      [style.--s]="size" />
  `,
  styles: [
    `
      input {
        --s: 50px;
        height: calc(var(--s) + var(--s) / 5);
        width: auto;
        aspect-ratio: 2.25;
        border-radius: var(--s);
        margin: calc(var(--s) / 2);
        display: grid;
        cursor: pointer;
        background-color: #cfd9e5;
        box-sizing: content-box;
        overflow: hidden;
        transition: 0.3s 0.1s;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      input:before {
        content: '';
        padding: calc(var(--s) / 10);
        --_g: radial-gradient(circle closest-side at calc(100% - var(--s) / 2) 50%, #000 96%, #0000);
        background: var(--_g) 0 / var(--_p, var(--s)) 100% no-repeat content-box,
          var(--_g) var(--_p, 0) / var(--s) 100% no-repeat content-box, #fff;
        mix-blend-mode: darken;
        filter: blur(calc(var(--s) / 12)) contrast(11);
        transition: 0.4s, background-position 0.4s 0.1s,
          padding cubic-bezier(0, calc(var(--_i, -1) * 200), 1, calc(var(--_i, -1) * 200)) 0.25s 0.1s;
      }
      input:checked {
        background-color: rgba(35, 4, 72, 1);
      }
      input:checked:before {
        padding: calc(var(--s) / 10 + 0.05px) calc(var(--s) / 10);
        --_p: 100%;
        --_i: 1;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ToggleSwitchComponent,
      multi: true,
    },
  ],
})
export class ToggleSwitchComponent implements ControlValueAccessor {
  @Input() size: string = '24px';
  value = false;

  private onChange = (value: boolean) => {};
  onTouched = () => {};

  onChangeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.checked;
    this.onChange(this.value);
  }

  writeValue(value: boolean): void {
    this.value = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
