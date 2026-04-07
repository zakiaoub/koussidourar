import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ButtonComponent } from '../../widgets/button/button.component';
import { PasswordFieldComponent } from '../../fields/password-field/password-field.component';
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { ToastService } from '@app/core/services/toast.service';
import { Field } from '@app/core/models/field.interface';
import fields from '@assets/fields/login.json'


@Component({
  selector: 'app-login-form',
  imports: [CommonModule, TranslationModule, ButtonComponent, PasswordFieldComponent, InputFieldComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  constructor(private authService: AuthService, private fb: FormBuilder, private formDataService: FormDataService, private toastService: ToastService) { }

  loginForm!: FormGroup;

  isLoading = signal<boolean>(false)
  today: any = new Date()

  fields: Field[] = fields

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)])
    });
  }

  logIn() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true)

    const payload = this.loginForm.value;

    this.authService.signIn(payload)
      .subscribe((res: any) => {
        if (res?.status == true && res?.code == 200 && res?.result?.bearerToken != '') {

          this.formDataService.sendData('bearer', res?.result.bearerToken);
          this.formDataService.sendData('sessionAt', this.today.getTime());
          this.formDataService.sendData('timeout', res?.result.timeout);
          this.formDataService.sendData('profile', res?.result.profile);
          window.location.href = '/'
        } else {
          this.isLoading.set(false)
          this.toastService.show({ severity: 'error', summary: 'error', detail: 'login_error_message', life: 3000 });
        }
      });
  }
}
