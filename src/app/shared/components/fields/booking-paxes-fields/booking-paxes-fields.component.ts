import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from "@app/shared/components/fields/input-field/input-field.component";
import { TranslationModule } from '@app/core/modules/translation.module';
import { MaskFieldComponent } from "@app/shared/components/fields/mask-field/mask-field.component";
import { CountriesFieldComponent } from '@app/shared/components/fields/countries-field/countries-field.component';
import { DropdownModule } from 'primeng/dropdown';
import { v4 as uuidv4 } from 'uuid';
import { IconComponent } from "../../widgets/icon/icon.component";
import { SelectFieldComponent } from '../select-field/select-field.component';

@Component({
  selector: 'app-booking-paxes-fields',
  imports: [CommonModule, InputFieldComponent, TranslationModule, DropdownModule, MaskFieldComponent, CountriesFieldComponent, FormsModule, ReactiveFormsModule, IconComponent, SelectFieldComponent],
  templateUrl: './booking-paxes-fields.component.html',
  styleUrl: './booking-paxes-fields.component.css'
})

export class BookingPaxesFieldsComponent {

  @Input() paxes: any;
  @Input() service: string;
  @Input() checkoutForm!: FormGroup;
  @Input() room: any;

  id:string = uuidv4();

  getPaxType(item: any): string {
    if (this.service === 'package' && item.Age < 2) {
      return 'INF';
    }
    return item.Type;
  }

  getPaxNumber(index: number, item: any): number {
    const currentType = this.getPaxType(item);

    return this.paxes
      .slice(0, index + 1)
      .filter(pax => this.getPaxType(pax) === currentType)
      .length;
  }

}
