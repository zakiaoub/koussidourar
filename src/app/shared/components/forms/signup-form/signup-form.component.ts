import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Field } from '@app/core/models/field.interface';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { ValidatorConfirmPassword } from '@services/validator.confirm.password'
import fields from '@assets/fields/signup.json'
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { PasswordFieldComponent } from '../../fields/password-field/password-field.component';
import { PhoneFieldComponent } from '../../fields/phone-field/phone-field.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputFieldComponent, PasswordFieldComponent, PhoneFieldComponent, ButtonComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})

export class SignupFormComponent {

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private api: ReqService,
    private route: ActivatedRoute
  ) { }

  signupForm!: FormGroup;
  isLoading = signal<boolean>(false)

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      full_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      referralCode: new FormControl(''),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      phone_number: new FormControl(null, [Validators.required]),
    },
      {
        validator: ValidatorConfirmPassword("password", "confirmPassword")
      });

    this.route.queryParamMap.subscribe(params => {
      if (params) {
        this.signupForm.patchValue({
          referralCode: params.get('referralCode')
        });
      } else {
        this.signupForm.patchValue({
          referralCode: ""
        });
      }
    });
  }

  fields: Field[] = fields

  signUp() {

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true)

    const payload = this.signupForm.value;

    this.api.post('register', payload).subscribe({
      next: (response: any) => {
        if (response.code == 200) {
          this.toastService.show({ severity: 'success', summary: 'congratulations', detail: 'register_success_message', sticky: true });
        }
        else if (response.code == 1100) {
          this.toastService.show({ severity: 'warn', summary: 'error', detail: 'This_email_already_used', life: 3000 });
        }
        else {
          this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.set(false);
      }
    })
  }

}
