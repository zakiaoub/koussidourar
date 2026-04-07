import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastService } from '@app/core/services/toast.service';
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { ReqService } from '@app/core/services/req.service';
import fields from '@assets/fields/newsletter.json'
import { Field } from '@app/core/models/field.interface';

@Component({
  selector: 'app-newsletter-form',
  imports: [CommonModule, InputFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.css'
})

export class NewsletterFormComponent {

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private api: ReqService,
  ) { }

  newsletterForm: FormGroup;
  isLoading = signal<boolean>(false)

  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  fields: Field[] = fields;

  subscribeToNewsletter() {

    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true)

    const payload = this.newsletterForm.value;

    this.api.post('newsletter', payload).subscribe({
      next: (response: any) => {
        if (response?.status === true && response.result?.error === 0) {
          this.toastService.show({ severity: 'success', summary: 'congratulations', detail: 'newsletter_success_message', life: 3000 });
        } else if (response?.status === true && response.result?.error === 1) {
          this.toastService.show({ severity: 'warn', summary: 'error', detail: 'this_email_already_subscribed', life: 3000 });
        } else {
          this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        }
        this.newsletterForm.reset();
        this.isLoading.set(false);
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.set(false);
      }
    })
  }
}
