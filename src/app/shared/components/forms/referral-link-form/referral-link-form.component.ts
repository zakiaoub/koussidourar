import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '@app/core/services/toast.service';
import { ReqService } from '@app/core/services/req.service';
import fields from '@assets/fields/referral-link.json'
import { Field } from '@app/core/models/field.interface';

@Component({
  selector: 'app-referral-link-form',
  imports: [CommonModule, InputFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './referral-link-form.component.html',
  styleUrl: './referral-link-form.component.css'
})
export class ReferralLinkFormComponent {

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private api: ReqService,
  ) { }

  referralLinkForm: FormGroup;
  isLoading = signal<boolean>(false)

  ngOnInit(): void {
    this.referralLinkForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  fields: Field[] = fields;

  sendLink() {

    if (this.referralLinkForm.invalid) {
      this.referralLinkForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true)

    const payload = this.referralLinkForm.value;

    this.api.post(['account', 'sponsorship', 'send'].join('/'), payload).subscribe({
      next: () => {
        this.toastService.show({ severity: 'success', summary: 'congratulations', detail: 'referral_link_sent_success', life: 3000 });
        this.isLoading.set(false);
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.set(false);
      }
    })
  }

}
