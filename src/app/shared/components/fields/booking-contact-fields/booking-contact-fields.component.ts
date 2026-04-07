import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from "@app/shared/components/fields/input-field/input-field.component";
import { TranslationModule } from '@app/core/modules/translation.module';
import { PhoneFieldComponent } from "@app/shared/components/fields/phone-field/phone-field.component";
import { v4 as uuidv4 } from 'uuid';
import { TextareaFieldComponent } from '../textarea-field/textarea-field.component';
import { IconComponent } from '../../widgets/icon/icon.component';

@Component({
  selector: 'app-booking-contact-fields',
  imports: [CommonModule, InputFieldComponent, TranslationModule, PhoneFieldComponent, TextareaFieldComponent, IconComponent],
  templateUrl: './booking-contact-fields.component.html',
  styleUrl: './booking-contact-fields.component.css'
})

export class BookingContactFieldsComponent {

  @Input() checkForm!: FormGroup;
  id: string = uuidv4();
}
