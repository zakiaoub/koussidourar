import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Field } from '@app/core/models/field.interface';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { ValidatorConfirmPassword } from '@app/core/services/validator.confirm.password';
import fields from '@assets/fields/account.json'
import { PasswordFieldComponent } from '../../fields/password-field/password-field.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { InputFieldComponent } from '../../fields/input-field/input-field.component';

@Component({
  selector: 'app-update-password-form',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, PasswordFieldComponent, ButtonComponent, InputFieldComponent],
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.css'
})

export class UpdatePasswordFormComponent {

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private api: ReqService
  ) { }

  upadateForm!: FormGroup;
  validateForm!: FormGroup;

  updateFields: Field[] = fields.updatePassword
  validateFields: Field[] = fields.validatePassword

  isUpdateSubmiting = signal<boolean>(false)
  isValidateSubmiting = signal<boolean>(false)

  updateClass: string = ''
  validateClass: string = 'd-none'

  ngOnInit(): void {
    this.upadateForm = this.fb.group({

      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)])
    }, {
      validator: ValidatorConfirmPassword("password", "confirmPassword")
    });

    this.validateForm = this.fb.group({
      token: new FormControl('', [Validators.required])
    });
  }

  onUpdate() {

    if (this.upadateForm.invalid) {
      this.upadateForm.markAllAsTouched();
      return;
    }

    this.isUpdateSubmiting.set(true)

    const payload = this.upadateForm.value;

    this.api.post(['account', 'update', 'password'].join('/'), payload).subscribe({
      next: (response: any) => {
        if (response?.status && response?.code == 200) {
          this.toastService.show({ severity: 'info', summary: 'check_your_email', detail: 'a_temporary_security_code_has_been_sent_to_you_by_email', life: 9000 });
          this.updateClass = 'd-none'
          this.validateClass = ''
        } else {
          this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        }
        this.isUpdateSubmiting.set(false);
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isUpdateSubmiting.set(false);
      }
    })
  }

  onValidate() {
    if (this.validateForm.invalid) {
      this.validateForm.markAllAsTouched();
      return;
    }

    this.isValidateSubmiting.set(true)

    const payload = this.validateForm.value.token;

    this.api.get(['account', 'update', 'password', payload, 'validate'].join('/')).subscribe({
      next: (response: any) => {
        if (response?.status && response?.code == 200) {

          this.toastService.show({ severity: 'success', summary: 'success', detail: 'upadte_password_success_message', life: 3000 });
          this.updateClass = ''
          this.validateClass = 'd-none'
          this.validateForm.reset()
        }
        else {
          this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });

        }
        this.isValidateSubmiting.set(false);
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isValidateSubmiting.set(false);
      }
    })
  }
}
