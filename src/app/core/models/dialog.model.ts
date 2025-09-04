import { Type } from '@angular/core';

type VariantType = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light';

export interface ModalButton {
  label: string;
  action: 'cancel' | 'confirm';
  variant: VariantType;
}
export interface ModalData {
  title: string;
  description?: string;
  buttons: ModalButton[];
  customComponent?: Type<any>;
  customComponentInputs?: { [key: string]: any };
}
