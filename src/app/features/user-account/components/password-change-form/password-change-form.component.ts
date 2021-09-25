import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChangeRequest } from '@features/user-account/api/models/password-change-request';
import { FormHandlerService } from '@shared/shared/services/form-handler.service';
import { ToastMessageService } from '@shared/shared/services/toast-message.service';

@Component({
  selector: 'user-administration-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.css']
})
export class PasswordChangeFormComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    currentPassword: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.passwordMaxLength)(control)]
    ],
    newPassword: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.passwordMaxLength)(control)]
    ],
    newPasswordRepetition: ['', [
      Validators.required,
      (control: AbstractControl) => Validators.maxLength(this.passwordMaxLength)(control)
    ]]
  });

  private passwordMaxLength = 40;

  constructor(
    private formBuilder: FormBuilder,
    public formHandler: FormHandlerService,
    private toastMessageService: ToastMessageService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (!this.formHandler.isFormValid(this.form)) {
      return;
    }
    const fieldValues: PasswordChangeRequest = this.formHandler.getFieldValues<PasswordChangeRequest>(this.form);
    this.showConfirmationMessage();
    this.clearFormValues();
    console.log('submit');
    console.log(fieldValues);
  }

  private showConfirmationMessage(): void {
    this.toastMessageService.showToastMessage({
      severity: 'success',
      summary: $localize`Confirmation`,
      detail: $localize`Your password has been changed.`
    });
  }

  private clearFormValues(): void {
    this.form.reset();
  }
}
