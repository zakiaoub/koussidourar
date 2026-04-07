import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastService } from '@app/core/services/toast.service';
import { InputFieldComponent } from '@app/shared/components/fields/input-field/input-field.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { ReqService } from '@app/core/services/req.service';
import fields from '@assets/fields/contact.json'
import { IconComponent } from '../../widgets/icon/icon.component';
import { Field } from '@app/core/models/field.interface';
import { PhoneFieldComponent } from "../../fields/phone-field/phone-field.component";
import { ScrollService } from '@app/core/services/scroll.service';
import { TextareaFieldComponent } from '../../fields/textarea-field/textarea-field.component';

interface Data {
  label: string;
  caption: string;
  color: string;
  trigger: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, InputFieldComponent, ButtonComponent, IconComponent, PhoneFieldComponent, TextareaFieldComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})

export class ContactFormComponent {

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private api: ReqService,
    private scroll: ScrollService
  ) { }

  contactForm!: FormGroup;
  isLoading = signal<boolean>(false)
  service = signal<string>('sales')

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      service: new FormControl(this.service(), [Validators.required]),
      full_name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
    });
  }

  data: Data[] = [
    { label: 'sales', caption: 'sales_caption', color: 'green-bg', trigger: 'contact_us' },
    { label: 'support', caption: 'support_caption', color: 'orange-bg', trigger: 'get_support' },
    { label: 'media', caption: 'media_caption', color: 'lower-bg', trigger: 'get_in_touch' },
    { label: 'partnerships', caption: 'partnerships_caption', color: 'main-bg', trigger: 'get_in_touch' },
  ]

  setOption(value: string): void {
    this.service.set(value)
    this.contactForm.get('service')?.setValue(value);
  }

  fields: Field[] = fields

  sendmessage() {

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.scroll.scrollTo('contact-form');
      this.toastService.show({ severity: 'warn', summary: 'missing_required_fields', detail: 'missing_required_fields_caption', life: 6000 });
      return;
    }

    this.isLoading.set(true)

    const payload = this.contactForm.value;

    this.api.post('contact', payload).subscribe({
      next: () => {
        this.toastService.show({ severity: 'success', summary: 'success', detail: 'message_sent_success', life: 3000 });
        this.contactForm.reset();
        this.isLoading.set(false);
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.set(false);
      }
    })
  }
}
