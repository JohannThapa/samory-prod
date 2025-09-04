import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { cx } from '../../utils/ckassnames';

type ButtonProps = {
  impact: 'bold' | 'light' | 'none';
  size: 'small' | 'medium' | 'large';
  shape: 'square' | 'rounded' | 'pill';
  tone: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light';
  shadow: 'none' | 'small' | 'medium' | 'large';
  type: 'button' | 'submit' | 'reset';
};

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent implements OnInit {
  impact = input<ButtonProps['impact']>('none');
  size = input<ButtonProps['size']>('medium');
  shape = input<ButtonProps['shape']>('rounded');
  tone = input<ButtonProps['tone']>('primary');
  shadow = input<ButtonProps['shadow']>('none');
  type = input<String>('submit');
  full = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });
  disabled = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });

  @Output() buttonClick = new EventEmitter<void>();

  public classes: string = '';

  baseClasses =
    'font-semibold cursor-pointer focus-visible:outline-none flex items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

  impactClasses: Record<ButtonProps['tone'], Record<ButtonProps['impact'], string>> = {
    primary: {
      bold: 'bg-primary text-white hover:text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
      light:
        'bg-white text-primary border border-border-1 hover:bg-primary/50 hover:text-white hover:border-primary focus-visible:ring-primary',
      none: 'bg-transparent border border-white text-white hover:bg-white/30 hover:text-primary focus-visible:ring-primary',
    },
    danger: {
      bold: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive',
      light:
        'bg-white border border-destructive text-destructive hover:bg-destructive/10 focus-visible:ring-destructive',
      none: 'bg-transparent text-destructive hover:bg-destructive/10 focus-visible:ring-destructive',
    },
    success: {
      bold: 'bg-success text-white hover:bg-green-800 focus-visible:ring-green-800',
      light: 'bg-white text-success border border-success hover:bg-green-200/30 focus-visible:ring-green-500',
      none: 'bg-success-light text-success-light-foreground hover:bg-green-800/10 focus-visible:ring-green-500',
    },
    warning: {
      bold: 'bg-warning text-white hover:bg-yellow-600 focus-visible:ring-yellow-500',
      light: 'bg-white border border-warning text-warning hover:bg-yellow-500/30 focus-visible:ring-yellow-500',
      none: 'bg-warning/20 text-yellow-600 hover:bg-yellow-500/10 focus-visible:ring-yellow-500',
    },
    info: {
      bold: 'bg-blue-400 text-white hover:bg-blue-600 focus-visible:ring-blue-500',
      light: 'bg-white border border-blue-400 text-blue-400 hover:bg-blue-500/10 focus-visible:ring-blue-500',
      none: 'bg-blue-400/10 text-blue-400 hover:bg-blue-500/10 focus-visible:ring-blue-500',
    },
    light: {
      bold: 'bg-button border-2 border-border-1 text-primary-light hover:bg-muted/90 focus-visible:ring-muted',
      light: 'bg-button border border-border-1 text-primary-light hover:bg-muted focus-visible:ring-muted',
      none: 'bg-transparent border border-border-1 text-primary-light hover:bg-muted focus-visible:ring-muted',
    },
  };

  sizeClasses: Record<ButtonProps['size'], string> = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-5 py-2 text-sm',
    large: 'px-7 py-2.5 text-lg',
  };

  shapeClasses: Record<ButtonProps['shape'], string> = {
    square: 'rounded-none',
    rounded: 'rounded-lg',
    pill: 'rounded-full',
  };

  shadowClasses: Record<ButtonProps['shadow'], string> = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
  };

  constructor() {}

  ngOnInit(): void {
    this.classes = cx(
      this.baseClasses,
      this.impactClasses[this.tone()][this.impact()],
      this.sizeClasses[this.size()],
      this.shapeClasses[this.shape()],
      this.shadowClasses[this.shadow()],
      this.full() ? 'w-full' : '',
    );
  }

  onButtonClick() {
    this.buttonClick.emit();
  }
}
