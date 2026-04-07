import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from "@app/core/services/auth.service";
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidatorConfirmPassword } from '@services/validator.confirm.password'
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { ToastService } from '@app/core/services/toast.service';
import { Field } from '@app/core/models/field.interface';
import fields from '@assets/fields/recover-password.json'
import { PasswordFieldComponent } from '../../fields/password-field/password-field.component';
import { InputFieldComponent } from '../../fields/input-field/input-field.component';

@Component({
  selector: 'app-recover-password-form',
  imports: [
    FormsModule,
    CommonModule,
    TranslationModule,
    CheckboxModule,
    ReactiveFormsModule,
    PasswordFieldComponent,
    ButtonComponent,
    InputFieldComponent
  ],
  templateUrl: './recover-password-form.component.html',
  styleUrl: './recover-password-form.component.css'
})
export class RecoverPasswordFormComponent {

  constructor(private authService: AuthService, private route: ActivatedRoute, private fb: FormBuilder, private toastService: ToastService) { }

  passwordForm!: FormGroup;

  token: string = ''
  fields: Field[] = fields
  isSubmiting: boolean = false
  isLoading = signal<boolean>(false)

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.passwordForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)])
    }, {
      validator: ValidatorConfirmPassword("password", "confirmPassword")
    });
  }

  getField(name: string) { return this.passwordForm.get(name); }

  onsubmit() {

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true)

    const payload = this.passwordForm.value;

    this.authService.resetPassword(payload, this.token).subscribe((res: any) => {
      this.isLoading.set(false)
      if (res?.code == 200) {
        this.toastService.show({ severity: 'success', summary: 'success', detail: 'forgot_password_success_message', life: 3000 });
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000);
      } else {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
      }
    });
  }
}
