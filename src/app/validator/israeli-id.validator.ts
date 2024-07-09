import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function israeliIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const id = control.value;

    if (!id || !/^\d{9}$/.test(id)) {
      return { invalidId: true };
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = Number(id[i]);
      if (i % 2 !== 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }

    return sum % 10 === 0 ? null : { invalidId: true };
  };
}
