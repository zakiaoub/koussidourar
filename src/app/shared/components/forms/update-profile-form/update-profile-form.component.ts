import { Component, signal } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDataService } from '@services/form-data.service';
import { InputFieldComponent } from "@app/shared/components/fields/input-field/input-field.component";
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { ToastService } from '@app/core/services/toast.service';
import fields from '@assets/fields/account.json'
import { Field } from '@app/core/models/field.interface';
import { ReqService } from '@app/core/services/req.service';

@Component({
  selector: 'app-update-profile-form',
  imports: [TranslationModule, DialogModule, ReactiveFormsModule, FormsModule, CommonModule, InputMaskModule, InputFieldComponent, ButtonComponent],
  templateUrl: './update-profile-form.component.html',
  styleUrl: './update-profile-form.component.css'
})

export class UpdateProfileFormComponent {

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private toastService: ToastService,
    private api: ReqService
  ) { }

  upadateForm!: FormGroup;
  validateForm!: FormGroup;

  profile: any

  updateFields: Field[] = fields.updateProfile
  validateFields: Field[] = fields.validateProfile

  isUpdateSubmiting = signal<boolean>(false)
  isValidateSubmiting = signal<boolean>(false)

  updateClass: string = ''
  validateClass: string = 'd-none'

  ngOnInit(): void {
    this.profile = this.formDataService.getData('profile')

    this.upadateForm = this.fb.group({
      full_name: new FormControl(this.profile.full_name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      email: new FormControl(this.profile.email, [Validators.required, Validators.email]),
      address: new FormControl(this.profile.address, [Validators.required]),
      phone: new FormControl(this.profile.phone, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]),
    });

    this.validateForm = this.fb.group({
      token: new FormControl(null, [Validators.required])
    });

    this.upadateForm.markAllAsTouched();
  }

  onUpdate() {

    if (this.upadateForm.invalid) {
      this.upadateForm.markAllAsTouched();
      return;
    }

    this.isUpdateSubmiting.set(true)

    const payload = this.upadateForm.value;

    this.api.post(['account', 'update'].join('/'), payload).subscribe({
      next: (response: any) => {
        if (response?.status && response?.code == 200) {
          this.toastService.show({ severity: 'info', summary: 'check_your_email', detail: 'a_temporary_security_code_has_been_sent_to_you_by_email', life: 9000 });
          this.updateClass = 'd-none'
          this.validateClass = ''
        }
        else {
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

    this.api.get(['account', 'update', payload, 'validate'].join('/')).subscribe({
      next: (response: any) => {
        if (response?.status && response?.code == 200) {
          this.profile.full_name = response.result?.profile.full_name
          this.profile.address = response.result?.profile.address
          this.profile.email = response.result?.profile.email
          this.profile.phone = response.result?.profile.phone
          this.formDataService.sendData('profile', this.profile)
          this.toastService.show({ severity: 'success', summary: 'success', detail: 'update_profile_success_message', life: 3000 });
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
