import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="input-field" [class.disabled]="disabled" [class.invalid]="shouldShowErrors">
      <label *ngIf="label" class="label" [attr.for]="inputId"
        >{{ label }} <span *ngIf="required" class="required">*</span></label
      >

      <div class="control-wrap">
        <ng-container *ngIf="prefix || prefixIcon">
          <span class="prefix" [attr.aria-hidden]="true">
            <ng-container *ngIf="prefixIcon"><i [class]="prefixIcon"></i></ng-container>
            <ng-container *ngIf="!prefixIcon">{{ prefix }}</ng-container>
          </span>
        </ng-container>

        <input
          [id]="inputId"
          class="control"
          [attr.type]="type"
          [attr.placeholder]="placeholder"
          [attr.aria-describedby]="describedBy"
          [attr.aria-invalid]="shouldShowErrors"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event.target)"
          (blur)="onTouched()"
          (focus)="onFocus()" />

        <ng-container *ngIf="suffix || suffixIcon">
          <button
            *ngIf="suffixAction"
            type="button"
            class="suffix action"
            (click)="suffixAction()"
            [disabled]="disabled">
            <ng-container *ngIf="suffixIcon"><i [class]="suffixIcon"></i></ng-container>
            <ng-container *ngIf="!suffixIcon">{{ suffix }}</ng-container>
          </button>

          <span *ngIf="!suffixAction" class="suffix" [attr.aria-hidden]="true">
            <ng-container *ngIf="suffixIcon"><i [class]="suffixIcon"></i></ng-container>
            <ng-container *ngIf="!suffixIcon">{{ suffix }}</ng-container>
          </span>
        </ng-container>
      </div>

      <div class="meta-row">
        <div class="hint" *ngIf="hint && !shouldShowErrors">{{ hint }}</div>
        <div class="char-count" *ngIf="maxLength">{{ currentLength }} / {{ maxLength }}</div>
      </div>

      <ul class="errors" *ngIf="shouldShowErrors">
        <li *ngFor="let e of renderedErrors">{{ e }}</li>
      </ul>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
      }
      .input-field {
        --border: #d7d7d7;
        --danger: #d9534f;
        --bg: #fff;
        padding: 0.25rem 0;
      }
      .label {
        display: block;
        margin-bottom: 0.35rem;
        font-weight: 600;
        color: #222;
        font-size: 0.9rem;
      }
      .required {
        color: var(--danger);
        margin-left: 0.18rem;
      }
      .control-wrap {
        display: flex;
        align-items: center;
        border: 1px solid var(--border);
        border-radius: 0.375rem;
        background: var(--bg);
        padding: 0 0.5rem;
      }
      .control {
        flex: 1;
        border: 0;
        outline: 0;
        padding: 0.65rem 0;
        font-size: 0.95rem;
        background: transparent;
      }
      .prefix,
      .suffix {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: #6b6b6b;
      }
      .suffix.action {
        background: none;
        border: 0;
        cursor: pointer;
        padding: 0.35rem;
      }
      .meta-row {
        display: flex;
        justify-content: space-between;
        margin-top: 0.35rem;
      }
      .hint {
        font-size: 0.82rem;
        color: #6b6b6b;
      }
      .char-count {
        font-size: 0.82rem;
        color: #6b6b6b;
      }
      .errors {
        margin: 0.35rem 0 0;
        padding-left: 1rem;
        color: var(--danger);
        font-size: 0.85rem;
      }
      .invalid .control-wrap {
        border-color: var(--danger);
        box-shadow: 0 0 0 3px rgba(217, 83, 79, 0.06);
      }
      .disabled {
        opacity: 0.6;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() prefix?: string;
  @Input() prefixIcon?: string;
  @Input() suffix?: string;
  @Input() suffixIcon?: string;
  @Input() suffixAction?: () => void;
  @Input() hint?: string;
  @Input() required = false;
  @Input() maxLength?: number;
  @Input() debounce = 0;
  @Input() disabled = false;
  @Input() customErrors: Record<string, (err: any) => string> = {};

  @Input() inputId = `app-input-${Math.random().toString(36).slice(2, 9)}`;

  @Output() readonly valueChange = new EventEmitter<string | number | null>();
  @Output() readonly focused = new EventEmitter<void>();
  @Output() readonly blurred = new EventEmitter<void>();

  value: any = null;
  currentLength = 0;
  onTouched: () => void = () => {};
  onChange: (_: any) => void = () => {};
  private _ngControl = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this._ngControl) {
      (this._ngControl as any).valueAccessor = this;
    }
  }

  writeValue(obj: any): void {
    this.value = obj ?? '';
    this.currentLength = this.value ? String(this.value).length : 0;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(next: any) {
    if (this.type === 'number') {
      next = next === '' ? null : Number(next);
    }
    this.value = next;
    this.currentLength = this.value ? String(this.value).length : 0;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onFocus() {
    this.focused.emit();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this._ngControl && this._ngControl.control) {
      return this._ngControl.control.errors;
    }
    return null;
  }

  get control(): AbstractControl | null {
    return this._ngControl ? this._ngControl.control : null;
  }

  get touched(): boolean {
    return !!this.control && (this.control.touched || this._touchedManual);
  }

  private _touchedManual = false;

  markAsTouched() {
    this._touchedManual = true;
    this.onTouched();
  }

  get shouldShowErrors(): boolean {
    const c = this.control;
    return !!c && c.invalid && (c.touched || c.dirty || this._touchedManual);
  }

  get renderedErrors(): string[] {
    const c = this.control;
    if (!c || !c.errors) return [];
    const errors = c.errors;
    const out: string[] = [];
    const defaults: Record<string, (err: any) => string> = {
      required: () => `${this.label || 'This field'} is required.`,
      minlength: (err: any) => `Minimum ${err.requiredLength} characters required (got ${err.actualLength}).`,
      maxlength: (err: any) => `Maximum ${err.requiredLength} characters allowed (got ${err.actualLength}).`,
      email: () => `Please provide a valid email address.`,
      pattern: () => `Invalid format.`,
      min: (err: any) => `Minimum value is ${err.min}.`,
      max: (err: any) => `Maximum value is ${err.max}.`,
    };

    for (const key of Object.keys(errors)) {
      const errVal = errors[key];
      if (this.customErrors && this.customErrors[key]) {
        try {
          out.push(this.customErrors[key](errVal));
        } catch {
          out.push(String(errVal));
        }
      } else if (defaults[key]) {
        out.push(defaults[key](errVal));
      } else {
        out.push(`${key} ${JSON.stringify(errVal)}`);
      }
    }
    return out;
  }

  get describedBy() {
    const pieces: string[] = [];
    if (this.hint) pieces.push(`${this.inputId}-hint`);
    if (this.shouldShowErrors) pieces.push(`${this.inputId}-errors`);
    return pieces.join(' ') || null;
  }
}
