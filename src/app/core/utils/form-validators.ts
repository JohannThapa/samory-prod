import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyCharactersValidator(control: AbstractControl): ValidationErrors | null {
  const name = control.value;
  if (!name) {
    return null;
  }
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(name) ? null : { pattern: true };
}

export function phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  const phoneNumber = control.value;
  if (!phoneNumber) {
    return null;
  }
  const regex = /^\d{8,16}$/;
  return regex.test(phoneNumber) ? null : { pattern: true };
}
