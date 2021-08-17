import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHandlerService {

  private formGroup: FormGroup = new FormGroup({});

  constructor() { }

  setFormGroup(formGroup: FormGroup): void {
    this.formGroup = formGroup;
  }

  isFieldInvalid(fieldName: string): boolean {
    if (this.formGroup.get(fieldName)?.invalid && this.formGroup.get(fieldName)?.dirty) {
      return true;
    }
    return false;
  }

  hasError(fieldName: string, errorName: string): boolean {
    return this.formGroup.get(fieldName)?.errors?.[errorName];
  }

  isFormValid(): boolean {
    if (this.formGroup.valid) {
      return true;
    }
    this.formGroup.markAsDirty({ onlySelf: true });
    this.validateAllFields(this.formGroup);
    return false;
  }

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  getFieldValues(data: { [key: string]: any } = {}, formGroup: FormGroup | null = null): { [key: string]: any } {
    if (formGroup === null) {
      formGroup = this.formGroup;
    }
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      if (control instanceof FormGroup) {
        data = this.getFieldValues(data, control);
        return;
      }
      if (control instanceof FormControl) {
        let val = control.value;
        if (typeof val === 'string') {
          val = val.trim();
        }
        data[field] = val;
      }
    });
    return data;
  }
}