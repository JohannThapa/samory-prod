import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Type } from '@angular/core';
import { ModalData } from 'src/app/core/models/dialog.model';

@Component({
  selector: 'app-modal-dialog',
  imports: [CommonModule, NgClass, NgIf],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css',
  animations: [
    trigger('modalAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        }),
      ),
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        }),
      ),
      transition('void => open', [animate('0.2s cubic-bezier(0.4, 0, 0.2, 1)')]),
      transition('open => void', [animate('0.2s cubic-bezier(0.4, 0, 0.2, 1)')]),
    ]),
  ],
})
export class ModalDialogComponent implements OnInit, OnDestroy {
  @Input() data: ModalData | null = null;
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private readonly variantColors = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
    danger: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive',
    light: 'bg-button border-2 border-border-1 text-primary-light hover:bg-muted/90 focus-visible:ring-muted',
    success: 'bg-success text-white hover:bg-green-800 focus-visible:ring-green-800',
    warning: 'bg-warning text-white hover:bg-yellow-600 focus-visible:ring-yellow-500',
    info: 'bg-blue-400 text-white hover:bg-blue-600 focus-visible:ring-blue-500',
  };

  ngOnInit(): void {
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  private handleEscapeKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isOpen) {
      this.onCancel();
    }
  };

  onConfirm(): void {
    this.confirm.emit();
    this.close.emit();
  }

  onCancel(): void {
    this.cancel.emit();
    this.close.emit();
  }

  getButtonClasses(variant: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light'): any {
    return this.variantColors[variant] || this.variantColors.primary;
  }
}
