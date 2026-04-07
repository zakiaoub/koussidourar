import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Field } from '@app/core/models/field.interface';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import fields from '@assets/fields/password.json'
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { ButtonComponent } from '../../widgets/button/button.component';

@Component({
  selector: 'app-forgot-password-form',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputFieldComponent, ButtonComponent],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.css'
})

export class ForgotPasswordFormComponent {

  constructor(private authService: AuthService, private fb: FormBuilder, private toastService: ToastService) { }

  recoverPassswordForm!: FormGroup;

  fields: Field[] = fields
  isLoading = signal<boolean>(false)

  ngOnInit(): void {
    this.recoverPassswordForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  recoverPassword() {
    if (this.recoverPassswordForm.invalid) {
      this.recoverPassswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true)

    const payload = this.recoverPassswordForm.value;

    this.authService.recoveryPassword(payload)
      .subscribe((res: any) => {
        if (res?.code == 200) {
          this.toastService.show({ severity: 'success', summary: 'success', detail: 'forgot_password_success_message', life: 3000 });
        } else {
          this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        }

        this.isLoading.set(false)
      });
  }
}
